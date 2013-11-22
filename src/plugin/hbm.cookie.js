///////////////////////////////////////////////////////////////////////////////////
////
//// File: hbm.cookie.js
//// Defines: Cookie操作类
//// Dependencies: require.js
//// Description:
//// Author: yubhbh@gmail.com
//// Date: 2013.11.06
//// Copyright (c) 2013 by Haobama123 Corporation. All rights reserved.
////
///////////////////////////////////////////////////////////////////////////////////

define(function(){
	 /**
     * Cookie操作类
     */
	 var hbm ={}
     hbm.cookie = {
        /**
         * 读取cookie,注意cookie名字中不得带奇怪的字符，在正则表达式的所有元字符中，目前 .[]$ 。
         * @param {Object} cookie的名字
         * @return {String} cookie的值
         * @example
         * var value = co.getCookie(name);
         */
        getCookie: function (name) {
            name = name.replace(/([\.\[\]\$])/g, '\\\$1');
            var rep = new RegExp(name + '=([^;]*)?;', 'i');
            var co = document.cookie + ';';
            var res = co.match(rep);
            if (res) {
                return unescape(res[1]) || "";
            }
            else {
                return "";
            }
        },

        /**
         * 设置cookie
         * @param {String} name cookie名
         * @param {String} value cookie值
         * @param {Number} expire Cookie有效期，单位：小时
         * @param {String} path 路径
         * @param {String} domain 域
         * @param {Boolean} secure 安全cookie
         * @example
         * co.setCookie('name','sina',null,"")
         */
        setCookie: function (name, value, expire, path, domain, secure) {
            var cstr = [];
            cstr.push(name + '=' + escape(value));
            if (expire) {
                var dd = new Date();
                var expires = dd.getTime() + expire * 3600000;
                dd.setTime(expires);
                cstr.push('expires=' + dd.toGMTString());
            }
            if (path) {
                cstr.push('path=' + path);
            }
            if (domain) {
                cstr.push('domain=' + domain);
            }
            if (secure) {
                cstr.push(secure);
            }
            document.cookie = cstr.join(';');
        },

        /**
         * 删除cookie
         * @param {String} name cookie名
         */
        deleteCookie: function (name) {
            document.cookie = name + '=;' + 'expires=Fri, 31 Dec 1999 23:59:59 GMT;';
        }
    }
	
	return hbm.cookie;

})