// ==UserScript==
// @name         2048 详情页直达
// @include      *://download.bbcd.tw/*
// @include      *://download.downsx.org/*
// @version      0.1
// @description  2048 详情页直达
// @author       93xo.ox39@gmail.com
// @grant        none
// ==/UserScript==

(function() {

    'use strict';
document.querySelector('.dlboxbg').innerHTML="<a href=\'"+document.querySelector(".uk-button").href+" \'>"+document.querySelector(".uk-button").href+"</a>"
    // Your code here...
})();
