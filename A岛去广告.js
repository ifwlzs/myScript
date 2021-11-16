// ==UserScript==
// @name         A岛去广告
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  A岛去广告
// @author       ifwlzs
// @include      *://adnmb*.*/*
// @require      https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    /*setTimeout(function(){
    var x = document.querySelectorAll("");
    for (var i = 0; i < x.length; i++) {
        //console.log(x[i].parentNode.parentNode.parentNode)
        x[i].parentNode.parentNode.parentNode.style.display="none"
    }},3000
   )*/
     $(document).ready(function () {
       document.querySelector("#h-content > div.uk-container > div.h-threads-list > div > div.h-threads-item-replys > div:nth-child(1) > div.h-threads-item-reply-main > div.h-threads-info > a").parentNode.parentNode.parentNode.style.display='none'
    })

    // Your code here...
})();
