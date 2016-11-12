(function () {
    'use strict';
    angular
        .module('SandboxApp', [])
        .controller('CategoriesController', CategoriesController)
        .service('CategoriesService', CategoriesService)
        .constant('baseUrl', 'http://davids-restaurant.herokuapp.com');



    CategoriesController.$inject = ['CategoriesService'];

    function CategoriesController(CategoriesService) {
        var ctrl = this;
        ctrl.categories = [];
        ctrl.dishes = CategoriesService.dishes;

        var categoriesP = CategoriesService.getCategories();
        categoriesP.then(function (data) {
            ctrl.categories = data;
        });

        ctrl.fetchDishes = CategoriesService.fetchDishes;
        ctrl.getDishes = function (shortName) {
            ctrl.fetchDishes(shortName)
                .then(function () {
                    ctrl.dishes = CategoriesService.getDishes();
                });
        };
    }


    CategoriesService.$inject = ['$http', 'baseUrl'];

    function CategoriesService($http, baseUrl) {
        var service = this;
        var dishes = [];

        service.getCategories = function () {
            return $http({
                    method: 'GET',
                    url: (baseUrl + "/categories.json")
                })
                .then((response) => response.data);
        };

        service.getDishes = function () {
            return dishes;
        };

        service.fetchDishes = function (shortName) {

            return $http({
                    method: 'GET',
                    url: (baseUrl + '/menu_items.json'),
                    params: {
                        category: shortName
                    }
                })
                .then((response) => {
                    dishes = response.data.menu_items
                });
        };
    }


    // function LmiService() {
    //   var service = this;
    //   var items = [];

    //   service.getItems = function () {
    //     return items;
    //   };

    //   service.addItem = function (item) {
    //     if(items.length >= maxItems) {
    //       return;
    //     }

    //     items.push(item);
    //   };
    // }

    // function LmiProvider() {
    //   var provider = this;

    //   provider.$get = function () {
    //     return new LmiService(maxItems);
    //   };
    // }

})();
