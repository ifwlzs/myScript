// ==UserScript==
// @name         2048 详情页直达
// @include      *://download.bbcd.tw/*
// @include      *://download.downsx.org/*
// @include      *://*.hjddown.com/*
// @require      https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js
// @version      0.2
// @description  2048 详情页直达
// @author       ifwlzs
// @grant        none
// @run-at       document-end
// @icon         https://b.lpq0.site/2048/favicon.ico
// ==/UserScript==

(function() {

    'use strict';
     $(document).ready(function () {
         var url=document.querySelector(".uk-button").href;
        document.querySelector('.dlboxbg').innerHTML="<a href=\'"+url+" \'>"+url +"</a>"
    })
    // Your code here...
})();
