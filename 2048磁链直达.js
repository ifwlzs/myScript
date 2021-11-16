// ==UserScript==
// @name         2048磁链直达
// @include      *://*.*.*/2048/*
// @version      0.1
// @description  2048磁链直达
// @author       ifwlzs
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var magnet=document.getElementById("code2").textContent;
    document.getElementById("code2").innerHTML="<a href=\""+magnet+"\">"+magnet+"</a>"
    var magnet1=document.querySelector("#code1 > ol > li").textContent;
    document.querySelector("#code1 > ol > li").innerHTML="<a href=\'"+magnet1+" \'>"+magnet1+"</a>"
    // Your code here...

})();
