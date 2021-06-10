// ==UserScript==
// @name         Legado 书
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       93xo.ox39@gmail.com
// @description  web看书快变色！
// @include        *://*.*.*:1122/new/index.html
// @include        *://*:1122/new/index.html
// @require      https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function toChangeLegadoColor(){

        document.title=sessionStorage.getItem('bookName');
        document.getElementsByClassName("chapter")[0].style.color="#39cccc";
        document.getElementsByClassName("chapter")[0].style.border="1px solid #034e51";
        document.getElementsByClassName("el-popover")[0].style.color="#66ccff"
        for(var i=0;i<7;i++){
            if(i<5){
                document.getElementsByClassName("icon-text")[i].style.color="#39cccc"
            }
            document.getElementsByClassName("tool-icon")[i].style.color="#39cccc"
            document.getElementsByClassName("tool-icon")[i].style.border="1px solid #034e51"
        }

    }
    $(document).ready(function () {
        toChangeLegadoColor()
    })
    // Your code here...


})();
