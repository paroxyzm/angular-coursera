(function () {
    'use strict';
    angular.module('common')
        .service('FavoriteDishService', FavoriteDishService);

    var menuItemsUrl = "https://enigmatic-everglades-18303.herokuapp.com/menu_items/";

    FavoriteDishService.$inject = ['$http'];

    function FavoriteDishService($http) {
        var self = this;

        self.user = {
            favoriteDish: {
                short_name: ''
            }
        };

        self.save = function (user) {
            return $http({
                    method: 'GET',
                    url: menuItemsUrl + user.favoriteDish.short_name.toUpperCase() + '.json'
                })
                .then((response) => {
                    var data = response.data;

                    self.user = user;
                    self.user.registered = true;
                    self.user.favoriteDish = {
                        short_name: data.short_name,
                        category_short_name: data.category_short_name,
                        name: data.name,
                        description: data.description
                    }
                });
        };
    }


})();
