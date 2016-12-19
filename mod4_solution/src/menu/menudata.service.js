(function () {

angular.module('MenuApp')
.service('MenuDataService', MenuDataService);

MenuDataService.$inject = ['$http'];
function MenuDataService($http) {
	var data = this;

	data.getAllCategories = function() {
		return $http.get('https://davids-restaurant.herokuapp.com/categories.json')
	}

	data.getItemsForCategory = function (categoryShortName) {
		console.log("hit")
		return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName)
	}
}

})();