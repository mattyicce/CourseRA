(function() {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', function($scope) {
	$scope.message = '';
	$scope.lunchItems = '';
	$scope.checkItems = function() {
		var count = $scope.lunchItems.split(',').length;
		if ($scope.lunchItems === '') {
			$scope.message = 'Please enter data first'
		} else if (count > 3) {
			$scope.message = "Too much!";
		} else if (count <= 3 && count > 0) {
			$scope.message = "Enjoy!"
		} else {
			$scope.message = "Something went wrong"
		}
	}

});

})();