// routing
angular.module('passportApp').config(function($routeProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  $routeProvider.when('/home', {
    templateUrl: 'views/home.html',
    // controller: 'HomeController as home'
  }).when('/newUser', {
    templateUrl: 'views/register.html',
    controller: 'RegisterController as register'
  }).otherwise({
    templateUrl: 'views/login.html',
    controller: 'LoginController as login'
  });
});
