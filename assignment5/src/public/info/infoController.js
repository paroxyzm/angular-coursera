(function () {
    'use strict';
    angular.module('public')
        .controller('InfoController', InfoController);


    InfoController.$inject = ['FavoriteDishService'];

    function InfoController(FavoriteDishService) {

        var self = this;

        self.user = FavoriteDishService.user;
        self.welcome = "Not Signed Up Yet.";
    }
})();
