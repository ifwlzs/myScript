// ==UserScript==
// @name         1024 BT7086详情页磁链
// @include      *://*.downsx.*/*
// @include      *://*/torrent/*
// @include      *://bitsdts.*/*
// @include      *://*/pw/*
// @version      0.4
// @description  1024 BT7086详情页磁链
// @author       ifwlzs
// @grant        none
// @run-at       document-end
// @updateURL    https://cdn.jsdelivr.net/gh/ifwlzs/myScript@main/tampermonkeyScript/1024%20BT7086%E8%AF%A6%E6%83%85%E9%A1%B5%E7%A3%81%E9%93%BE.js
// @icon         https://avatars.githubusercontent.com/u/49548316?s=40&v=4
// ==/UserScript==

(function() {
    'use strict';
    var url=document.querySelectorAll(".uk-button")[1].href
	url=url.replace(" ","")
    document.querySelector('.dlboxbg').innerHTML="<a href=\'"+url+" \'>"+url+"</a>"
    // Your code here...
})();
