// ==UserScript==
// @name         2048 详情页直达
// @include      *://download.bbcd.tw/*
// @include      *://download.downsx.org/*
// @include      *://*.hjddown.com/*
// @include      *://*/2048/*
// @require      https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js
// @version      0.3
// @description  2048 详情页直达
// @author       ifwlzs
// @grant        none
// @updateURL	 https://fastly.jsdelivr.net/gh/ifwlzs/myScript@main/tampermonkeyScript/2048%E7%A3%81%E9%93%BE%E7%9B%B4%E8%BE%BE.js
// @run-at       document-end
// @icon         https://b.lpq0.site/2048/favicon.ico
// ==/UserScript==

(function() {

    'use strict';
     $(document).ready(function () {
         var url=document.querySelector(".uk-button").href;
		 url=url.replace(" ","")
        document.querySelector('.dlboxbg').innerHTML="<a href=\'"+url+" \'>"+url +"</a>"
    })
    // Your code here...
})();
