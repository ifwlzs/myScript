// ==UserScript==
// @name         2048磁链直达
// @include      *://*.*.*/2048/*
// @version      0.3
// @description  2048磁链直达
// @author       ifwlzs
// @grant        none
// @run-at       document-end
// @icon         https://b.lpq0.site/2048/favicon.ico
// ==/UserScript==

(function() {
    'use strict';
    var magnet=document.getElementsByClassName("blockquote2")[0].textContent;
    document.getElementsByClassName("blockquote2")[0].innerHTML="<a href=\""+magnet+"\">"+magnet+"</a>"
    var magnet1=document.querySelector("#code1 > ol > li").textContent;
    document.querySelector("#code1 > ol > li").innerHTML="<a href=\'"+magnet1+" \'>"+magnet1+"</a>"
    // Your code here...

})();
