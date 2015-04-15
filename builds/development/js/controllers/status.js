myApp.controller('StatusController', function(
	$scope, $rootScope, $firebaseSimpleLogin, $location, 
	$firebase, FIREBASE_URL, Authentication) {

	$scope.logout = function() {
		Authentication.logout();
		$location.path('/login');
	};

	$rootScope.$on('$firebaseSimpleLogin:login', function(e, authUser) {
		var ref = new Firebase(FIREBASE_URL + '/users/' + authUser.uid);
		var user = $firebase(ref).$asObject();

		user.$loaded().then(function() {
			$rootScope.currentUser = user;
		});
	});

	$rootScope.$on('$firebaseSimpleLogin:logout', function(e, authUser) {
		$rootScope.currentUser = null;
	});
});