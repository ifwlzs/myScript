// ==UserScript==
// @name         阅读web给爷变色
// @namespace    http://tampermonkey.net/
// @version      0.1
// @author       ifwlzs
// @description  web看书快变色！
// @include        *://*.*.*:1122/bookshelf/index.html
// @include        *://*:1122/bookshelf/index.html
// @require      https://cdn.staticfile.org/jquery/3.4.1/jquery.min.js
// @icon         https://github.com/gedoor/legado/raw/master/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png
// @grant        none
// @updateURL	 https://cdn.jsdelivr.net/gh/ifwlzs/myScript@main/tampermonkeyScript/%E9%98%85%E8%AF%BBweb%E7%BB%99%E7%88%B7%E5%8F%98%E8%89%B2.js
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
