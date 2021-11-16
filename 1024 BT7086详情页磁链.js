// ==UserScript==
// @name         1024 BT7086详情页磁链
// @include      *://*.downsx.*/*
// @include      *://*.*.*/torrent/*
// @include      *://bitsdts.*/*
// @version      0.2
// @description  1024 BT7086详情页磁链
// @author       ifwlzs
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    var url=document.querySelectorAll(".uk-button")[1].href
    document.querySelector('.dlboxbg').innerHTML="<a href=\'"+url+" \'>"+url+"</a>"
    // Your code here...
})();
