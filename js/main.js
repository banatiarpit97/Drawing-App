var a = angular.module('DrawingApp', ['ngMaterial'])
    a.config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue')
            .accentPalette('light-blue');
    });
    a.controller('AppCtrl', function($scope) {

        $scope.width = 3;

    });
