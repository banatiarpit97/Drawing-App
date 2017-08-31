var a = angular.module('DrawingApp', ['ngMaterial'])
    a.config(function($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('light-blue')
            .accentPalette('light-blue');
    });
    a.controller('AppCtrl', function($scope) {

        $scope.width = 3;
        $("md-slider-container").click(function(){
            dimension = $scope.width + "px";
            console.log(dimension);
            $(".stroke_size").css("width", dimension);
            $(".stroke_size").css("height", dimension);

        })

    });
