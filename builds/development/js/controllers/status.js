myApp.controller('StatusController', function(
	$scope, $rootScope, $firebaseSimpleLogin, $location,
	Authentication) {

	$scope.logout = function() {
		Authentication.logout();
		$location.path('/login');
	}

	$rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser) {
		$scope.userEmail = authUser.email;
	});

	$rootScope.$on('$firebaseSimpleLogin:logout', function(e, authUser) {
		$scope.userEmail = null;
	});
});