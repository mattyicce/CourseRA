(function() {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

	// Redirect to home page if no other URL matches
	$urlRouterProvider.otherwise('/');

	//  *** Set up UI states ****
	$stateProvider

	// Home page
	.state('home', {
		url: '/',
		templateUrl: 'src/menu/templates/home.template.html'
	})

	.state('categories', {
		url: '/categories',
		templateUrl: 'src/menu/templates/categories.template.html',
		controller: 'CategoriesController as categories',
		resolve: {
			items: ['MenuDataService', function(MenuDataService) {
				return MenuDataService.getAllCategories()
			}]
		}
	})

	.state('itemDetail', {
		url: '/item-detail/{itemShortName}',
		templateUrl: 'src/menu/templates/item-detail.template.html',
		controller: 'ItemDetailController as itemDetail',
		resolve: {
			detail: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
				console.log("hit")
				console.log("asd")
				console.log($stateParams)
				console.log('asd')
				return MenuDataService.getItemsForCategory($stateParams.itemShortName)
			}]
		}
	})
}

})();