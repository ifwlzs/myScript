// ==UserScript==
// @name         花火签到
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  花火签到
// @author       ifwlzs
// @match        https://www.sayhuahuo.com/dsu_paulsign-sign.html
// @icon         https://www.sayhuahuo.com/favicon.ico
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector("#wl > center > img").click()
    document.querySelector("#todaysay").value="每天保持签到"
    document.querySelector("#qiandao > table:nth-child(11) > tbody > tr > td > div > a > img").click()
    // Your code here...
})();
