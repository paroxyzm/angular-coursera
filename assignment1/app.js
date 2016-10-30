(function () {
    'use strict';
    angular
        .module("LunchCheck", [])
        .controller("LunchCheckController", LunchCheckController);

    function LunchCheckController ($scope) {
        $scope.checkIfTooMuch = function () {

            var listOfItems = $scope.listOfItems || '';

            var list = listOfItems.split(',')
                .filter((elem) => elem.length > 0);

            if(list.length <= 3 && list.length > 0) {
                $scope.tooMuchMessage = "Enjoy!";
            } else if(list.length == 0) {
                $scope.tooMuchMessage = "Please enter data first";
            } else {
                $scope.tooMuchMessage = "Too much!";
            }
        };
    };

    LunchCheckController.$inject = ['$scope'];

})();
