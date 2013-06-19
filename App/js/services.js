'use strict';
/* Base URL */
var apiBaseUrl = 'api.billysbilling.dk/v1';
/* Services */
angular.module('billysBillingServices', ['ngResource']).
  // factory('Sections', function($rootScope, $http, $log) {
  //   return {
  //     getSections: function() {
  //       $http.get('data/sections.json').success(function(data) {
  //           $rootScope.sections=data;
  //           return data;
  //           $log.info($rootScope.$root);
  //         });
  //     }
  //   }
  // }).
  factory('Sections', function($resource) {
    var url = "/data/sections.json";
    return $resource(
      url,
      {},
      {
        query: {
          method:'GET', 
          params:{}, 
          isArray:false
        }
    });
  }).
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