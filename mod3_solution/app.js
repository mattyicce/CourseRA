(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('MenuListAPI', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective)
.controller('FoundItemsDirectiveController', FoundItemsDirectiveController);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var list = this;
	list.found = [];
	list.error = '';
	list.search = '';
	list.narrowItDown = function(search) {
		list.found = [];
		list.error = '';
		if (search === '') {
			list.error = "Nothing found."
		} else {
			var promise = MenuSearchService.getMatchedMenuItems(list.search);

			promise.then(function(response) {
				if (response.length > 0) {
					list.found = response;
				} else {
					list.error = "Nothing found."
				}
			})
			.catch(function(error) {
				console.log(error)
			})
		}
	};

	list.dontWant = function(index) {
		list.found.splice(index, 1);
	};
};

function FoundItemsDirective() {
	var ddo = {
		templateUrl: 'foundItems.html',
		scope: {
			items: '<',
			onRemove: '&'
		},
		controller: 'FoundItemsDirectiveController as list',
		bindToController: true
	}

	return ddo;
}

function FoundItemsDirectiveController() {
	var list = this;
}

MenuSearchService.$inject = ['$http', 'MenuListAPI']
function MenuSearchService($http, MenuListAPI) {
	var menu = this;
	menu.getMatchedMenuItems = function(searchTerm) {
		console.log(searchTerm)
		return $http({
			method: "GET",
			url: (MenuListAPI + '/menu_items.json')
		}).then(function(result) {
			var foundItems = [];
			result.data.menu_items.forEach(function(item) {
				if (item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
					foundItems.push(item)
				}
			})
			return foundItems
		});
	}
}

})();