// ==UserScript==
// @name           磁力链文本变链接
// @namespace   ACScript
// @version         1.0
// @description   点击magnet协议文本变为超链接
// @author          狐狸
// @include         http://*
// @include         https://*
// @grant            none
// @run-at          document-end
// ==/UserScript==
 
 
(function() {
    document.onclick = function(e) {
        var link = /((magnet?:)(\.|\w|-|#|\?|=|\/|\+|@|%|&|:|;|!|\*|(?![\u4e00-\u9fa5\s*\n\r'"]))+)/g;
        if (!e.target.innerHTML.match(/<a/) && e.target.innerText.match(link) && e.path.length > 4) {
            e.target.innerHTML = e.target.innerHTML.replace(link ,'<a target="_blank" href="$1" style="text-decoration:underline;">$1</a>');
        }
    };
     
    })();