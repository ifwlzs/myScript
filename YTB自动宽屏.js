// ==UserScript==
// @name         YTB自动宽屏
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  YTB自动宽屏
// @author       ifwlzs
// @include      https://www.youtube.com/*
// @icon         https://www.google.com/s2/favicons?domain=youtube.com
// @grant        none
// @run-at      document-end
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector("#movie_player > div.ytp-chrome-bottom > div.ytp-chrome-controls > div.ytp-right-controls > button.ytp-size-button.ytp-button").click()
    // Your code here...
})();
