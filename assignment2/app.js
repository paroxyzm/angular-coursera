(function () {
    'use strict';
    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService);


    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        this.itemsToBuy = ShoppingListCheckOffService.itemsToBuy;
        this.buy = ShoppingListCheckOffService.buy;
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        this.itemsAlreadyBought = ShoppingListCheckOffService.itemsAlreadyBought;
    }


    function ShoppingListCheckOffService() {
        var service = this;

        service.itemsAlreadyBought = [];

        service.itemsToBuy = [
            {
                'name': 'cookies',
                'quantity': 10
            },
            {
                'name': 'beer',
                'quantity': 1
            },
            {
                'name': 'coca-cola',
                'quantity': 10
            },
            {
                'name': 'cucumber',
                'quantity': 10
            },
            {
                'name': 'lemon',
                'quantity': 1
            }

        ];

        this.buy = function (index) {
            var item = service.itemsToBuy.splice(index, 1)[0];
            service.itemsAlreadyBought.push(item);
        };
    }
}());
