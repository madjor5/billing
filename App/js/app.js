'use strict';

/* App Module */

angular.module('BillysBilling', ['ngCookies', 'billysBillingServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {templateUrl: 'partials/login.html', controller: LoginCtrl}).
    when('/front', {templateUrl: 'partials/frontpage.html',   controller: FrontpageCtrl}).
    when('/customers', {templateUrl: 'partials/customer-list.html', controller: CustomerListCtrl}).
    when('/customers/:customerID', {templateUrl: 'partials/customer-detail.html', controller: CustomerDetailCtr}).
    otherwise({redirectTo: '/front'});
}]);
