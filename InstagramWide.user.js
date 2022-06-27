// ==UserScript==
// @name         Instagram Wide
// @description  Make elements bigger
// @version      0.1
// @updateURL    https://github.com/furyzenblade/tampermonkey-userscripts/raw/master/InstagramWide.user.js
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

    // single post view
    GM_addStyle("._a3gq ._aa6b { max-width: none !important }"); //width of post
    GM_addStyle("._a3gq ._aa6g { padding-top: 0px !important }"); // bottom padding
    GM_addStyle("._aacl._aaco._aacw._aacy._aad6 { background-color: rgb(var(--ig-secondary-background)) }"); // bottom line
    GM_addStyle("._a3gq ._aa6b { padding: 0px !important }"); // top padding
    //GM_addStyle("._aa6e { max-width: 70% !important }"); // width of post
    //GM_addStyle("._ab8w._ab94._ab99._ab9f._ab9m._ab9p._abc8 { display: none !important }"); // bottom bar (padding)

    // fix logo color (dark mode)
    GM_addStyle(".sp_j88osDFh7lo_1_5x.sx_394de2 { filter: invert(1) }");
})();
