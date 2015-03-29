(function () {
	var app = angular.module('home',['ngRoute']);
	//var Qdata;
	
	app.controller('MainController', function($scope, $http, $route, $routeParams, $location) {
       	 $scope.$route = $route;
	     $scope.$location = $location;
	     $scope.$routeParams = $routeParams;
	     
	     
	     $scope.$on('$viewContentLoaded', function(event) {
		    ga('send', 'pageview', $location.path());
		  });
 	});


	app.controller('QueController', function ($scope, $http, $routeParams) {	
		$scope.sub = $routeParams.sub;
		//alert($scope.sub.substring(0,7));
		$main_id = $scope.sub.substring(0,7);
		$sub_id = $scope.sub.charAt($scope.sub.length - 1);
		$('#load').modal('toggle');
		$http.get("http://it.addybs.com/client/it.php?action=questions&id=" + $main_id + "&sub=" + $sub_id).
		    success(function(data, status, headers, config) {
			    $scope.test = new Test(data);
			    $("#timer").html('<h3 id="timer">Duration: ' + $scope.test.properties.duration + '</h3>');
			    $('#load').modal('toggle');
			    $scope.timer = new Timer($scope.test.properties.duration, 1000, function (h, m, s){
					$("#timer").html('<h3 id="timer">Duration: ' + h + ":" + m + ":" + s + '</h3>');
				});
		    }).
		    error(function(data, status, headers, config) {
		    	console.error(data);
		});

		$scope.conNum = function(num) {
          	return String.fromCharCode(65 + num)
          	alert()
		};

		$scope.select = function() {
          	return String.fromCharCode(65 + num)
          	alert()
		};

		
		$scope.start = function() {
			$scope.timer.stop()
          	$scope.test.draw('init');
         	$scope.timer.start(function(){showMark()});

			$('.list-group-item').click(function() {
				$(this).toggleClass('active');
				$scope.test.choice($(this).attr('id'));					
				//$('#mess').append($(this).attr('id'));
			});    
		};

		function showMark () {
			$scope.timer.stop()
          	var resultMess = new Message(1, 'Instant Test Client', "<h4>You scored " + $scope.test.mark() + "%</h4>", [{text: "ok",
					  size: "mb",
					  background: "info",	
					  }])
          	resultMess.show()
          	$("#timer").html('<h3 id="timer">Duration: ' + $scope.test.properties.duration + '</h3>');
		}

		$scope.mark = function() {
			var markMess = new Message(0, 'Instant Test Client', "<h4>Are you sure you want to mark now?</h4>", [
				{text: "yes",
				 size: "mb",
				 background: "info",
				 funct: function(){
				 	showMark()
				 }},
				 {text: "no",
				 size: "mb",
				 background: "warning"}])
			markMess.show()
		};
	});
	
	app.controller('TestController', function ($scope, $http, $routeParams) {
		$scope.main = $routeParams.main;
				
		$http.get("http://localhost/quiz/server.php?action=meta&id=" + $scope.main).
		    success(function(data, status, headers, config) {
			    $scope.files = data.container.files.file;
		    }).
		    error(function(data, status, headers, config) {
		    	console.log(data);
		});
	});
	
	
	app.controller('AnsController', function ($scope, $http) {	
	/*	$scope.ques = $Qdata;
		$scope.conNum = function(num) {
          	return String.fromCharCode(97 + num);
		};*/
	});
	
	app.controller('TestController', function ($scope, $http, $routeParams) {
		$scope.main = $routeParams.main;
			$('#load').modal('toggle');
		  	$http.get("http://it.addybs.com/API/TestAPI.php?action=get_test_list").
		    success(function(data, status, headers, config) {
		     $scope.tests = data;
		     $('#load').modal('toggle');
		    }).
		    error(function(data, status, headers, config) {
		    	$('#load').modal('toggle');
		      console.log(data);
		    });
	});
	
	
	app.controller('SubTestController', function ($scope, $http, $routeParams) {
		$scope.main = $routeParams.main;
		if ($scope.main != undefined){
			//alert($scope.main);
			
			$http.get("http://it.addybs.com/client/it.php?action=meta&id=" + $scope.main).
		    success(function(data, status, headers, config) {
			    $scope.files = data.container.files.file;
			    
			    if ($scope.files.ATTRtitle != undefined){
			    	//Redirects the user if there are no subtests in the selected test
					location.replace('http://it.addybs.com/client.html#/question/' + $scope.main + '0');
			    }
		    }).
		    error(function(data, status, headers, config) {
		    	console.log(data);
			});
		}else{
			
		}
		
	});

	app.controller('ResultController', function ($scope) {
	});

	app.config(function($routeProvider, $locationProvider) {
		$routeProvider
		.when('/', {
		    templateUrl: 'client/partials/test.html',
		    controller: 'TestController'
		  })

				  
		  .when('/results/', {
		    templateUrl: 'client/partials/results.html',
		    controller: 'ResultController'
		  })
		  
		  .when('/answer/', {
		    templateUrl: 'client/partials/answer.html',
		    controller: 'AnsController'
		  })

		  .when('/question/:sub', {
		    templateUrl:'client/partials/question.html',
		    controller: 'QueController'
		  })

		  .when('/test/', {
		    templateUrl: 'client/partials/test.html',
		    controller: 'TestController'
		  })

		  .when('/test/:main', {
		    templateUrl: 'client/partials/test.html',
		    controller: 'TestController'
		  })
		  
		  .when('/subtest/:main', {
		    templateUrl: 'client/partials/subtest.html',
		    controller: 'SubTestController'
		  })
		  		  
		  .otherwise({
	        redirectTo: '/'
	      });
	});

	
})();
