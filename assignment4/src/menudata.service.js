(function () {
    'use strict';

    angular.module('data')
        .service('MenuDataService', MenuDataService)
        .constant('baseUrl', 'https://davids-restaurant.herokuapp.com');


    MenuDataService.$inject = ['baseUrl', '$http'];
    function MenuDataService(baseUrl, $http) {
        var self = this;

        self.getAllCategories = function () {
            return $http.get(baseUrl + '/categories.json')
                .then(function (response) {
                    return response.data;
                });
        };

 -       self.getItemsForCategory = function (categoryShortName) {
            return $http
                .get(baseUrl + '/menu_items.json', {
                    params: {category: categoryShortName}
                })
                .then(function (response) {
                    return response.data.menu_items;
                });
        };
    }
})();
