///////////////////////////////////////////////////////////////////////////////////
////
//// File: hbm.string.js
//// Defines: 字符串操作类
//// Dependencies: require.js
//// Description: 
//// Author: yubhbh@gmail.com
//// Date: 2013.11.06
//// Copyright (c) 2013 by Haobama123 Corporation. All rights reserved.
////
///////////////////////////////////////////////////////////////////////////////////

define(function () {
	'use strict';
	if(!String.prototype.trim){
		String.prototype.trim = function(){
			return this.replace(/^\s+|\s+$/g, '');
		};
		
		String.prototype.trimLeft = function(){
			return this.replace(/^\s+/g, '');
		};
		
		String.prototype.trimRight = function(){
			return this.replace(/\s+$/g, '');
		};
		
		String.prototype.removeSpace = function(){
			return this.replace(/\s/g, "")
		};
	}
	
	String.prototype.cutstr = function(len) {
		var temp;
		var icount = 0;
		var patrn = /[^\x00-\xff]/;
		var strre = '';
		for(var i=0; i< this.length; i++) {
			if (icount < len - 1) {
				temp = this.substr(i,1);
				if (patrn.exec(temp) == null) {
					icount = icount + 1;
				}
				else {
					icount = icount + 2;
				}
				strre += temp;
			}
			else {
				break;
			}
		}
		return strre + '...';
	}	
	return String;
});
