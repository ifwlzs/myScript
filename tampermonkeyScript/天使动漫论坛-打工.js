// ==UserScript==
// @name         天使动漫论坛-打工
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  天使动漫论坛-打工
// @author       ifwlzs
// @include      *://*.tsdm39.*/*
// @icon         https://www.google.com/s2/favicons?domain=tsdm39.net
// @grant        none
// @run-at       document-end
// @updateURL	 https://fastly.jsdelivr.net/gh/ifwlzs/myScript@main/tampermonkeyScript/%E5%A4%A9%E4%BD%BF%E5%8A%A8%E6%BC%AB%E8%AE%BA%E5%9D%9B-%E6%89%93%E5%B7%A5.js
// ==/UserScript==

(function() {
    'use strict';
    var ts_sidebar_base=document.getElementById("ts_sidebar_base");
    ts_sidebar_base.remove()
    var a=document.getElementsByTagName("a")
    for (var i=0;i<a.length;i++)
    {
        a[i]['href'] = "javascript: ;"
        a[i]['target'] = ""

    }

    var b =document.getElementById("advids")
    b=b.getElementsByTagName("a")
    for(i=0;i<6;i++){
       b[i].click()
      }
 
    // Your code here...
})();
