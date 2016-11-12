(function () {
    'use strict';

    var api = '';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItemsDirective)
        .constant('baseUrl', 'https://davids-restaurant.herokuapp.com')
    ;


    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'foundItems.html',
            restrict: 'E',
            scope: {
                'found': '<foundItems',
                'onRemove': '&'
            },
            controller: function () {
            },
            bindToController: true,
            controllerAs: 'ctrl'
        };
        return ddo;
    }

    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var ctrl = this;
        ctrl.searchTerm = '';
        ctrl.found = null;

        ctrl.remove = function (index) {
            ctrl.found.splice(index, 1)
        };

        ctrl.narrow = function () {
            if (!ctrl.searchTerm) {
                ctrl.found = [];
            } else {
                MenuSearchService.getMatchedMenuItems(ctrl.searchTerm)
                    .then((found) => {
                        ctrl.found = found;
                    })
            }
        }
    }


    MenuSearchService.$inject = ['$http', 'baseUrl'];
    function MenuSearchService($http, baseUrl) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            return $http({
                method: 'GET',
                url: (baseUrl + '/menu_items.json')
            })
                .then(function (response) {
                    if (response.data.menu_items) {
                        return response.data.menu_items;
                    } else {
                        throw new Error("no menu items")
                    }
                })
                .then(R.filter(R.where({description: R.contains(searchTerm)})))
        };
    }


})();
