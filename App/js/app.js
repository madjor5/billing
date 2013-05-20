'use strict';

/* App Module */

angular.module('BillysBilling', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/front', {templateUrl: 'partials/frontpage.html',   controller: FrontpageCtrl}).
      when('/customers', {templateUrl: 'partials/customer-list.html', controller: CustomerListCtrl}).
      when('/customers/:customerID', {templateUrl: 'partials/customer-detail.html', controller: CustomerDetailCtr}).
      otherwise({redirectTo: '/front'});
}]);
