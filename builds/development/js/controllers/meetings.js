myApp.controller('MeetingsController', 
	function($scope, $rootScope, $firebase, $firebaseSimpleLogin,
	 FIREBASE_URL) {

	var ref = new Firebase(FIREBASE_URL);
	var simpleLogin = $firebaseSimpleLogin(ref);

	simpleLogin.$getCurrentUser().then(function(authUser) {
		var ref = new Firebase(FIREBASE_URL + '/users/' +
				authUser.uid + '/meetings');
		var meetingsInfo = $firebase(ref);
		var meetingsObj = meetingsInfo.$asObject();
		var meetingsArray = meetingsInfo.$asArray();

		meetingsObj.$loaded().then(function() {
			$scope.meetings = meetingsObj;
		});

		meetingsArray.$loaded().then(function() {
			$rootScope.howManyMeetings = meetingsArray.length;
		});

		meetingsArray.$watch(function(event) {
			$rootScope.howManyMeetings = meetingsArray.length;
		});

		$scope.addMeeting = function() {
			meetingsInfo.$push({
				name: $scope.meetingname,
				date: Firebase.ServerValue.TIMESTAMP
			}).then(function() {
				console.log("yo");
				$scope.meetingname = "";
			});
		}; //addmeeting

		$scope.deleteMeeting = function(key) {
			meetingsInfo.$remove(key);
		};

	}); //get current user

}); //MeetingsController