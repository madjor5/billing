'use strict';

/* Controllers */

function BillysBillingCtrl($scope, $http, $location, $cookies) {
  // Login handler Checks whenever a page is loaded, is there a login cookie

  // Login handler Checks whenever a page is loaded, is there a login
  $scope.$watch(function(){
    return $location.path();
  },function(newValue, oldValue){
    if($scope.loggedIn == null && newValue!='/login' && $cookies.login==null) {
      $location.path('/login');
    } else {
      $scope.loggedIn = $cookies.login;
    }
  });


  $http.get('data/sections.json').success(function(data) {
    $scope.sections = data;
  });
};

function LoginCtrl($scope, $cookies) {
  // detect click on submit

  // set cookie and Logged In
  $scope.handleLogin = function(event) {
    var appID = $scope.appID;
    if(appID.length < 1) {
      alert('Fill in correct app id');
      return false;
    }
    event.preventDefault();
    // Set logged in to entered value
    $scope.loggedIn = $scope.appID;
    $cookies.login = $scope.loggedIn;
    // Make an API call to check if appID is valid

    alert($scope.appID);
  }

  // Redirect to front
}

function FrontpageCtrl($scope, $routeParams) {

};

function CustomerListCtrl($scope, $http) {
  $http.get('data/customers.json').success(function(data){
    $scope.customers = data;
  });
};

function CustomerDetailCtr($scope) {

};