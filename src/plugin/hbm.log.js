///////////////////////////////////////////////////////////////////////////////////
////
//// File: hbm.log.js
//// Defines: 日志类
//// Dependencies: require.js 
//// Description:
//// Author: yubhbh@gmail.com
//// Date: 2013.11.06
//// Copyright (c) 2013 by Haobama123 Corporation. All rights reserved.
////
///////////////////////////////////////////////////////////////////////////////////

define(['jquery'],function($, hbm){
	
	var logType = ['log', 'debug', 'warn', 'error'];
	var output = function(logEntity) {
		var logImg = new Image(); 
		var parm = [];
		for (var p in logEntity){
			parm.push(p + '=' + logEntity[p]);
		}
		var img = 'http://dimg02.c-ctrip.com/images/tg/724/149/072/5a2a49487b384190a5dcb23ca4da84f9_R_240_240.jpg?';
		logImg.src = img + parm.join('&');
		logImg.onload = function() {
			console.log('add log ok');
		}
	}

	var logger = {};
	var setLogger = function(typename) {
	    logger[typename] = function(msg) {
			var logEntity = {
                timestamp: getTimestamp(new Date(),'yyyy-MM-dd hh:mm:ss:S'),
                level: typename,
				msg: msg
			};
            output(logEntity);
		}
	}
	for(var i=0; i< logType.length; i++)  {
		setLogger(logType[i])
	};
	
	var getTimestamp = function(date,format) {
        /*
         * eg:format="yyyy-MM-dd hh:mm:ss";
         */
        var o = {
                "M+": date.getMonth() + 1, //month
                "d+": date.getDate(), //day
                "h+": date.getHours(), //hour 
                "m+": date.getMinutes(), //minute
                "s+": date.getSeconds(), //second
                "q+": Math.floor((date.getMonth() + 3) / 3), //quarter
                "S": date.getMilliseconds() //millisecond
        }

        if(/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for(var k in o) {
                if(new RegExp("(" + k + ")").test(format)) {
                        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
                }
        }
        return format;
	}
	//logger.debug('hi test log')
	
});
