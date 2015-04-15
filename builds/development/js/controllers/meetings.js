myApp.controller('MeetingsController', 
	function($scope, $rootScope, $firebase) {

	var ref = new Firebase('https://mtuan93.firebaseio.com/meetings');
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
			$scope.meetingname = "";
		});
	}; //addmeeting

	$scope.deleteMeeting = function(key) {
		meetingsInfo.$remove(key);
	};

}); //MeetingsController