(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

// 'item' is injected through state's resolve
ItemDetailController.$inject = ['detail']
function ItemDetailController(detail) {
  var itemDetail = this;
  console.log(detail)
  var detail = detail.data;
  console.log(detail)
  itemDetail.name = detail.category.name;
  console.log(itemDetail.name)
  itemDetail.specialInstructions = detail.category.specialInstructions;
  itemDetail.menu_items = detail.menu_items;

}

})();
