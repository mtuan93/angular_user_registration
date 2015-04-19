var myApp = angular.module('myApp', ['ngRoute',
'firebase', 'appControllers'])
.constant('FIREBASE_URL', 'https://mtuan93.firebaseio.com/');

var appControllers = angular.module('appControllers',
  ['firebase']);

myApp.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError',
  function(event, next, previous, error) {
    if(error === 'AUTH_REQUIRED') {
      $rootScope.message='Sorry, you must log in to access that page';
      $location.path('/login');
    }
  });

  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if ($rootScope.currentUser)  //already logged in
      {
        if (  next.templateUrl === 'views/login.html' || 
              next.templateUrl === 'views/register.html') // if try to go somewhere else
        {
          $location.path( "/meetings" ); // redirect to meetings.html
        } 
        else 
        {
        }
      }         
  });
}]);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller:  'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller:  'RegistrationController'
    }).
    when('/checkins/:uId/:mId', {
      templateUrl: 'views/checkins.html',
      controller:  'CheckInsController',
      resolve : {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).
    when('/checkins/:uId/:mId/checkinsList', {
      templateUrl: 'views/checkinslist.html',
      controller:  'CheckInsController',
      resolve : {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).
    when('/meetings', {
      templateUrl: 'views/meetings.html',
      controller: 'MeetingsController',
      resolve : {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).
    otherwise({
      redirectTo: '/login'
    });
}]);