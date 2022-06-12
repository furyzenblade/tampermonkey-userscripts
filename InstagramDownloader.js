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
    if (document.getElementById("download_button")) return; // check if button already exists 

    var dl_button = document.createElement("button");
    dl_button.id = "download_button";
    dl_button.innerHTML = "Download";

    // on click
    dl_button.onclick = function() {
        if (last_played_video == null) return;
        window.open(last_played_video.url);
    }

    // add css to dl_button
    dl_button.style.cssText = "margin-left: 22px; background-color: #fff; border: 1px solid #000; padding: 5px;";
    
    dl_button.onmouseover = function() {
        dl_button.style.backgroundColor = "#ddd"; // change color on hover
        if (last_played_video == null){
            dl_button.style.cursor = "not-allowed";
            dl_button.title = "No video loaded";
        } else {
            dl_button.style.cursor = "pointer";
            dl_button.title = "Download last loaded video";
        }
    }
    dl_button.onmouseout = function() {
        dl_button.style.backgroundColor = "#fff"; // change color on hover
    }
    
    element.appendChild(dl_button);
}

function WaitForElement(selector, callback) { // @_@
    if (document.querySelector(selector)) {
        callback();
    } else {
        setTimeout(function() {
            WaitForElement(selector, callback);
        }, 100);
    }
}

function ReAddButton() {
    setTimeout(function() {
        var top_bar = document.getElementsByClassName("_acus");
        addButton(top_bar[0]);
        top_bar[0].addEventListener("click", ReAddButton);
    }, 100);
}

(function() {
    'use strict';
    console.log("Script loaded");
    
    // wait until UI has loaded
    WaitForElement("._acus", function() {
        var top_bar = document.getElementsByClassName("_acus");
        addButton(top_bar[0]);
        top_bar[0].addEventListener("click", ReAddButton); // if clicking on different page, add button again 
    });

    // https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
    var oldHref = document.location.href;
    window.onload = function() {
        var bodyList = document.querySelector("body")

        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (oldHref != document.location.href) {
                    oldHref = document.location.href;
                    //console.log("URL changed");
                    ReAddButton();
                }
            });
        });
        var config = {
            childList: true,
            subtree: true
        };
        observer.observe(bodyList, config);
    };

})();


var last_played_video = null;
// intercept XMLHttpRequests
(function(open) {
    XMLHttpRequest.prototype.open = function(method, url, async, user, password) {
        this.addEventListener("readystatechange", function() {
            if (this.readyState != 4) return;       // not done yet
            if (!url.contains("/info/")) return;    // not a post info request
            if (!this.responseText.contains("video_versions")) return; // not a post with video
            
            // parse response json
            var response = JSON.parse(this.responseText);

            var post_code = response.items[0].code;
            var video_versions = response.items[0].video_versions;
            /*
            console.log("All video versions: ");
            for (const video of video_versions) {
                console.log("Resolution: " + video.width + "x" + video.height + " " + video.url);
            }
            */
            var hq_video = video_versions[0];
            last_played_video = hq_video;

            var post_direct_link = "https://www.instagram.com/p/" + post_code + "/";
            
            console.log(
                `Post: https://www.instagram.com/p/${post_code}/\n` +
                `${hq_video.width}x${hq_video.height}: ${hq_video.url}`
            );
            
            console.log("Post: " + post_direct_link);
            console.log(`${hq_video.width}x${hq_video.height}: ${hq_video.url}`);

        });
        open.call(this, method, url, async, user, password);
    }
}) (XMLHttpRequest.prototype.open);
