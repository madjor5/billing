'use strict';

/* App Module */

angular.module('BillysBilling', ['ngCookies', 'billysBillingServices', 'http-auth-interceptor']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {templateUrl: 'partials/login.html', controller: LoginCtrl}).
    // when('/front', {templateUrl: 'partials/frontpage.html',   controller: FrontpageCtrl}).
    when('/front', {templateUrl: 'partials/customer-list.html', controller: CustomerListCtrl}).
    when('/customers', {templateUrl: 'partials/customer-list.html', controller: CustomerListCtrl}).
    when('/customers/:customerID', {templateUrl: 'partials/customer-details.html', controller: CustomerDetailCtr}).
    when('/customers/:customerID/:invoiceID', {templateUrl: 'partials/invoice.html', controller: InvoiceCtrl}).
    when('/invoice/:invoiceID/:lineID/timer', {templateUrl: 'partials/timer.html', controller: TimerCtrl}).
    otherwise({redirectTo: '/front'});
}]);
