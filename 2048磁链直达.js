// ==UserScript==
// @name         2048磁链直达
// @include      *://*.*.*/2048/*
// @version      0.1
// @description  2048磁链直达
// @author       93xo.ox39@gmail.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
document.querySelector("#code1 > ol > li").innerHTML="<a href=\'"+document.querySelector("#code1 > ol > li").textContent+" \'>"+document.querySelector("#code1 > ol > li").textContent+"</a>"
    // Your code here...
})();
