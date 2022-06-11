// ==UserScript==
// @name         TikTok Proxy Redirect
// @version      0.1
// @description  Redirect to a TikTok proxy for downloading purposes
// @author       Fury Zenblade#1337
// @match        https://www.tiktok.com/*/video/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tiktok.com
// @grant        none
// @run-at       context-menu
// ==/UserScript==

(function() {
    'use strict';
    //get current URL
    var url = window.location.href;

    var video;
    //check if argument exists
    if (url.indexOf("?") > -1) {
        video = url.substring(url.indexOf("video/") + "video/".length, url.indexOf("?"));
    } else {
        //get everything after video/
        video = url.substring(url.indexOf("video/") + "video/".length);
    }
    var redirectLink = "https://proxitok.herokuapp.com/@placeholder/video/" + video;

    //open redirectLink
    window.open(redirectLink);
})();
