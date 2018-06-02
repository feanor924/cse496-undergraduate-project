var app = angular.module('myApp',['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/settings", {
        templateUrl : "./settings.html"
    })
    .when("/about", {
        templateUrl : "./contact.html"
    })
    .when("/contentDevice", {
        templateUrl : "./contentdevice.html"
    })
    .when("/statusDevice", {
        templateUrl : "./statusdevice.html"
    })
	.when("/removeDevice", {
        templateUrl : "./removedevice.html"
    })
    .when("/userprofile",{
		templateUrl : "./user_info.html"
    });

});

app.controller('loginCtrl_',function ($scope,$http,$window) {

	$scope.form = {};

	$scope.form_contact = {};

	$scope.form.id = $window.localStorage.getItem(0);

	$scope.form1 = {};

	$scope.form1.name = $window.localStorage.getItem(0);

	$scope.form1.password = $window.localStorage.getItem(1);


	$http({
	    method:'POST',
	    dataType: "json",
	    url: 'http://localhost:3000/devices',
	    data : $scope.form1, 
	    headers: {
	      'Content-Type': 'application/json' 
	    }
  	}).then(function(data){
  		console.log(data);
  		$scope.temp = data.data[0];
  		$scope.pressure = data.data[2];
  		$scope.humidity = data.data[3];
  		if ( data.data[4] < 30){
  			$scope.light = "Karanlık"
  		}
  		else if ( data.data[4] > 30 && data.data[4] < 50 ){
  			$scope.light = "Az Karanlık"
  		}
  		else if ( data.data[4] > 50 && data.data[4] < 90 ){
  			$scope.light = "Aydınlık"
  		}

  		if ( data.data[5] > 200){
  			$scope.distance = "Çok yakında bir cisim var"
  		}
  		else if ( data.data[5] > 0 && data.data[5] < 50 ){
  			$scope.distance = "Yakınlarda bir cisim var"
  		}


  	})


	$http({
	    method:'POST',
	    dataType: "json",
	    url: 'http://localhost:3000/users',
	    data : $scope.form1, 
	    headers: {
	      'Content-Type': 'application/json' 
	    }
  	}).then(function(data){
  		$scope.firstname = data.data.first_name;
  		$scope.lastname = data.data.last_name;
  		$scope.department = data.data.department;
  		$scope.username = data.data.user_name;
  		$scope.email = data.data.email;
  		$scope.contact = data.data.contact_no;

  	});


	$scope.submit = function(){
		$http({
		    method:'POST',
		    dataType: "json",
		    url: 'http://localhost:3000/put',
		    data : $scope.form, 
		    headers: {
		      'Content-Type': 'application/json' 
		    }
	  	}).then(function(data){
		  	alert("User Updated");
	  	});

    };

    $scope.user_contact = function(){
    	$http({
		    method:'POST',
		    dataType: "json",
		    url: 'http://localhost:3000/contact',
		    data : $scope.form_contact, 
		    headers: {
		      'Content-Type': 'application/json' 
		    }
	  	}).then(function(data){
  			if ( data.data == 1)
  				alert("Mesaj Gönderildi");
  			else if ( data.data == 0){
  				alert("Bir hata meydana geldi");
  			}

	  	});
    };



});


