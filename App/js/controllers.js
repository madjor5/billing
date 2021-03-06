'use strict';

/* Controllers */
function BillysBillingCtrl($scope, $log, $location, $cookies, $http) {
  // Api base URL
  $scope.apiBaseUrl = 'https://api.billysbilling.dk/v1';
  // Login handler Checks whenever a page is loaded, is there a login
  $scope.$watch(function(){
    return $location.path();
  },function(newValue, oldValue){
    if($scope.loggedIn == null && newValue!='/login' && $cookies.login==null) {
      $location.path('/login');
    } else {
      $scope.appID = $cookies.appID;
      $scope.loggedIn = $cookies.login;
    }
  });

  // Fetch sections to display in navigation
  $http.get('data/sections.json').success(function(data) {
    $scope.sections = data;
  });
};

function LoginCtrl($scope, $cookies, $location, $http, $log, Login) {
  // detect click on submit

  $scope.submit = function() {
    $http.defaults.headers.common['Authorization'] = 'Basic '+Base64.encode($scope.appID + ':'); //Z1U2R1hDOVRuZXpYNFBhbmJNWm9Ndmd5dHZ5SVppcGE6';
    // Check length of login string
    if($scope.appID.length < 1) {
      alert('Fill in correct app id');
      return false;
    }
    $cookies.appID = $scope.appID;
    Login.login();
  }
}

function FrontpageCtrl($scope, $routeParams, $log, $cookies) {
  // $log.info($cookies)
};

function CustomerListCtrl($scope, $http, $log) {
  $http.defaults.headers.common['Authorization'] = 'Basic '+Base64.encode($scope.appID + ':');
  $http.get($scope.apiBaseUrl+"/contacts").success(function(data){
    $scope.customers = data.contacts;
  });
};

function CustomerDetailCtr($scope, $routeParams, $http, $log) {
  // $log.info($scope, $routeParams);
  $http.defaults.headers.common['Authorization'] = 'Basic '+Base64.encode($scope.appID + ':');
  $http.get($scope.apiBaseUrl+"/contacts/"+$routeParams.customerID).success(function(data){
    $scope.contact = data;
    $log.info("contact", data);
  });
  $http.get($scope.apiBaseUrl+"/invoices?contactId="+$routeParams.customerID).success(function(data){
    $log.info("invoices", data.invoices);
    $scope.invoices = data.invoices;
  });
};

function InvoiceCtrl($scope, $routeParams, $http, $log) {
  $http.defaults.headers.common['Authorization'] = 'Basic '+Base64.encode($scope.appID + ':');
  $http.get($scope.apiBaseUrl+"/invoices/"+$routeParams.invoiceID).success(function(data){
    $log.info("invoice", data);
    $scope.invoice = data;
  });
};

function TimerCtrl($scope, $routeParams, $timeout, $http, $log, $location) {
  $scope.timer = {};
  var myTimeOut;

  $scope.timer.startTime = false;
  $scope.timer.counter = 0;
  $scope.timer.running = false;
  $scope.timer.view = '00:00:00';

  $scope.timer.onTimeOut = function(){
    $scope.timer.counter++;
    $scope.timer.view = $scope.timer.convertSecondsToString($scope.timer.counter);
    // $scope.timer.counter++;
    myTimeOut = $timeout($scope.timer.onTimeOut, 1000);
  };
  $scope.timer.toggle = function() {
    if($scope.timer.running) {
      $timeout.cancel(myTimeOut);
      $scope.timer.running = false;
      $('#watch-btn').val('Start');
    } else {
      $scope.timer.running = true;
      if($scope.timer.startTime === 0) $scope.timer.startTime = new Date();
      myTimeOut = $timeout($scope.timer.onTimeOut, 1000);
      $('#watch-btn').val('Stop');
    }
  }
  $scope.timer.convertSecondsToString = function(sec) {
    var sec_num = parseInt(sec, 10);
    var hours   = Math.floor(sec_num / 3600);
    if(hours<10) hours = "0"+hours;
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    if(minutes<10) minutes = "0"+minutes;
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    if(seconds<10) seconds = "0"+seconds;
    var timeString = hours+":"+minutes+":"+seconds;
    return timeString;
  }
  $scope.timer.saveValue = function() {
    var minutes = $scope.timer.counter / 60;
    var number = minutes / 60;
    var hours = (Math.ceil((number) * 4) / 4).toFixed(2);
    $log.info("save", hours);
    $http.defaults.headers.common['Authorization'] = 'Basic '+Base64.encode($scope.appID + ':');
    $http.get($scope.apiBaseUrl+"/invoices/"+$routeParams.invoiceID).success(function(data){
      $log.info("invoice",data);
      $scope.invoice = data;
      var newQuantity = 0;
      for(var i=0; i<data.lines.length; i++) {
        $log.info("line", data.lines[i].id, $routeParams.lineID);
        if(data.lines[i].id === $routeParams.lineID) {
          $log.info("quantity", data.lines[i].quantity);
          newQuantity = data.lines[i].quantity;
          if(newQuantity == null) newQuantity = 0;
          break;
        }
      }
      newQuantity = (newQuantity * 1) + (hours * 1);
      $log.info("new"+newQuantity);
      $http.put(
          $scope.apiBaseUrl+"/invoices/"+$routeParams.invoiceID+"/lines/"+$routeParams.lineID,
          {
            quantity: newQuantity
          }
        ).success(function(data){
          $log.info('success', data);
          alert('Din optagelse er nu gemt!');
          $location.path("/customers/"+$scope.invoice.contact.id+"/"+$scope.invoice.id);
        });
    });
  } 
}


/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
 
var Base64 = {
 
  // private property
  _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
  // public method for encoding
  encode : function (input) {
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;
 
    input = Base64._utf8_encode(input);
 
    while (i < input.length) {
 
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
 
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
 
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
 
      output = output +
      this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
      this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
    }
 
    return output;
  },
 
  // public method for decoding
  decode : function (input) {
    var output = "";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;
 
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
    while (i < input.length) {
 
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));
 
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
 
      output = output + String.fromCharCode(chr1);
 
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
 
    }
 
    output = Base64._utf8_decode(output);
 
    return output;
 
  },
 
  // private method for UTF-8 encoding
  _utf8_encode : function (string) {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
 
    for (var n = 0; n < string.length; n++) {
 
      var c = string.charCodeAt(n);
 
      if (c < 128) {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
 
    }
 
    return utftext;
  },
 
  // private method for UTF-8 decoding
  _utf8_decode : function (utftext) {
    var string = "";
    var i = 0;
    var c = c1 = c2 = 0;
 
    while ( i < utftext.length ) {
 
      c = utftext.charCodeAt(i);
 
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      }
      else if((c > 191) && (c < 224)) {
        c2 = utftext.charCodeAt(i+1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      }
      else {
        c2 = utftext.charCodeAt(i+1);
        c3 = utftext.charCodeAt(i+2);
        string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
 
    }
 
    return string;
  }
 
}