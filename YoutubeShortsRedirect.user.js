// ==UserScript==
// @name         Redirect Shorts
// @version      0.1
// @description  No shorts page
// @author       Fury Zenblade#1337
// @match        https://www.youtube.com/shorts/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

// todo: also redirect when clicking on short from youtube 
(function() {
    'use strict';
    window.location.href = window.location.href.replace("shorts/", "watch?v=");
})();
