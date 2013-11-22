///////////////////////////////////////////////////////////////////////////////////
////
//// File: hbm.urlparse.js
//// Defines: url 字符串转换
//// Dependencies: require.js
//// Description: parser.parseURL('https://www.haobama.com:345/index.html#mayfaverite/go?id=123&name=yubhbh&time=&')
////			  返回对象如下：{path:url, protocol:'https', host:'www.haobama.com', port:'345', 
////							 search:{id:123,name:'yubhbh',time:''},
////							 hash:null
////							 }
//// Author: yubhbh@gmail.com
//// Date: 2013.11.06
//// Copyright (c) 2013 by Haobama123 Corporation. All rights reserved.
////
///////////////////////////////////////////////////////////////////////////////////
	
define(function() {
	var reURL    = (/^([^:\s]+):\/{2,3}([^\/\s:]+)(?::(\d{1,5}))?(\/[^\?\s#]+)?(\?[^#\s]+)?(#[^\s]+)?/),
		reSearch = (/(?:[\?&])(\w+)=([^#&\s]*)/g),
		URLLi    = "path protocol host port search hash";

    var parser = {
        parseURL: function(url) {
            if (!url) {
                url = location.href;
            }

            var arr  = url.match(reURL),
            temp = {};
            var list = URLLi.split(" ");
            for(var i=0; i< list.length; i++) {
                temp[list[i]] = arr[i];
            }
            temp.search = parser.parseSearch(url);
            return temp;
        },
		
        parseSearch: function(search){
            if (!search) {
                search = location.search;
            }
            if ( search.charAt(0) !== '?' ) {
                search = '?' + search;
            }

            var temp = {};
            search.replace(reSearch, function(a, f, s) {
                temp[f] = decodeURIComponent(s);
            });

            return temp;
        }

    };
	return parser;
});
    