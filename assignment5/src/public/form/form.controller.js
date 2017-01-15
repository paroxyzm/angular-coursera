(function () {
    'use strict';
    angular.module('public')
        .controller('FormController', FormController);

    FormController.$inject = ['FavoriteDishService'];
    function FormController(FavoriteDishService) {
        var $ctrl = this;
        $ctrl.user = FavoriteDishService.user;
        $ctrl.itemError = "";
        $ctrl.confirmationMessage = "";

        $ctrl.submit = function () {
            var user = $ctrl.user;

            FavoriteDishService.save(user)
                .then(() => {
                    $ctrl.itemError = "";
                    $ctrl.confirmationMessage = "Your information has been saved";
                })
                .catch(() => {
                    $ctrl.itemError = "No such menu number exists";
                });
        };
    }

})();
