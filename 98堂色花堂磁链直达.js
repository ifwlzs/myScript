// ==UserScript==
// @name         98堂色花堂磁链直达
// @include      *
// @version      0.1
// @description  98堂色花堂磁链直达
// @author       93xo.ox39@gmail.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector(".blockcode > div > ol > li").innerHTML="<a href=\'"+document.querySelector(".blockcode > div > ol > li").textContent+" \'>"+document.querySelector(".blockcode > div > ol > li").textContent+"</a>"
    // Your code here...
})();
