'use strict';

/* Controllers */

function BillysBillingCtrl($scope, $http, $location, $cookies) {
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

  // Fetch sections to display in navigation
  $http.get('data/sections.json').success(function(data) {
    $scope.sections = data;
  });
};

function LoginCtrl($scope, $cookies, $location) {
  // detect click on submit
  $scope.appID = '';

  // set cookie and Logged In
  $scope.handleLogin = function(event) {
    // Prevent default button event to fire
    event.preventDefault();

    // Is appID empty?
    if($scope.appID.length < 1) {
      alert('Fill in correct app id');
      return false;
    }
    // Set logged in to entered value
    $scope.loggedIn = $scope.appID;
    // Set cookie to appID
    $cookies.login = $scope.loggedIn;
    // Make an API call to check if appID is valid
    console.log("TODO: make REST call to validate App ID");
    // Redirect to frontpage
    $location.path('/front');
  }
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