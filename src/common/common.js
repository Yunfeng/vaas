// will remove to const.js
const WEBAPP_NAME = '/vaas-front'

import $ from 'jquery'

/**
* 
*/
Date.prototype.format = function(format){
 /*
  * eg:format="YYYY-MM-dd hh:mm:ss";
  */
 var o = {
  "M+" :  this.getMonth()+1,  //month
  "d+" :  this.getDate(),     //day
  "h+" :  this.getHours(),    //hour
  "m+" :  this.getMinutes(),  //minute
  "s+" :  this.getSeconds(), //second
  "q+" :  Math.floor((this.getMonth()+3)/3),  //quarter
  "S"  :  this.getMilliseconds() //millisecond
  };
 
   if(/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
   }
 
   for(var k in o) {
    if(new RegExp("("+ k +")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    }
   }
 return format;
}

function convertLongToTimeDesc (l) {
  return getFormatDate(new Date(l))
}

function getFormatDate (date, pattern) {
  if (date === undefined) {
    date = new Date()
  }
  if (pattern === undefined) {
    pattern = 'yyyy-MM-dd hh:mm:ss'
  }
  return date.format(pattern)
}

function addDate(d0, x) {
  var d1 = new Date(d0)
  
  d1 = d1.valueOf()
  d1 = d1 + x * 24 * 60 * 60 * 1000
  d1 = new Date(d1)

  return d1.format("yyyy-MM-dd")
}

function today() {
  return new Date().format("yyyy-MM-dd")
}

function getURLParameter (sParam) {
  var sPageURL = window.location.search.substring(1);
  var sURLVariables = sPageURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) 
  {
      var sParameterName = sURLVariables[i].split('=');
      if (sParameterName[0] == sParam) 
      {
          return sParameterName[1];
      }
  }
}


function getSelectionText(){
    var selectedText = ""
    if (window.getSelection){ // all modern browsers and IE9+
        selectedText = window.getSelection().toString()
    }
    return selectedText
}

function selectElementText(el){
    var range = document.createRange() // create new range object
    range.selectNodeContents(el) // set range to encompass desired element text
    var selection = window.getSelection() // get Selection object from currently user selected text
    selection.removeAllRanges() // unselect any user selected text (if any)
    selection.addRange(range) // add range to Selection object to select it
}

function copySelectionText(id){
  var para = document.getElementById(id);
  selectElementText(para);
  var paratext = getSelectionText();
  //alert(paratext) // alerts "My mama always says..."
  document.execCommand("copy");
}

function getCabinClassDesc (cabinClass, offset) {
  if (cabinClass === 'F') {
    if (offset === 100) {
      return '头等'
    } else if (offset > 0) {
      return '头等' + offset + '折'  
    } else {
      return '头等'
    }
    
  } else if (cabinClass === 'Y') {
    if (offset === 100) {
      return '全价'
    } else if (offset > 0) {
      return offset + '折'  
    } else {
      return ''
    }
  } else if (cabinClass === 'C') {
    if (offset === 100) {
      return '商务'
    } else if (offset > 0) {
      return '商务' + offset + '折'  
    } else {
      return '商务'
    }
  }
}

function showIdTypeDesc (idType) {
  var desc = ''
  switch (idType) {
    case '1': desc = '身份证'; break
    case '2': desc = '护照'; break
  }
  return desc
}




/**
 * 付款类型
**/
function showPayType (payType) {
  switch (payType) {
    case 1: return '现金'
    case 2: return '信用卡'
    case 4: return '支票'
    case 8: return '记账'
    default : return payType
  }
}

/**
  * 是否需要行程单
**/
function showItineraryType (type) {
  switch (type) {
    case 0: return ''
    case 1: return '行程单'
    case 2: return '发票'
    case 3: return '信息单'
    default : return type
  }
}

/**
  * 显示乘机人类型
**/
function showPsgType (psgType) {
  switch (psgType) {
    case 0: return '成人'
    case 1: return '儿童'
    case 2: return '婴儿'
    default: return psgType
  }
}

function showCustomerName (info) {
  if (info.customerType === 0) {
    return '散客'
  } else if (info.customer !== null) {
    let name = info.customer.vipName
    // console.log(name + ': ' + name.length)
    if (name.length > 5) {
      name = name.substring(0, 5) + '...'
    }
    return name
  }
}

//是否为正整数  
function isPositiveNum(s){
  var re = /^[0-9]*[1-9][0-9]*$/ ;  
  return re.test(s)  
} 

function callService(url, {
  cbDone = function () {},
  cbAlways = function () {},
  cbFail = function () {},
  type = 'post',
  dataType = 'json',
  data = null,
  contentType = 'application/x-www-form-urlencoded; charset=UTF-8',
  cache = true,
  processData = true,
  timeout = 30000
}) {
  $.ajax({
    type: type,
    url: url,
    dataType: dataType,
    data: data,
    contentType: contentType,
    timeout: timeout,
    cache: cache,
    processData: processData
  }).done(function (jsonResult) {
    cbDone(jsonResult)
  }).fail(function (jqXHR, textStatus, errorThrown) {
    if (jqXHR.status === 403) {
      // window.alert('您没有相关授权，或者可以退出系统后重新登录，再试一次！(403)')
      window.location='/?to=login'
    } else {
      cbFail(jqXHR)
    }
  }).always(function () {
    cbAlways()
  })
}

function showOrderStatusDesc (status) {
  var desc = ''
  switch (status) {
    case 0: desc = '待处理'; break
    case 1: desc = '处理中'; break
    case 2: desc = '已完成'; break
    case 4: desc = '已取消'; break
    default:
      desc = status
  }
  return desc
}

export {
  WEBAPP_NAME,
  WEBAPP_NAME as APP_FLIGHT_PATH,
  getURLParameter,
  convertLongToTimeDesc,
  isPositiveNum,
  callService,
  showPayType,
  showItineraryType,
  showPsgType,
  showCustomerName,
  today,
  getCabinClassDesc,
  addDate,
  showOrderStatusDesc
}
