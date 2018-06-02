var app = angular.module('myApp',['ngRoute']);

app.controller('loginCtrl',function ($scope,$location,$http,$window) {
    



    $scope.submit = function(){
         
        var user = {
            userName : $scope.email,
            password : $scope.password
        };
        $window.localStorage.setItem(0,user.userName);
        $window.localStorage.setItem(1,user.password);

        $http({
            method:'POST',
            dataType: "json",
            url: 'http://localhost:3000/login',
            data : user, 
            headers: {
              'Content-Type': 'application/json' 
            }
        }).then(function(data){
            if ( data.data == "1"){
                window.location = "./bootstrap-sidebar/dashboard.html";
            }
        });

    };
});





app.config(["$routeProvider", function($routeProvider) {
    return $routeProvider.when("/", {
        redirectTo: "/login"
    }).when("/dashboard", {
        templateUrl: "dashboard.html"
    }).when("/login", {
        templateUrl: "login.html"
    }).otherwise({
        redirectTo: "/404"
    })
    }]).run(function($rootScope, $location) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (!(next.templateUrl == "login.html")) {
                $location.path("/login");
            }
        })
    })  





