// ==UserScript==
// @name CL1024改进版（菊改：已适配手机版）
// @namespace CL1024
// @version 0.2
// @description 草榴社区 - 「取消viidii跳转」「种子链接转化磁链接」「去帖子广告」「阅读帖子按楼数快速跳转楼层」「帖子内隐藏1024的回复」「今日帖子加亮」「超大图片根据屏幕缩放」「快捷键：详细页J/K 上/下一个回复，F6跳转技术讨论区，【.】返回顶部」
// @copyright 2012-2015 rose20.99.c@gmail.com
// @require https://cdn.bootcss.com/jquery/1.8.3/jquery.min.js
// @include http*://cl.*.*/*
// @include http*://*.ty66.*/*
// @updateURL	 https://cdn.jsdelivr.net/gh/ifwlzs/tampermonkeyScript@main/script/CL1024%E6%94%B9%E8%BF%9B%E7%89%88%EF%BC%88%E8%8F%8A%E6%94%B9%EF%BC%9A%E5%B7%B2%E9%80%82%E9%85%8D%E6%89%8B%E6%9C%BA%E7%89%88%EF%BC%89.js
// 原作者信息
// @author      rose1988c
// ==/UserScript==
(function() {
    // code https://github.com/rose1988c/Caoliu.plug
    if (document.title.indexOf('草榴') != -1) {

        var CONSTANTS = {
            'version': '1.3.1',
            'localurl': window.location.href,
            'localhost': window.location.host,
            'regularVii': /www.viidii.com|www.viidii.info/,
            'regularBlog': /htm_mob|htm_mob|read.php/gi,
            'regularList': /thread/gi,
            'regularCat': /hash/gi,
            'readurl': 'http://' + window.location.host + '/read.php',
            'tips': '<div class="tips_container"><div class="close">X</div>去<input type="text" class="input-w80" placeholder="" id="wantlc" name="wantlc" />樓<input type="button" id="gotolc" value="Go" /> or <input type="button" id="goback" value="Back" onclick="history.go(-1);"><br /></div>',
            'css': '.tips_container{position:fixed;bottom:2em;right:2em;color:green;opacity:0.4;background:#fff;padding:10px;z-index:99999}.tips_container:hover{opacity:0.9}.tips_container .close{position:absolute;top:0;right:0;color:red;cursor:pointer}.tips_container select, .tips_container select option{max-width:18em} input.input-w80 {background: none repeat scroll 0 0 #FFFFFF; border: 1px solid #B2CCCC; height: 18px;line-height: 18px;margin: 2px;padding: 0 3px;width:40px;}.hidden1024{height:36px;overflow:hidden;}',
            'indexcss': '.posttoday{color:#f60;}'
        };

        var PLANETWORK = {
            isPlanetHasWater: function() {
                return CONSTANTS.regularBlog.test(CONSTANTS.localurl);
            },
            isPlanetHasPeople: function() {
                return CONSTANTS.regularList.test(CONSTANTS.localurl);
            },
            KillVill: function(orginUrl) {
                var decodeStr = /.*\?(http|https):/g;
                var decodeSig = /______/g;
                var jsSuffix = '&amp;z';
                var htmlSuffix = '&z';
                var returnSuffix = 'return false';
                if (orginUrl.indexOf('viidii') != -1) {
                    var pureUrl = orginUrl.replace(decodeStr, 'http:').replace(decodeSig, '.').replace(jsSuffix, '').replace(htmlSuffix, '').replace(returnSuffix, '');
                    return pureUrl;
                } else {
                    return orginUrl;
                }
            },
            Mercury: function() {
                var self = this;
                // 处理链接
                var linkNode = $('a[href*=\'viidii\']');
                if (linkNode.length != 0) {
                    linkNode.each(function() {
                        var orginLink = $(this).attr('href');
                        var pureLink = self.KillVill(orginLink);
                        $(this).attr('href', pureLink);
                    });
                }

                linkNode = $('a[href*=\'hash\=\']');
                if (linkNode.length != 0) {
                    linkNode.each(function() {
                        var orginLink = $(this).attr('href');

                        var tempLink = orginLink.split('hash=');
                        var hrefMagnet = 'magnet:?xt=urn:btih:' + tempLink[1].substring(3);

                        $(this).after('<a href="' + orginLink + '" target="_blank">下载种子</a>');
                        $(this).attr('href', hrefMagnet).text(hrefMagnet);
                        $(this).parent().addClass('link-braces');
                    });
                }
            },
            Venus: function() {
                //add @ 20190620
                //屏蔽最新的viidii跳转的的绑定事件
                $('img[data-src],input[data-src]').each(function(){
                    $(this).attr('src',$(this).attr('data-src'));
                    $(this).click(function(){
                        window.open(this.src);
                        return false;
                    });
                });
                //替换a标签的viidii链接
                $('a').each(function() {
                    var thiz=$(this);
                    var href=thiz.attr('href');
                    if (CONSTANTS.regularVii.test(href)) {
                        var newurl = href.replace('http://www.viidii.com/?', '').replace('http://www.viidii.info/?', '').replace(/______/g, '.').replace(/&z/g, '');
                        thiz.attr('href', newurl);
                    }
                });
                //替换图片的viidii链接
                $('img,input[type=image]').each(function() {
                    var thiz = $(this);
                    var thizonclick = thiz.attr('onclick');
                    if (CONSTANTS.regularVii.test(thizonclick)) {
                        var newonclick = thizonclick.replace('http://www.viidii.com/?', '').replace('http://www.viidii.info/?', '').replace(/______/g, '.').replace(/&z/g, '');
                        thiz.attr('onclick', newonclick).css('cursor', 'pointer');
                    }

                    if (thiz.parent().attr('class') != 'tac') {
                        var setwidth = parseInt(screen.width)-40;
                        imgReady(thiz.attr('src'), function() {
                            var imgWidth = this.width;
                            var imgHeight = this.height;
                            if (imgWidth > setwidth) {
                                newWidth = setwidth;
                                newHeight = (setwidth / imgWidth) * imgHeight;
                                thiz.width(newWidth);
                                thiz.height(newHeight);
                                thiz.closest('td').width(setwidth + 16);
                                thiz.closest('div').width(setwidth + 16);
                            }

                        });
                    }
                });
                [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
                    img.style = 'cursor:pointer';
                    img.onclick = function(){
                        window.open(img.src);
                        return false;
                    }
                });

            },
            Earth: function() {
                $('.sptable').remove();
            },
            Mars: function() {
                var target = UTILS.getQueryStringByName('target');

                $('a[class=s3]').each(function(i, val) {
                    var a_html = $(this).html();
                    if (a_html.indexOf('樓') > 0) {
                        var parentdiv = $(this).closest('div.t2');
                        a_html = a_html.replace(/[^0-9]/ig, '');
                        parentdiv.attr('id', 'post_' + parseInt(a_html));
                    }
                });

                UTILS.addCss(CONSTANTS.css);
                UTILS.addDom(CONSTANTS.tips, function() {
                    return false;
                });
                UTILS.onlynum('wantlc');

                // Bind Quick redirct by input Enter Key - cat
                $('#wantlc').bind('keyup', function(event) {
                    if (event.keyCode == 13) {
                        $('#gotolc').click();
                    }
                });

                // $("#wantlc").focus(); 悲剧，先注释了。

                $('.close').click(function() {
                    $(this).parent().remove();
                });

                $('#gotolc').click(function() {
                    var wantlc = parseInt($(this).prev().val()); // 想去的楼层 - cyw
                    var locationurlarray = UTILS.getQueryString(CONSTANTS.localurl);

                    if (wantlc != '') {
                        var urlgetpage = UTILS.getQueryStringByName('page');
                        var page = Math.ceil((wantlc + 1) / 25);

                        if (urlgetpage == page) {
                            UTILS.html_scrollTop_target('post_' + wantlc);
                            return false;
                        }

                        if (locationurlarray.length > 1) {
                            var rePage = /page/gi;
                            var reTarget = /target/gi;
                            for (var i = locationurlarray.length - 1; i >= 0; i--) {
                                // page and target
                                if (rePage.test(locationurlarray[i])) {
                                    locationurlarray[i] = 'page=' + page;
                                }
                                if (reTarget.test(locationurlarray[i])) {
                                    locationurlarray = UTILS.array_prototype_del(locationurlarray, i);
                                }
                            }
                            locationurlarray = locationurlarray.join('&');
                            window.location.href = CONSTANTS.readurl + '?' + locationurlarray + '&target=post_' + wantlc;
                            // window.open();
                            return false;
                        } else {
                            locationurlarray = CONSTANTS.localurl.split('/'); // Get tid
                            var tid = locationurlarray.pop().split('.');
                            if (typeof(tid[0]) != 'undefined') {
                                tid = tid[0];
                                window.location.href = CONSTANTS.readurl + '?tid=' + tid + '&page=' + page + '&target=post_' + wantlc;
                                return false;
                            }
                        }
                    }
                });

                UTILS.html_scrollTop_target(target);

                //hide1024
                $('div.t2').each(function() {
                    var thiz = $(this);
                    var html = thiz.children().find('.tpc_content').html();
                    var thiz_id = thiz.attr('id');

                    if (html == '1024'||html == '感谢分享') {
                        thiz.addClass('hidden1024');

                        var tiptop = thiz.find('.tiptop');
                        var thiz_lc = thiz.find('.tipad > span:last').children().clone();
                        tiptop.append('<a class="show1024" class="act-show-1024" rel="' + thiz_id + '" style="color:green" href="javascript:void(0);">显示</a> | ').append(thiz_lc);
                    }

                });

                $('.show1024').click(function() {
                    var thiz_id = $(this).attr('rel');
                    $('#' + thiz_id).toggleClass('hidden1024');
                });

                //快捷键
                $(document).keydown(function(e) {
                    if (e.keyCode == KEY_ASCLL.j) {
                        UTILS.shortcut_key_current();
                        UTILS.shortcut_key_jump(true, 'current-comment');
                        return false;
                    }
                    if (e.keyCode == KEY_ASCLL.k) {
                        UTILS.shortcut_key_current();
                        UTILS.shortcut_key_jump(false, 'current-comment');
                        return false;
                    }
                    if (e.keyCode == KEY_ASCLL.period) {
                        UTILS.html_scrollTop_target('top');
                        return false;
                    }
                    if (e.keyCode == KEY_ASCLL.f6) {
                        window.location.href = '/' + 'thread0806.php?fid=7';
                        return false;
                    }
                });
            },
            Jupiter: function() {
                // today 样式
                UTILS.addCss(CONSTANTS.indexcss);

                var today = new Date();
                today = UTILS.data_format(today, 'yyyy-MM-dd');

                $('.tr3').each(function() {
                    var tr3 = $(this);
                    time=$(this).find('span[class=s3]').text();
                    if(time.startsWith('今天'))
                    {
                        tr3.find('td:first').children().html('今天').addClass('sred');
                    }
                    else if(time.startsWith('昨天'))
                    {
                        tr3.find('td:first').children().html('昨').addClass('posttoday').css('color', '#CC99CC');
                    }
                    /*
          var postdata = $(this).find('a[class=f10]').next();
          if (postdata.text() == today) {
            postdata.addClass('posttoday');
            tr3.find('td:first').children().html('Today').addClass('posttoday').css('border-bottom', '1px dotted tomato');
          }
*/
                });
            },
            Saturn: function() {
                //edit by sbdx start
                //替换input image为img
                if($('.tpc_content'))
                {
                    $('.tpc_content input[type="image"]').each(function(i){$(this).replaceWith("<img src='"+$(this).attr('src')+"' border='0'/>");});
                }
                console.log('清理AD');
                r9aeadS=function(){};
                $('.tips').css('height','5px').css('width','5px').css('overflow','hidden');
                setTimeout(function(){$('.tips').remove();},500);
;                return;
                //*屏蔽GA广告
                /*
                var js = 'var _gaq = _gaq || [];';
                js += '_gaq.push([\'_setAccount\', \'UA-47114657-1\']);';
                js += '_gaq.push([\'_trackPageview\']);';
                js += 'function googleAnalytics(){';
                js += '        var ga = document.createElement(\'script\');ga.type = \'text/javascript\';';
                js += '        ga.async = true;ga.src = \'https://ssl.google-analytics.com/ga.js\';';
                js += '        var s = document.getElementsByTagName(\'script\')[0];';
                js += '        s.parentNode.insertBefore(ga, s)';
                js += '}';
                js += 'googleAnalytics();';
                js += '_gaq.push([\'_trackEvent\',\'dupanlink_script\',String(\'' + CONSTANTS.version + '\')]);';
                UTILS.addScript(js);
                */
            },
            Uranus: function() {},
            Neptune: function() {},
            Pluto: function() {
                // GM_addStyle function is not existed in chrome 27
                var GM_addStyle = GM_addStyle ||
                    function(css) {
                        var style = document.createElement('style');
                        style.type = 'text/css';
                        style.appendChild(document.createTextNode(css));
                        document.getElementsByTagName('head')[0].appendChild(style);
                    };

                // 增加自定义样式
                GM_addStyle('/*body{font-family:Tahoma;font-size:12px;background:#F9F9EC;}*/h1,h2,h3,h4,h5,h6,form,body{margin:0;padding:0;}td,th,div{word-break:break-all;word-wrap:break-word;}table{empty-cells:show;}img{border:0;}h3,h2{display:inline;font-size:14px;}h2 a,h3 a{color:#000;}h4{font-size:1.1em;margin:20px 0 10px;}textarea,input,select{font:12px Arial;vertical-align:middle;margin-bottom:1px;padding:1px 3px 0;}.c{clear:both;height:0;font:0/0 Arial;}.tal{text-align:left;}.tar{text-align:right;}.fr{float:right;}.fl{float:left;}a{text-decoration:none;color:#2f5fa1;}a:hover{text-decoration:underline;}.f12{font-size:12px;}.f14{font-size:14px;}.s1{color:green;}.s2{color:#984B98;}.s3{color:#FA891B;}.s4{color:#03F;}.s5{color:#659B28;}.gray{color:#818a89;}.f_one,.t_one,.r_one{background:#F9F9EC;}.f_two,.t_two,.r_two{background:#F4FBFF;}select{border:solid 1px #D4EFF7;}.btn{background:#A6CBE7;color:#004c7d;padding-left:15px;padding-right:15px;vertical-align:middle;border-width:1px;}.input{border:solid 1px #A6CBE7;font-size:1em;vertical-align:middle;padding:2px 0 2px 1px;}form{display:inline;}textarea{border:solid 1px #A6CBE7;}.toptool{border-bottom:1px solid #daebcd;}.toptool span{line-height:150%;padding:1px 5px;}.banner{padding-right:3%;background:#0F7884;}.t{border:1px solid #A6CBE7;margin:0 auto 8px;padding:1px;}.t table{border:0;width:100%;margin:0 auto;}.t2{border-top:#A6CBE7 1px solid;margin:0 auto 5px;}.t3{margin:auto;}.t4{padding:1px 0 1px 1px;}.h{border-bottom:4px solid #dbecF4;background:#B1D3E0;text-align:left;color:#004c7d;padding:5px 7px 3px;}.h a{font-family:Arial;color:#004c7d;}.h span a,.h span{color:#59b;}.h a.a2{margin-left:12px;}.tr1 th{text-align:left;vertical-align:top;font-weight:400;border-right:1px solid #D4EFF7;padding:5px 10px;}.tr1 td.td1{border:1px solid #D4EFF7;border-left:0;}.tr2{background:#f3f8ef;color:#659b28;}.tr2 td,.tr2 th{line-height:21px;border-bottom:1px solid #daebcd;border-top:1px solid #A6CBE7;padding:0 6px;}.tr2 a{color:#659b28;margin:2px;}.tr3 td,.tr3 th{border-bottom:1px solid #D4EFF7;border-right:1px solid #D4EFF7;padding:5px 8px;}.tr3 th{text-align:left;font-weight:400;}.tr4{background:#B1D3E0;color:#004c7d;}.tr4 td{padding:4px 10px;}.tr td,.tr th{padding:2px;}.tpc_content{font-size:14px;font-family:Arial;margin:0 0 2%;padding:0 2% 0 .5%;}.tips{background:#F4FBFF;border:#D4EFF7 1px solid;float:left;text-align:center;margin:0 1% 1% 0;padding:5px;}.tips li{list-style:none;float:left;overflow:hidden;white-space:nowrap;padding:0 5px;}.tiptop{border-bottom:1px solid #D4EFF7;vertical-align:middle;padding:0 0 5px;}.tipad{border-top:1px solid #D4EFF7;margin:10px 0 0;padding:5px 0 0;}.quote{font-size:70%;color:#004c7d;margin:2px;padding:0;}blockquote{width:92%;font-size:85%;color:#81888c;border:1px solid #D4EFF7;border-left-width:3px;margin:0 0 1%;padding:5px;}.menu{position:absolute;background:#fff;border:1px solid #A6CBE7;}.menu td,.menu li,.menu ul{background:#B1D3E0;margin:0;padding:0;}.menu li{list-style:none;}.menu a{display:block;padding:3px 15px;}.menu a:hover{background:#2f5fa1;text-decoration:none;color:#fff;}.menu ul.ul1 li a{display:inline;padding:0;}.pages{font:11px/12px Tahoma;margin:3px 0;}.pages a{border:1px solid #A6CBE7;text-align:center;text-decoration:none;font:normal 12px/14px verdana;margin:0 1px 0 0;padding:1px 4px;}.pages a:hover{border:#659b28 1px solid;background:#f3f8ef;text-decoration:none;color:#004c7d;}.pages input{margin-bottom:0;border:1px solid #659b28;height:15px;font:bold 12px/15px Verdana;padding-bottom:1px;padding-left:1px;margin-right:1px;color:#659b28;}#footer{width:98%;text-align:right;border-top:2px solid #dbecF4;border-bottom:#f3f8ef 12px solid;margin:auto;padding:5px 0;}.signature{height:expression(this.scrollHeight>parseInt(this.currentStyle.maxHeight)?this.currentStyle.maxHeight:auto);}.sptable h4{display:none;color:#66F;font-size:14px;padding-bottom:8px;margin:0 0 -.1em;}.sptable a{display:none;color:#390;}.sptable h4:hover{display:none;text-decoration:underline;}.sptable td{display:none;cursor:pointer;text-align:left;}h3,.fn,.fn a,.h span{font-weight:400;}.b,.h h2{font-weight:700;}.tac,.y-style{text-align:center;}.f9,.f10{font-size:11px;}#header,#main{width:98%;margin:auto;}.banner img,.pages *{vertical-align:middle;}');
            },
            Solar: function() {
                var isPlanetHasWater = this.isPlanetHasWater();
                var isPlanetHasPeople = this.isPlanetHasPeople();
                if (isPlanetHasWater) {
                    this.Mercury();
                    this.Venus();
                    this.Mars();
                    this.Earth();
                    this.Saturn();
                    this.Pluto();//样式
                } else if (isPlanetHasPeople) {
                    this.Jupiter();
                    this.Earth();
                    //this.Saturn();
                    this.Pluto();//样式
                    //UTILS.addDomObj('<tr align="center" class="tr3 t_one"><td><a title="下载chrome插件" href="http://cl.aacc.in/" target="_blank" class="posttoday hightLight hightLightFirst" style="border-bottom-width: 1px; border-bottom-style: dotted; border-bottom-color: rgb(255, 99, 71);">Today</a></td><td style="text-align:left;padding-left:8px" id=""><h3><a style="color:green;" href="http://cl.aacc.in/" target="_blank" id="">rose1988c推出更强大的CL1024谷歌插件，欢迎下载</a></h3><font color="green">[積分+999]</font><i style="color:red">new</i></td><td class="tal y-style"><a href="http://cl.aacc.in/" class="bl">rose1988c</a><div class="f10">2015-09-06</div></td><td class="tal f10 y-style">MarkTop</td><td class="tal y-style"><a href="http://cl.aacc.in/" class="f10"> 2015-09-06 11:38 </a><br>by: rose1988c</td></tr>', $('.tr3:first'));
                } else {
                    return false;
                }

            }
        };

        // ======================================================================
        // Helper
        // ======================================================================
        // hot key
        var KEY_ASCLL = {
            // Shift key, ⇧
            '⇧': 16,
            'shift': 16,
            // CTRL key, on Mac: ⌃
            '⌃': 17,
            'ctrl': 17,
            // ALT key, on Mac: ⌥ (Alt)
            '⌥': 18,
            'alt': 18,
            'option': 18,
            // META, on Mac: ⌘ (CMD), on Windows (Win), on Linux (Super)
            '⌘': 91,
            'meta': 91,
            'cmd': 91,
            'super': 91,
            'win': 91,
            // Backspace key, on Mac: ⌫ (Backspace)
            '⌫': 8,
            'backspace': 8,
            // Tab Key, on Mac: ⇥ (Tab), on Windows ⇥⇥
            '⇥': 9,
            '⇆': 9,
            'tab': 9,
            // Return key, ↩
            '↩': 13,
            'return': 13,
            'enter': 13,
            '⌅': 13,
            // Pause/Break key
            'pause': 19,
            'pause-break': 19,
            // Caps Lock key, ⇪
            '⇪': 20,
            'caps': 20,
            'caps-lock': 20,
            // Escape key, on Mac: ⎋, on Windows: Esc
            '⎋': 27,
            'escape': 27,
            'esc': 27,
            // Space key
            'space': 32,
            // Page-Up key, or pgup, on Mac: ↖
            '↖': 33,
            'pgup': 33,
            'page-up': 33,
            // Page-Down key, or pgdown, on Mac: ↘
            '↘': 34,
            'pgdown': 34,
            'page-down': 34,
            // END key, on Mac: ⇟
            '⇟': 35,
            'end': 35,
            // HOME key, on Mac: ⇞
            '⇞': 36,
            'home': 36,
            // Insert key, or ins
            'ins': 45,
            'insert': 45,
            // Delete key, on Mac: ⌫ (Delete)
            'del': 45,
            'delete': 45,

            // Left Arrow Key, or ←
            '←': 37,
            'left': 37,
            'arrow-left': 37,
            // Up Arrow Key, or ↑
            '↑': 38,
            'up': 38,
            'arrow-up': 38,
            // Right Arrow Key, or →
            '→': 39,
            'right': 39,
            'arrow-right': 39,
            // Up Arrow Key, or ↓
            '↓': 40,
            'down': 40,
            'arrow-down': 40,

            // odities, printing characters that come out wrong:
            // Num-Multiply, or *
            '*': 106,
            'star': 106,
            'asterisk': 106,
            'multiply': 106,
            // Num-Plus or +
            '+': 107,
            'plus': 107,
            // Num-Subtract, or -
            '-': 109,
            'subtract': 109,
            // ';': 186, //???
            // = or equals
            '=': 187,
            'equals': 187,
            // Comma, or ,
            ',': 188,
            'comma': 188,
            // '-': 189, //???
            // Period, or ., or full-stop
            '.': 190,
            'period': 190,
            'full-stop': 190,
            // Slash, or /, or forward-slash
            '/': 191,
            'slash': 191,
            'forward-slash': 191,
            // Tick, or `, or back-quote
            '`': 192,
            'tick': 192,
            'back-quote': 192,
            // Open bracket, or [
            '[': 219,
            'open-bracket': 219,
            // Back slash, or \
            '\\': 220,
            'back-slash': 220,
            // Close backet, or ]
            ']': 221,
            'close-bracket': 221,
            // Apostraphe, or Quote, or '
            '\'': 222,
            'quote': 222,
            'apostraphe': 222
        };

        // To minimise code bloat, add all of the NUMPAD 0-9 keys in a loop
        var i = 95,
            n = 0;
        while (++i < 106) {
            KEY_ASCLL['num-' + n] = i;
            ++n;
        }

        // To minimise code bloat, add all of the top row 0-9 keys in a loop
        i = 47;n = 0;
        while (++i < 58) {
            KEY_ASCLL[n] = i;
            ++n;
        }

        i = 111;n = 1;
        while (++i < 136) {
            KEY_ASCLL['f' + n] = i;
            ++n;
        }

        i = 64;
        while (++i < 91) {
            KEY_ASCLL[String.fromCharCode(i).toLowerCase()] = i;
        }
        //hotkey

        var imgReady = (function() {
            var list = [],
                intervalId = null,

                // 用来执行队列
                tick = function() {
                    var i = 0;
                    for (; i < list.length; i++) {
                        list[i].end ? list.splice(i--, 1) : list[i]();
                    }
                    if(!list.length)stop();
                },

                // 停止所有定时器队列
                stop = function() {
                    window.clearInterval(intervalId);
                    intervalId = null;
                };

            return function(url, ready, load, error) {
                var onready, width, height, newWidth, newHeight, img = new Image();

                img.src = url;

                // 如果图片被缓存，则直接返回缓存数据
                if (img.complete) {
                    ready.call(img);
                    if(load)(load.call(img));
                    return;
                }

                width = img.width;
                height = img.height;

                // 加载错误后的事件
                img.onerror = function() {
                    if(error){error.call(img);}
                    onready.end = true;
                    img = img.onload = img.onerror = null;
                };

                // 图片尺寸就绪
                onready = function() {
                    newWidth = img.width;
                    newHeight = img.height;
                    if (newWidth !== width || newHeight !== height ||
                        // 如果图片已经在其他地方加载可使用面积检测
                        newWidth * newHeight > 1024) {
                        ready.call(img);
                        onready.end = true;
                    }
                };
                onready();

                // 完全加载完毕的事件
                img.onload = function() {
                    // onload在定时器时间差范围内可能比onready快
                    // 这里进行检查并保证onready优先执行
                    if(!onready.end)onready();

                    if(load) load.call(img);

                    // IE gif动画会循环执行onload，置空onload即可
                    img = img.onload = img.onerror = null;
                };

                // 加入队列中定期执行
                if (!onready.end) {
                    list.push(onready);
                    // 无论何时只允许出现一个定时器，减少浏览器性能损耗
                    if (intervalId === null) intervalId = setInterval(tick, 40);
                }
            };
        })();

        // UTILS Func
        var UTILS = {
            addCss: function(str) {
                var style = document.createElement('style');
                style.textContent = str;
                document.head.appendChild(style);
            },
            getScript: function(src) {
                var script = document.createElement('script');
                script.src = src;
                document.body.appendChild(script);
            },
            addScript: function(js) {
                var oHead = document.getElementsByTagName('HEAD')[0],
                    oScript = document.createElement('script');
                oScript.type = 'text/javascript';
                oScript.text = js;
                oHead.appendChild(oScript);
            },
            addDom: function(html, callback) {
                var div = document.createElement('div');
                div.innerHTML = html;
                callback.call(div, div);
                document.body.appendChild(div);
            },
            addDomObj: function(html, obj) {
                obj.before(html);
            },
            validate: function(url) {
                var magnetPattern = /magnet:\?xt=urn:btih:([a-zA-Z0-9]+)/;
                if (magnetPattern.test(url)) {
                    return url.match(magnetPattern)[0];
                }
                return url;
            },
            getCookie: function(ae) {
                return (document.cookie.match(new RegExp('(^' + ae + '| ' + ae + ')=([^;]*)')) == null) ? '' : RegExp.$2;
            },
            proxy: function(fn) {
                var script = document.createElement('script');
                script.textContent = '(' + fn.toString() + ')(window);';
                document.body.appendChild(script);
            },
            isArray: function(o) {
                return Object.prototype.toString.call(o).indexOf('Array') !== -1;
            },
            array_prototype_del: function(array, n) {　 // n表示第几项，从0开始算起。
                if (n < 0) {　 // 如果n<0，则不进行任何操作。

                    return array;
                } else {
                    return array.slice(0, n).concat(array.slice(n + 1, array.length));
                }
                /*
     * concat方法：返回一个新数组，这个新数组是由两个或更多数组组合而成的。
     * 这里就是返回this.slice(0,n)/this.slice(n+1,this.length)
     * 组成的新数组，这中间，刚好少了第n项。 slice方法： 返回一个数组的一段，两个参数，分别指定开始和结束的位置。
     */
            },
            onlynum: function(input) {
                $('#' + input).keyup(function(e) {
                    $(this).val($(this).val().replace(/[^0-9)]+/, ''));
                }).focus(function() {
                    $(this).val($(this).val().replace(/[^0-9]+/, ''));
                });
            },
            getQueryString: function(url) {
                url = url || location.search;
                var result = url.match(new RegExp('[\?\&][^\?\&]+=[^\?\&]+', 'g'));
                if (result == null) return [];
                for (var i = 0; i < result.length; i++) {
                    result[i] = result[i].substring(1);
                }
                return result;
            },
            getQueryStringByName: function(name) {
                var result = location.search.match(new RegExp('[\?\&]' + name + '=([^\&]+)', 'i'));
                if (result == null || result.length < 1) {
                    return '';
                }
                return result[1];
            },
            getQueryStringByIndex: function(index) {
                if (index == null) {
                    return '';
                }
                var queryStringList = getQueryString();
                if (index >= queryStringList.length) {
                    return '';
                }
                var result = queryStringList[index];
                var startIndex = result.indexOf('=') + 1;
                result = result.substring(startIndex);
                return result;
            },
            html_scrollTop_target: function() {

                var target = arguments[0] || 0;
                var timeset = arguments[1] || 500;

                if (target == '0') {
                    return false;
                }

                if (target == 'top') {
                    $('html,body').animate({
                        scrollTop: 0
                    }, timeset);
                    return false;
                }

                if (target.length > 2) {
                    var $target = $('#' + target);
                    if ($target.length > 0) {
                        var targetOffset = $target.offset().top;
                        $('html,body').animate({
                            scrollTop: targetOffset
                        }, timeset);
                    }
                    return false;
                }
            },
            /**
       * js时间对象的格式化; this new Data() eg:format="yyyy-MM-dd hh:mm:ss";
       */
            data_format: function(data, format) {
                var o = {
                    'M+': data.getMonth() + 1,
                    'd+': data.getDate(),
                    'h+': data.getHours(),
                    'm+': data.getMinutes(),
                    's+': data.getSeconds(),
                    'q+': Math.floor((data.getMonth() + 3) / 3),
                    'S': data.getMilliseconds()
                };
                if (/(y+)/.test(format)) {
                    format = format.replace(RegExp.$1, (data.getFullYear() + '').substr(4 - RegExp.$1.length));
                }
                for (var k in o) {
                    if (new RegExp('(' + k + ')').test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
                    }
                }
                return format;
            },
            shortcut_key_jump: function(isDown, currentclass) {
                var className = currentclass;
                var current = $('.' + className).first();
                var next = isDown ? current.next().next('.t2') : current.prev().prev('.t2');
                if (next && next.length) {
                    current.removeClass(className);
                    next.addClass(className);

                    // var next_div = next[0];
                    UTILS.html_scrollTop_target(next.attr('id'), 300);
                    return false;

                }
            },
            shortcut_key_current: function() {
                var _class = arguments[0] || '.t2';
                var _scrollTop = $(document).scrollTop();
                if ($('.current-comment').length > 0) {
                    return;
                }
                if (_scrollTop == 0) {
                    $(_class).first().addClass('current-comment');
                } else {
                    $(_class).each(function() {
                        if ($(this).offset().top > _scrollTop && $('.current-comment').length == 0) {
                            $(this).addClass('current-comment');
                            return;
                        } else {
                            $(this).removeClass('current-comment');
                        }
                    });
                }
            }
        };
        //太阳系行星工作
        PLANETWORK.Solar();
    }
})();
