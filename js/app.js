var app = angular.module('weatherApp', []);


app.controller('TestCtrl', ['$scope', 'dataService', function($scope, dataService){
    $scope.location = '11355';
    $scope.liveData = dataService.liveData($scope.location);

    $scope.updateWeather = function(){
        $scope.liveData = dataService.liveData($scope.location);
    };
}]);

app.factory('dataService', function($http){

    return {
        liveData: function(location) {
            return $http.jsonp('http://localhost:5000/'+ encodeURIComponent(location) + '?callback=JSON_CALLBACK').success(function(data){
                return data
            });
        }
    }
});

app.directive('weatherStatus', function (){
    return {
        restrict: 'AC',
        link: function(scope, elm, attrs){
            attrs.$observe('weatherStatus', function(value){
                if (value === 'Haze') {
                    elm.css('background', 'url("http://3.bp.blogspot.com/-Xbo3mzW5tb0/UcEyfDEZeYI/AAAAAAAACzA/H2HWpj8mC1g/s1600/IMG_2398.JPG")');
                    elm.css('background-size', '100% auto');
                    elm.css('background-repeat', 'no-repeat');
                } else if (value === 'Clouds') {
                    elm.css('background', 'url("http://www.carlwozniak.com/clouds/Graphics/New%20Pix/clouds39.jpg")');
                    elm.css('background-size', '100% auto');
                    elm.css('background-repeat', 'no-repeat');
                } else if (value === 'Clear') {
                    elm.css('background', 'url("http://frontpagemag.com/wp-content/uploads/2013/07/New-York-City-Skyline.jpg")');
                    elm.css('background-size', '100% auto');
                    elm.css('background-repeat', 'no-repeat');
                }
            });
        }
    }
});
