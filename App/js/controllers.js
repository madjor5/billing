'use strict';

/* Controllers */

function BillysBillingCtrl($scope, $log, $location, $cookies, Sections) {
  // Api base URL
  $scope.apiBaseUrl = 'https://api.billysbilling.dk/v1';
  $log.info($location.path(), $cookies);
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
  $scope.sections = Sections.query();
  // $http.get('data/sections.json').success(function(data) {
  //   $scope.sections = data;
  // });
};

function LoginCtrl($scope, $cookies, $location, $http, $log, Login) {
  // detect click on submit
  $scope.appID = 'gU6GXC9TnezX4PanbMZoMvgytvyIZipa';

  $scope.submit = function() {
    $http.defaults.headers.common['Authorization'] = 'Basic Z1U2R1hDOVRuZXpYNFBhbmJNWm9Ndmd5dHZ5SVppcGE6';
    // Check length of login string
    if($scope.appID.length < 1) {
      alert('Fill in correct app id');
      return false;
    }
    Login.login();

    // Set cookie to appID
    // $cookies.login = $scope.loggedIn;
    // $log.info($cookies, $scope.loggedIn);
    // if($cookies.login) $location.path('/front');
    // Redirect to frontpage
    // $location.path('/front');
  }

  // // set cookie and Logged In
  // $scope.handleLogin = function(event) {
  //   // Prevent default button event to fire
  //   event.preventDefault();

  //   // Is appID empty?
  //   if($scope.appID.length < 1) {
  //     alert('Fill in correct app id');
  //     return false;
  //   }
  //   // $http.defaults.headers.common['Authorization'] = 'Basic ' + $scope.appID + ':';
  //   // Make an API call to check if appID is valid
  //   var url = $scope.appID+":&"+$scope.apiBaseUrl;
  //   Login.login('test');

  //   console.log("TODO: make REST call to validate App ID");
  //   // Set logged in to entered value
  //   $scope.loggedIn = $scope.appID;
  //   // Set cookie to appID
  //   $cookies.login = $scope.loggedIn;
  //   // Redirect to frontpage
  //   //$location.path('/front');
  // }
}

function FrontpageCtrl($scope, $routeParams, $log, $cookies) {
  $log.info($cookies)
};

function CustomerListCtrl($scope, $http) {
  $http.get('data/customers.json').success(function(data){
    $scope.customers = data;
  });
};

function CustomerDetailCtr($scope) {

};