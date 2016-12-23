(function () {
    "use strict";

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'src/templates/home.template.html'
            })

            .state('categories', {
                url: '/categories',
                template: '<button ui-sref="home">Home</button> <categories categories="$ctrl.categories"></categories>',
                controller: 'CategoriesController as $ctrl',
                resolve: {
                    categories: ['MenuDataService', function (MenuDataService) {
                        return MenuDataService.getAllCategories();
                    }]
                }
            })
            .state('items', {
                url: '/items/{shortName}',
                template: '<items items="$ctrl.items"></items>',
                controller: 'ItemsController as $ctrl',
                resolve: {
                    items: ['MenuDataService', '$stateParams', function (MenuDataService, $stateParams) {
                        return MenuDataService.getItemsForCategory($stateParams.shortName);
                    }]
                }
            });

        $urlRouterProvider.otherwise('/');

    }
})();
