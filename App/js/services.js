'use strict';

/* Services */
angular.module('billysBillingServices', ['ngResource']).
  factory('Login', function($resource) {
    return $resource(
      ":appID"+":@"+$scope.apiBaseUrl, 
      {},
      {
        query: {
          method:'GET', 
          params:{appID:''}, 
          isArray:true
        }
      });
  });