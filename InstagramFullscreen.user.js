// ==UserScript==
// @name         Instagram Fullscreen
// @version      0.1
// @updateURL    https://github.com/furyzenblade/tampermonkey-userscripts/raw/master/InstagramFullscreen.user.js
// @description  Add full screen button
// @author       Fury Zenblade#1337
// @match        https://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @grant        none
// ==/UserScript==

function WaitForElement(selector, callback) { // @_@
    if (document.querySelector(selector)) {
        callback();
    } else {
        setTimeout(function() {
            WaitForElement(selector, callback);
        }, 100);
    }
}

function HideVideoButtons(state){
    // todo: for photos too
    var hasTaggedButton = document.getElementsByClassName("_aato _ab1k _ab1l")[0].children.length > 4;
    if (state){
        document.getElementsByClassName("_aato _ab1k _ab1l")[0].children[3].style.display = "none"; // volume button
        if (!hasTaggedButton) return;
        document.getElementsByClassName("_aato _ab1k _ab1l")[0].children[4].style.display = "none"; // tagged button
    } else {
        document.getElementsByClassName("_aato _ab1k _ab1l")[0].children[3].style.display = "";
        if (!hasTaggedButton) return;
        document.getElementsByClassName("_aato _ab1k _ab1l")[0].children[4].style.display = "";
    }
}

function SetFullscreen(state) {
    WaitForElement("._aata", function(){
        if (state){
            document.getElementsByClassName("_aata")[0].style.display = "none"; // comment section
            HideVideoButtons(true);
        } else {
            document.getElementsByClassName("_aata")[0].style.display = "";
            HideVideoButtons(false);
        }
    })
}


(function() {
    'use strict';
    //console.log("Fullscreen script loaded");

    var isFullscreen = false;
    // https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
    var oldHref = document.location.href;
    window.onload = function() {
        var bodyList = document.querySelector("body")
    
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (document.location.href != oldHref) {
                    oldHref = document.location.href;
                    if (!document.location.href.contains("/p/")) return;
                    //console.log("UI changed");
                    
                    if (!document.getElementById("fullscreen_button")){
                        var x_button = document.getElementsByClassName("o9tjht9c jar9mtx6 mbzxb4f5 njoytozt")[0]; // X button

                        var fullscreen_button = document.createElement("button");
                        //fullscreen_button.innerHTML = "Full";
                        fullscreen_button.id = "fullscreen_button";
                        fullscreen_button.style.cssText = "background-color: transparent; border: 0px solid #fff; border-radius: 0px; padding: 0px; margin-left: 0px;";
                        
                        var fullscreen_button_div = document.createElement("div");
                        fullscreen_button_div.style.width = "34px";
                        fullscreen_button_div.style.height = "34px";
                        
                        var fullscreen_button_image = document.createElement("img");
                        fullscreen_button_image.src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNHB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNCAxNCIgd2lkdGg9IjE0cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZXNjLz48ZGVmcy8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PGcgZmlsbD0iIzAwMDAwMCIgaWQ9IkNvcmUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTUuMDAwMDAwLCAtMjU3LjAwMDAwMCkiPjxnIGlkPSJmdWxsc2NyZWVuIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMTUuMDAwMDAwLCAyNTcuMDAwMDAwKSI+PHBhdGggZD0iTTIsOSBMMCw5IEwwLDE0IEw1LDE0IEw1LDEyIEwyLDEyIEwyLDkgTDIsOSBaIE0wLDUgTDIsNSBMMiwyIEw1LDIgTDUsMCBMMCwwIEwwLDUgTDAsNSBaIE0xMiwxMiBMOSwxMiBMOSwxNCBMMTQsMTQgTDE0LDkgTDEyLDkgTDEyLDEyIEwxMiwxMiBaIE05LDAgTDksMiBMMTIsMiBMMTIsNSBMMTQsNSBMMTQsMCBMOSwwIEw5LDAgWiIgaWQ9IlNoYXBlIi8+PC9nPjwvZz48L2c+PC9zdmc+";
                        fullscreen_button_image.style.filter = "invert(100%)";
                        fullscreen_button_image.style.width = "50%";
                        fullscreen_button_image.style.height = "50%";
                        fullscreen_button_image.style.opacity = "0.85";

                        fullscreen_button_div.appendChild(fullscreen_button_image);
                        fullscreen_button.appendChild(fullscreen_button_div);

                        fullscreen_button.onclick = function() {
                            isFullscreen = !isFullscreen;
                            SetFullscreen(isFullscreen);
                        }
                        x_button.appendChild(fullscreen_button);
                    }
                    SetFullscreen(isFullscreen); // update UI
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
