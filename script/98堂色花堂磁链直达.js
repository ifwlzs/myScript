// ==UserScript==
// @name         98堂色花堂磁链直达
// @include      *
// @version      0.2
// @description  98堂色花堂磁链直达
// @author       ifwlzs
// @grant        none
// @run-at       document-end
// @icon         https://sehuatang.org/favicon.ico
// ==/UserScript==

(function() {
    'use strict';
    var magnet=document.querySelector(".blockcode > div > ol > li").textContent
    document.querySelector(".blockcode > div > ol > li").innerHTML="<a href=\'"+magnet+" \'>"+magnet+"</a>"
    // Your code here...
})();
