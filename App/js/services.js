'use strict';
/* Base URL */
var apiBaseUrl = 'api.billysbilling.dk/v1';
/* Services */
angular.module('billysBillingServices', ['ngResource']).
  factory('Login', function($log, $http, $cookies, $location) {
    return {
      login: function(appID) {
        $http.get(
          'https\://'+apiBaseUrl
          ).success(function(data, status, headers, config){
            if(data.success = true) {
              $cookies.login = "true";
              $location.path("/front");
              return true;
            } else {
              return false;
            }
          }).error(function(data, status, headers, config){
            $log.error("Login return error", data);
            return false;
          });
      }
    }
  });