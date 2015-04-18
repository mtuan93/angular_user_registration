myApp.controller('CheckInsController', function($scope, $rootScope, 
	$firebase, $firebaseSimpleLogin, $location, $routeParams, FIREBASE_URL) {

	$scope.whichmeeting = $routeParams.mId;	
	$scope.whichuser = $routeParams.uId;
	
	var ref = new Firebase(FIREBASE_URL + '/users/' + $scope.whichuser + 
			'/meetings/' + $scope.whichmeeting + '/checkins');

	var checkinsList = $firebase(ref).$asArray();
	$scope.checkins = checkinsList;

	$scope.addCheckin = function() {
		var checkinsObj = $firebase(ref);

		var myData = {
			firstname: $scope.user.firstname,
			lastname: $scope.user.lastname,
			email: $scope.user.email,
			data: Firebase.ServerValue.TIMESTAMP
		};// myData

		checkinsObj.$push(myData).then(function() {
			$location.path('/checkins/' + $scope.whichuser + '/' + 
				$scope.whichmeeting + '/checkinsList');
		}); //data sent to firebase
	};// addCheckin
	
	$scope.deleteCheckin = function(id) {
		var record = $firebase(ref);
		record.$remove(id);
	}; //delete Checkin

}); //CheckIns Controller 