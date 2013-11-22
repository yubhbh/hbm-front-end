///////////////////////////////////////////////////////////////////////////////////
////
//// File: hbm.localStorage.js
//// Defines: 对localStorage操作，可设置缓存过期时间
//// Dependencies: require.js
//// Description: 
//// Author: yubhbh@gmail.com
//// Date: 2013.10.30
//// Copyright (c) 2013 by Haobama Corporation. All rights reserved.
////
///////////////////////////////////////////////////////////////////////////////////

define(function(){
    var Storage = (function(){ 
	    /**
            * 通过key获取localStorage
            * @param {String} key 
		    * @return {Object} value 如果超时，返回null
        */
	    function getItem(key){
		   var entity = getGSStorageObj(key);
		   if(!entity) return null;
		   
		   var retunrVal = entity.value;
		   if(entity.timeout =='-1'){
		       return retunrVal;
		   }
		   else{
		      if((new Date()) - (new Date(entity.saveDate)) < entity.timeout){
			     return retunrVal;
		      }
		   }
		   localStorage.removeItem(key);
		   return null;
	    };
		
		 /**
            * 存储Key-Value
            * @param {String} key 
            * @param {Object} value
            * @param {int} timeout 可选 超时时间毫秒
            * @return {boolean} 成功返回true,失败返回false
        */
		function setItem(key,value,timeout){
		   if(!key || !value){
		      throw 'please set "key" and "value" agument while calling this function.';
		   }
		   
	       //默认不设置超时(timeout=-1);
		   var entity = buildStorageObj(key,value,timeout || -1)
		    try {
                 localStorage.setItem(entity.key, JSON.stringify(entity));
                 return true;
             } catch (e) {
                    console && console.log(e);
            }
             return false;
		   
		};
		
		function removeItem(key){
		    try{
			    localStorage.removeItem(buildKey(key));
				return true;
		    }
			catch(e){
			   return false;
			}
		}
		
	     /**
            * 清空Key-Value
            * @param {string}  清空含有keyStr 的key
            * @return {boolean} 成功返回true,失败返回false
        */
		function removeKeylike(keyStr) {
			for	(var item in localStorage) {
				if(item.indexOf(keyStr) > -1) {
					localStorage.removeItem(item);
				}
			}
			
			return true;
		}
		
	     /**
            * 清空Key-Value
            * @param {boolean}  是否保持没有Timeout 的
            * @return {boolean} 成功返回true,失败返回false
        */
		function clearGSLocalStorage(isKeepingTimeoutKey){
		   for(var item in localStorage){
		      if(isKeepingTimeoutKey && item.indexOf("GS_") > -1){
			     var key = item.replace('GS_','');
			     var entity = getGSStorageObj(key);
				 if(entity){
				   //如果已经过期
				   if(entity.timeout !=='-1' && (new Date()) - (new Date(entity.saveDate)) > entity.timeout){
					   localStorage.removeItem(item);
				   }
				 }
		      }
			  else if(item.indexOf("GS_") > -1){
			      localStorage.removeItem(item);
			  }
		   }
		   return true;
		}
		
		//攻略社区专用key 以"GS_"开头
		function buildKey(key){
		   return "GS_" + key;
		}
		
        //生成localStorage保存对象	    
	    function buildStorageObj(key,value,timeout){
		   return {
		      key: buildKey(key),
			  value:value,
			  timeout:timeout,
			  saveDate: new Date()
		   }
	    }
		
		//getGSStorageObj
		function getGSStorageObj(key){
		    if(!key || typeof key !=="string"){
		     throw 'please set "key" agument as string while callting this fun.';
		   }
		   key = buildKey(key);
		   var entityStr = localStorage.getItem(key);
		   if(!entityStr) return null;
		   
		   var entity = JSON.parse(entityStr);
		   return entity;
		}

		return {
		  get: getItem,
		  set: setItem,
		  remove: removeItem,
		  clear: clearGSLocalStorage,
		  removeKeylike: removeKeylike
		}
    })();
    return Storage;
 
});