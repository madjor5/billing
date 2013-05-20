'use strict';

/* Controllers */

function BillysBillingCtrl($scope, $http) {
  $http.get('data/sections.json').success(function(data) {
    $scope.sections = data;
  });
};

function FrontpageCtrl($scope, $routeParams) {

};

function CustomerListCtrl($scope, $http) {
  $http.get('data/customers.json').success(function(data){
    $scope.customers = data;
  });
};

function CustomerDetailCtr($scope) {

};