// ==UserScript==
// @name         Instagram Downloader
// @version      0.1
// @author       Fury Zenblade#1337
// @description  toadd
// @match        http*://*.instagram.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @run-at       document-start
// ==/UserScript==
console.log("Script loaded");

// intercept XMLHttpRequests
(function(open) {
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        this.addEventListener("readystatechange", function() {
            if (this.readyState != 4) return; // not done yet
            if (!url.contains("/info/")) return; // not a post info request
            if (!this.responseText.contains("video_versions")) return; // not a post with video
            // parse response json
            var response = JSON.parse(this.responseText);
            // from json get items[0] -> code
            /*var code = response.items[0].code;
            console.log("Code: " + code);*/

            var video_versions = response.items[0].video_versions;
            /*
            console.log("All video versions: ");
            for (const video of video_versions) {
                console.log("Resolution: " + video.width + "x" + video.height + " " + video.url);
            }
            */
            var hq_video = video_versions[0];
            console.log(`${hq_video.width}x${hq_video.height}: ${hq_video.url}`);

        });
        open.call(this, method, url, async, user, password);
    }
}) (XMLHttpRequest.prototype.open);
