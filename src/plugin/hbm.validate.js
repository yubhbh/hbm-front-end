///////////////////////////////////////////////////////////////////////////////////
////
//// File: hbm.validate.js
//// Defines: 通用验证插件
//// Dependencies: require.js
//// Description:
//// Author: yubhbh@gmail.com
//// Date: 2013.11.06
//// Copyright (c) 2013 by Haobama123 Corporation. All rights reserved.
////
///////////////////////////////////////////////////////////////////////////////////

define(['jquery','underscore'], function($,_){
	/**
     * 数据类型检测，及表单效验
     * @param obj | {string}
     * @return  {Boolean}
     * @example
     * validate.isString(obj)
     * validate.isEmail(obj)
    */
    var validate = (function () {
        var result = function () {
        };

        /**
         * validator的申明，key用来定义validator的名字，调用的时候可以使用
         * c.validate.is{Key}(value) 来调用，value用来定义validating的具体
         * 方法，方法可以定义为RegExp或者Function。
         */
        var validators = {
            Email: /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/, //email
            Qq: /^[1-9]\d{4,}$/,                   //qq
            Phone: /^[0-9]{3,4}-[0-9]{7,8}$/,      //座机
            //Url : /[a-zA-z]+://[^s]*/,              //网址
            Url: /^http(s)?:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\:+!]*([^<>])*$/,
            Mobile: /^1\d{10}/,                    //手机
            //IdCard : /^\d{15}$|^\d{18}$|^\d{17}[Xx]$/,//身份证
            Postcode: /^\d{6}$/,                   //邮编

            IP: function (obj) {                 //是否为IP
                if (!obj || result.isNull(obj)) return false;

                var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g //匹配IP地址的正则表达式
                if (re.test(obj)) {
                    if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) return true;
                }

                return false;
            },

            EmptyObject: function (obj) {
                return _.isEmpty(obj);
            },

            IdCard: function (idcard) {      // 验证身份证
                //var Errors = new Array("ok", "请输入正确的身份证号码!", "请输入正确的身份证号码!", "请输入正确的身份证号码!", "请输入正确的身份证号码!"); //请输入正确的身份证号码2012-9-19
                var area = { 11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁", 22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽", 35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南", 44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州", 53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏", 65: "xinjiang", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外" }
                var idcard, Y, JYM;
                var S, M;
                var idcard_array = new Array();
                idcard_array = idcard.split("");
                if (area[parseInt(idcard.substr(0, 2))] == null) return false;

                switch (idcard.length) {
                    case 18:
                        if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
                            ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; //闰年出生日期的合法性正则表达式
                        }
                        else {
                            ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; //平年出生日期的合法性正则表达式
                        }
                        if (ereg.test(idcard)) {
                            S = (parseInt(idcard_array[0]) + parseInt(idcard_array[10])) * 7 + (parseInt(idcard_array[1]) + parseInt(idcard_array[11])) * 9 + (parseInt(idcard_array[2]) + parseInt(idcard_array[12])) * 10 + (parseInt(idcard_array[3]) + parseInt(idcard_array[13])) * 5 + (parseInt(idcard_array[4]) + parseInt(idcard_array[14])) * 8 + (parseInt(idcard_array[5]) + parseInt(idcard_array[15])) * 4 + (parseInt(idcard_array[6]) + parseInt(idcard_array[16])) * 2 + parseInt(idcard_array[7]) * 1 + parseInt(idcard_array[8]) * 6 + parseInt(idcard_array[9]) * 3;
                            Y = S % 11;
                            M = "F";
                            JYM = "10X98765432";
                            M = JYM.substr(Y, 1);
                            if (M.toUpperCase() == idcard_array[17].toUpperCase())
                                return true;
                            else
                                return false;
                        }
                        else
                            return false;
                        break;
                    default:
                        return false;
                        break;
                }
            },

            CharsLenWithinRange: function (value, max) {
                if (!result.isString(value)) return false;

                var reg = value.match(/\W/g);
                var length = reg == null ? value.length : value.length + reg.length;
                isValidate = length >= 0 && length <= max;

                if (!isValidate) {
                    return false;
                } else {
                    this.cutLen = value.length;
                }

                return true;
            },

            /**
             *  联系人输入控制
             *  0-13个汉字，0-26个字符
             */
            ContactName: function (value) {
                if (!result.isString(value)) return false;
                return validators.CharsLenWithinRange.call(this, value, 26);
            },

            /**
             * 备注输入控制
             * 0-50个汉字，0-100个字符
             */
            BookPS: function (value) {
                if (!result.isString(value)) return false;
                return validators.CharsLenWithinRange.call(this, value, 100);
            },

            /**
             * 发票抬头输入控制
             * 0-50个汉字，0-100个字符
             */
            InvTitle: function (value) {
                return validators.BookPS.call(this, value, 100);
            },

            /* 送达地输入控制
             *  0-40个汉字，80个字符
             */
            AreaTitle: function (value) {
                if (!result.isString(value)) return false;
                return validators.CharsLenWithinRange.call(this, value, 80);
            },

            /**
             * 11位规则
             * 不判非1规则。
             */
            MobileNumber: function (number) {
                if (!result.isString(number)) {
                    return false;
                }
                var LEN = 11;
                return number.length == LEN && /^(\d| )+$/g.test(number);
            },

            /**
             * 少于3位或多于7位、输入含特殊字符、输入汉字等不符合航班号查询规则
             */
            FlightNumber: function (flightNumber) {
                if (!result.isString(flightNumber)) return false;
                var minLen = 3,
                    maxLen = 7;
                return flightNumber.length >= minLen && flightNumber.length <= maxLen && /^(\d|\w)+$/g.test(flightNumber);
            }
        };

        $.each(validators, function (key, value) {

            result["is" + key] = function (obj) {
                if (!obj || _.isNull(obj) || _.isNull(value)) {
                    return false;
                }

                if (_.isFunction(value)) {
                    return value.call(this, obj);
                }

                if (_.isRegExp(value)) {
                    return value.test(obj);
                }
                return false;
            }
        });

        return result;

    })();
	
	return validate;
})