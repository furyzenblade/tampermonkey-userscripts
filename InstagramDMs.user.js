// ==UserScript==
// @name         Instagram DMs
// @description  Press Key 'K' on Keyboard to replace - Replace reels with videos (for no need to leave dms page)
// @version      0.1
// @updateURL    https://github.com/furyzenblade/tampermonkey-userscripts/raw/master/InstagramDMs.user.js
// @author       Fury Zenblade#1337
// @match        https://www.instagram.com/direct/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @grant        none
// ==/UserScript==

console.log("[Instagram DMs] script loaded");

var videoLinks = {};
((() => {
    const origOpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        this.addEventListener('load', function() {

            if (this.responseURL.contains("/get_items/")){
                console.log("New chat loaded");
                var response = JSON.parse(this.responseText);
                var items = response.items;
            } 
            
            else if (this.responseURL.contains("/?cursor=")){
                console.log("Scrolling through chat");
                var response = JSON.parse(this.responseText);
                var items = response.thread.items;
            } 
            
            else {
                return;
            }
            
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (item.item_type != "clip") continue; // only reels

                var videoLink = item.clip.clip.video_versions[0].url;
                var videoThumb = item.clip.clip.image_versions2.candidates[0].url;

                var videoThumbId = GetThumbnailId(videoThumb);
                videoLinks[videoThumbId] = videoLink; // add to dictionary as videoId: videoLink
            }
            
        });
        origOpen.apply(this, arguments);
    };
}))();

document.addEventListener("keypress", function onEvent(event) {
    if (event.key != 'k') return;
    var messagesContent = document.getElementsByClassName("_ab5z _ab5_")[0].children[0].children; // all messages in open chat
    
    // get all reels in chat
    var reels = [];
    for (var i = 0; i < messagesContent.length; i++) {
        var message = messagesContent[i];
        if (message.getElementsByTagName("svg").length == 0) continue; 
        var svgs = message.getElementsByTagName("svg");
        for (const svg of svgs){
            if (svg.hasAttribute("aria-label") == false) continue;
            if (svg.getAttribute("aria-label") != "Clip") continue;
            reels.push(message);
        }
    }

    for (const reel of reels){
        var reelThumbs = reel.getElementsByTagName("img");
        var reelThumb;
        for (const thumb of reelThumbs){
            if (thumb.className != "_ac71") continue; // not thumbnail
            reelThumb = thumb;
        }

        if (reelThumb.src == "") continue;
        var reelId = GetThumbnailId(reelThumb.src);

        // map reel thumbnail to video link
        var videoLink = videoLinks[reelId];

        // create video element
        var video = document.createElement("video");
        video.src = videoLink;
        video.controls = true;
        video.autoplay = false;
        video.loop = false;
        video.poster = reelThumb.src;

        reelThumb.replaceWith(video);
        var reelIcon = video.nextSibling; var channelIcon = video.nextSibling.nextSibling;
        reelIcon.remove(); channelIcon.remove();
    }

});

function GetThumbnailId(rawUrl){
    var url = new URL(rawUrl);
    var path = url.pathname;
    var pathSplit = path.split("/");
    var thumbId = pathSplit[pathSplit.length - 1];
    return thumbId;
}
