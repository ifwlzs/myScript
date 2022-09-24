// ==UserScript==
// @name         YTB自动宽屏
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  YTB自动宽屏
// @author       ifwlzs
// @include      https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// @run-at       context-menu
// @updateURL	 https://fastly.jsdelivr.net/gh/ifwlzs/myScript@main/tampermonkeyScript/YTB%E8%87%AA%E5%8A%A8%E5%AE%BD%E5%B1%8F.js
// ==/UserScript==

(function() {
    'use strict';
    var button=document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-right-controls > button.ytp-size-button.ytp-button")
    button.click()
    // Your code here...
})();
