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
