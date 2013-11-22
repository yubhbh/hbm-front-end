///////////////////////////////////////////////////////////////////////////////////
////
//// File: hbm.date.js
//// Defines: 日期格式转换类
//// Dependencies: require.js
//// Description: 
//// Author: yubhbh@gmail.com
//// Date: 2013.11.06
//// Copyright (c) 2013 by Haobama123 Corporation. All rights reserved.
////
///////////////////////////////////////////////////////////////////////////////////

define(function () {
	'use strict';
	/**
		* 将日期转换为需要的格式
		* @param {Date} d 
		* @param {String} 如'yyyy-MM-dd hh:mm:ss'
		* @return {String}  value
	*/
	function formatDate(d, format) {
		var o = {
			"M+" :  d.getMonth() + 1,  //month
			"d+" :  d.getDate(),     //day
			"h+" :  d.getHours(),    //hour
			"m+" :  d.getMinutes(),  //minute
			"s+" :  d.getSeconds(),  //second
			"q+" :  Math.floor((d.getMonth() + 3 ) / 3),  //quarter
			"S"  :  d.getMilliseconds() //millisecond
		};
			
		if (/(y+)/.test(format)) {
			format = format.replace(RegExp.$1, (d.getFullYear() + "").substr(4 - RegExp.$1.length));
		}

		for (var k in o) {
			if(new RegExp("("+ k +")").test(format)) {
				format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
			}
		}
		return format;
	}
	
	/**
		* 将字符串转为日期格式
		* @param {String} str 如'yyyy-MM-dd hh:mm:ss'
		* @return {Date} value 
	*/
	function parseDate(str) {
		var results;
		if(!String.prototype.trim){
			String.prototype.trim = function(){
				return this.replace(/^\s+|\s+$/g, '');
			}
		} 
		str = str.trim(str);
		if (typeof str === 'string') {
			results = str.match(/^(\d{4})[\-\/]?(\d{1,2})[\-\/]?(\d{1,2})$/);
			if (results && results.length > 3) {
				return new Date(parseInt(results[1], 10), 
								parseInt(results[2], 10) - 1, 
								parseInt(results[3], 10));
			}
			results = str.match(/^(\d{4})[\-\/]?(\d{1,2})[\-\/]?(\d{1,2})[ T]?(\d{1,2}):(\d{1,2}):(\d{1,2})$/);
			if (results && results.length > 6) {
				return new Date(parseInt(results[1], 10), 
								parseInt(results[2], 10) - 1, 
								parseInt(results[3], 10), 
								parseInt(results[4], 10), 
								parseInt(results[5], 10), 
								parseInt(results[6], 10));
			}	
		}
		return null;
	}
	
	return {
		formatDate: formatDate,
		parseDate: parseDate
	}
});