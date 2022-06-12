// ==UserScript==
// @name         Instagram Downloader
// @version      0.1
// @author       Fury Zenblade#1337
// @description  toadd
// @match        http*://*.instagram.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @run-at       document-start
// ==/UserScript==

function addButton(element) {
    var dl_button = document.createElement("button");
    // on click
    dl_button.onclick = function() {
        //console.log("Button clicked");
        if (last_played_video == null) return;
        window.open(last_played_video.url);
    }
    // set text of button
    dl_button.innerHTML = "Download";

    // add css to dl_button
    dl_button.style.cssText = "margin-left: 22px; background-color: #fff; border: 1px solid #000; padding: 5px;";
    
    dl_button.onmouseover = function() {
        dl_button.style.backgroundColor = "#ddd";
        if (last_played_video == null){
            dl_button.style.cursor = "not-allowed";
            dl_button.title = "No video loaded";
        } else {
            dl_button.style.cursor = "pointer";
            dl_button.title = "Download last loaded video";
        }
    }
    dl_button.onmouseout = function() {
        dl_button.style.backgroundColor = "#fff";
    }
    
    element.appendChild(dl_button);
}

function WaitForElement(selector, callback) {
    if (document.querySelector(selector)) {
        callback();
    } else {
        setTimeout(function() {
            WaitForElement(selector, callback);
        }, 100);
    }
}

var last_played_video = null;

(function() {
    'use strict';
    console.log("Script loaded");
    
    WaitForElement("._acus", function() {
        console.log("Element found");
        var top_bar = document.getElementsByClassName("_acus");
        addButton(top_bar[0]);
    });

})();

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
            last_played_video = hq_video;
            console.log(`${hq_video.width}x${hq_video.height}: ${hq_video.url}`);

        });
        open.call(this, method, url, async, user, password);
    }
}) (XMLHttpRequest.prototype.open);
