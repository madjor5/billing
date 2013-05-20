'use strict';

/* Controllers */

function BillysBillingCtrl($scope, $http) {
  $http.get('data/sections.json').success(function(data) {
    $scope.sections = data;
  });
}
