// ==UserScript==
// @name         98堂色花堂磁链直达
// @include      *
// @version      0.2
// @description  98堂色花堂磁链直达
// @author       ifwlzs
// @grant        none
// @run-at       document-end
// @icon         https://sehuatang.org/favicon.ico
// @updateURL	 https://cdn.jsdelivr.net/gh/ifwlzs/tampermonkeyScript@main/script/98%E5%A0%82%E8%89%B2%E8%8A%B1%E5%A0%82%E7%A3%81%E9%93%BE%E7%9B%B4%E8%BE%BE.js
// ==/UserScript==

(function() {
    'use strict';
    var magnet=document.querySelector(".blockcode > div > ol > li").textContent
    document.querySelector(".blockcode > div > ol > li").innerHTML="<a href=\'"+magnet+" \'>"+magnet+"</a>"
    // Your code here...
})();
