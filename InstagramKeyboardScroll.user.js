// ==UserScript==
// @name         Instagram Keyboard Scroll
// @version      0.1
// @description  Hotkeys to scroll: W - Up, S - Down [on homepage scroll to next post on keypress
// @author       Fury Zenblade#1337
// @match        http*://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @grant        none
// ==/UserScript==
function ScrollToTargetAdjusted(element, offset){
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// todo: add holding down key to (scroll faster) scroll continously and magnet to nearest post
function ScrollToNextPost(posts, offset, down){
    var scrollTolerance = 2;
    if (down){ // scroll down
        for (var i = 0; i < posts.length; i++) {
            if (posts[i].getBoundingClientRect().top - offset > scrollTolerance) {
                ScrollToTargetAdjusted(posts[i], offset); // stillScrolling = setTimeout with duration of window.scrollTo
                return;
            }
        }
    } else { // scroll up
        for(var j = posts.length - 1; j > 0; j--) {
            if (posts[j].getBoundingClientRect().top - offset < -scrollTolerance) {
                ScrollToTargetAdjusted(posts[j], offset);
                return;
            }
        }
    }
}
(function() {
    'use strict';
    var topbarOffset = 60; // height of navigation bar at the top
    var posts = document.getElementsByTagName("article"); // in view loaded posts - document.getElementsByClassName(" _ab6k _ab6l _ab6m _aatb _aatc _aate _aatf _aati");
    window.addEventListener('keydown', function (e) {
        switch (e.key) {
            case "w":
                posts = document.getElementsByTagName("article");
                ScrollToNextPost(posts, topbarOffset, false);
                break;
            case "s":
                posts = document.getElementsByTagName("article");
                ScrollToNextPost(posts, topbarOffset, true);
                break;
            default:
                break;
        }
    }, false);
})();
