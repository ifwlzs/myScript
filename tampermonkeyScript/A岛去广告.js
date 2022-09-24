// ==UserScript==
// @name         A岛去广告
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  A岛去广告
// @author       ifwlzs
// @include      *://adnmb*.*/*
// @require      https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js
// @icon         https://adnmb3.com/Public/img/ac-bitmap.png
// @grant        none
// @run-at       context-menu
// @updateURL	 https://fastly.jsdelivr.net/gh/ifwlzs/myScript@main/tampermonkeyScript/A%E5%B2%9B%E5%8E%BB%E5%B9%BF%E5%91%8A.js
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
