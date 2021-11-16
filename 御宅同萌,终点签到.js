// ==UserScript==
// @name         御宅同萌,终点签到
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  御宅同萌,终点论坛签到
// @author       ifwlzs
// @include      *://*.*.*/k_misign-sign.html
// @icon         https://bbs.zdfx.net/favicon.ico
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector("#JD_sign").click()
    // @run-at       document-end
    // Your code here...
})();
