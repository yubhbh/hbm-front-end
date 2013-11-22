///////////////////////////////////////////////////////////////////////////////////
////
//// File: hbm.guid.js
//// Defines: 生成guid
//// Dependencies: require.js
//// Description:
//// Author: yubhbh@gmail.com
//// Date: 2013.11.06
//// Copyright (c) 2013 by Haobama123 Corporation. All rights reserved.
////
///////////////////////////////////////////////////////////////////////////////////

define(function(){
	/**
     * 获取GUID
     * @returns {string}
     */
    var getGuid = function () {
        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        function NewGuid() {
            return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
        }

        if (!guid) {
            guid = NewGuid();
        }
        return guid;
    }
	
	return getGuid;
});
