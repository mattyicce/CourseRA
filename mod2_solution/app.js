(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListService', ShoppingListService);

ToBuyController.$inject = ['$scope', 'ShoppingListService'];
function ToBuyController($scope, ShoppingListService) {
	var itemAdder = this;

	itemAdder.itemName = "";
	itemAdder.itemQuantity = "";

	itemAdder.addItem = function () {
		ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
	}

	itemAdder.items = ShoppingListService.getWantedItems();

	itemAdder.markItemBought = function(index) {
		ShoppingListService.bought(index);
	}

	ShoppingListService.setWatcher($scope, 'itemAdder.bought');
}


AlreadyBoughtController.$inject = ['ShoppingListService'];
function AlreadyBoughtController(ShoppingListService) {
	var showList = this;

	showList.items = ShoppingListService.getBoughtItems();

	showList.wantedItems = ShoppingListService.getWantedItems();
}


function ShoppingListService() {
	var service = this;

	// List of shopping items
	var wantedItems = [];
	var boughtItems = [];

	service.addItem = function (itemName, quantity) {
		var item = {
			name: itemName,
			quantity: quantity
		};
		wantedItems.push(item);
	};

	service.removeItem = function (itemIdex) {
		wantedItems.splice(itemIdex, 1);
	};

	service.getWantedItems = function () {
		return wantedItems;
	};

	service.allItemsBought = function() {
		return (boughtItems.length > 0 && wantedItems.length === 0)
	}

	service.bought = function(index) {
		boughtItems.push(wantedItems.splice(index, 1)[0]);
	}

	service.getBoughtItems = function() {
		return boughtItems
	}

	service.setWatcher = function(scope, item) {
		scope.$watch(item, function(newValue, oldValue) {
			console.log("wtf")
		})
	}

}

})();