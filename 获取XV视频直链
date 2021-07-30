// ==UserScript==
// @name         获取XV视频直链
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  获取最高质量的视频链接，方便idm,aria2等下载器下载
// @author       ifwlzs
// @include        *//*.xnxx.*/*
// @include        *//*.xvideos.*/*
// @icon         https://www.google.com/s2/favicons?domain=xvideos.com
// @run-at          document-end
// ==/UserScript==

(function() {
    'use strict';

    var style=
        '.xxxx ._th-item{margin-bottom: 3px;position: relative;width: 0;height: 0;cursor: pointer;opacity: .3;background-color: aquamarine;border-radius: 100%;text-align: center;line-height: 30px;-webkit-transition: all .35s;-o-transition: all .35s;transition: all .35s;right: 30px}'+
        '.xxxx ._th-item, .xxxx ._th-click-hover,._th_cover-all-show-times ._th_times{-webkit-box-shadow: -3px 4px 12px -5px black;box-shadow: -3px 4px 12px -5px black}'+
        '.xxxx:hover ._th-item._item-xx2{margin-left: 18px;width: 40px;height: 40px;line-height: 40px}'+
        '.xxxx:hover ._th-item._item-xx-2{margin-left: 17px;width: 38px;height: 38px;line-height: 38px}'+
        '.xxxx:hover ._th-item._item-x2{width: 36px;height: 36px;margin-left: 16px;line-height: 36px}'+
        '.xxxx:hover ._th-item._item-x-2{width: 32px;height: 32px;line-height: 32px;margin-left: 14px}'+
        '.xxxx:hover ._th-item._item-reset{width: 30px;line-height: 30px;height: 30px;margin-left: 10px}'+
        '.xxxx:hover{right: -5px}'+
        '.xxxx{background-color: #6c9;padding: 15px;font-size: 20px;color: #ff0;border: 1px solid;border-radius: 90px;-webkit-transition: all.5s;-o-transition: all.5s;transition: all.5s;right: -35px;top: 20%;position: fixed;-webkit-box-sizing: border-box;box-sizing: border-box;z-index: 100000;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}'+
        '.xxxx ._th-item:hover{opacity: .8;background-color: #5fb492;color: aliceblue}'+
        '.xxxx ._th-item:active{opacity: .9;background-color: #1b3a26;color: aliceblue}'+
        '.xxxx:hover ._th-click-hover{opacity: .8}'+
        '.xxxx:hover ._th-item{opacity: .6;right: 0}'+
        '.xxxx ._th-click-hover:hover{opacity: .8;background-color: #5fb492;color: aliceblue}'+
        '.xxxx._th-click-hover:hover{opacity:.8;background-color:#5fb492;color:aliceblue}';
    var stylenode = document.createElement('style');
    stylenode.innerHTML = style;
    document.head.appendChild(stylenode)
    var html=document.getElementsByTagName('html')[0].innerHTML;
    var vedio_src=html.match("html5player.setVideoUrlLow(.*);")[0].split("\'")[1]
    console.log(vedio_src)
    var replaced="<a href=\""+vedio_src+"\">直链</a>"
    var node = document.createElement('div');
    node.setAttribute("class","xxxx")
    node.innerHTML = replaced;
    document.body.appendChild(node)
    // Your code here...
})();
