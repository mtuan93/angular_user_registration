myApp.controller('CheckInsController', function($scope, $rootScope, 
	$firebase, $firebaseSimpleLogin, $routeParams, FIREBASE_URL) {

	$scope.whichmeeting = $routeParams.mId;	
	$scope.whichuser = $routeParams.uId;
	
	var ref = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + 
			'/meetings/' + $scope.whichmeeting + '/checkins');

	$scope.addCheckin = function() {
		var checkinsObj = $firebase(ref);

		var myData = {
			firstname: $scope.user.firstname,
			lastname: $scope.user.lastname,
			email: $scope.user.email,
			data: Firebase.ServerValue.TIMESTAMP
		};// myData

		checkinsObj.$push(myData).then(function() {

		}); //data sent to firebase
	};// addCheckin
	
}); //CheckIns Controller 