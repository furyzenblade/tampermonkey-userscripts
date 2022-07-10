// ==UserScript==
// @name         Instagram Wide
// @version      0.2
// @updateURL    https://github.com/furyzenblade/tampermonkey-userscripts/raw/master/InstagramWide.user.js
// @description  Make elements bigger
// @author       Fury Zenblade#1337
// @match        http*://www.instagram.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=instagram.com
// @run-at       document-start
// @grant        GM_addStyle
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle("._ab8j._ab8l._ab8w._ab94._ab99._ab9h._ab9k._ab9p._ab9s { max-width: none !important }"); // dms
    GM_addStyle("._acun { max-width: none !important }"); // top bar

    // home page
    GM_addStyle("._aak6._aak7._aak8._aak9._aaka { display: none !important }"); // remove side bar
    GM_addStyle("._a3gq ._aam3 { max-width: none !important }"); // max width
    GM_addStyle("._a3gq ._aam2 { width: 80% !important; margin-left: 10% !important}"); // make a little smaller

    // post view
    GM_addStyle("._aasw { background-color: rgb(0, 0, 0, 0.33) !important }"); // post comment section transparent
    GM_addStyle("._aasi { background-color: rgb(0, 0, 0, 0.33) !important }"); // post comment section user bar transparent
    GM_addStyle("._a3gq ._aa61 { background: transparent !important }"); // search panel transparent
    GM_addStyle("._a3gq ._aa5u { background: rgb(0, 0, 0, 0.75) !important }"); // *
    GM_addStyle("._a3gq ._abm4:hover { background-color: rgb(14, 15, 15, 0.75) !important }"); // *

    // single post view
    GM_addStyle("._a3gq ._aa6b { max-width: none !important }"); //width of post
    GM_addStyle("._a3gq ._aa6g { padding-top: 0px !important }"); // bottom padding
    GM_addStyle("._aacl._aaco._aacw._aacy._aad6 { background-color: rgb(var(--ig-secondary-background)) }"); // bottom line
    //GM_addStyle("._aa6e { max-width: 70% !important }"); // width of post
    GM_addStyle("._a3gq ._aa6b { padding: 20px 10px !important }"); // half top padding
    GM_addStyle("._a3gq ._abc8 { margin-top: calc(var(--base-unit) * 6) !important }"); // half bottom bar (padding)

    GM_addStyle("._acup { filter: invert(1) }"); // white logo color (dark mode)
    //GM_addStyle("._ab8w._ab94._ab99._ab9f._ab9m._ab9p._ab9y._aba8._abch._abck._abcl { filter: invert(1) }"); // dark reels icon

    GM_addStyle("._a3gq ._acat { background-color: #2a2a2a !important; border: transparent !important; }"); // filled buttons
    GM_addStyle("._a3gq ._abnd { background-color: #2a2a2a !important; border: transparent !important; }"); // filled buttons
})();
