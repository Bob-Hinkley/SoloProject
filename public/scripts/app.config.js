

// routing
angular
   .module("passportApp")
   .config(function($routeProvider, $locationProvider) {
     $locationProvider.html5Mode(true);

  // $routeProvider.when('/home', {
  //   templateUrl: 'views/home.html',
  //   controller: 'HomeController as home'
  // }).when('/newUser', {
  //   templateUrl: 'views/register.html',
  //   controller: 'RegisterController as register'
  // }).otherwise({
  //   templateUrl: 'views/login.html',
  //   controller: 'LoginController as login'
  // });

   $routeProvider
      .when("/home", {
         templateUrl: "views/home.html",
         controller: "HomeController as home",
         authRequired: true
       })
       .when("/view", {
          templateUrl: "views/view.html",
          controller: "ViewController as view",
          authRequired: true
        })
        .when("/create", {
           templateUrl: "views/create.html",
           controller: "CreateController as create",
           authRequired: true
         })
         .when("/viewtest", {
           templateUrl: "views/viewtest.html",
           controller: "ViewtestController as viewtest",
           authRequired: true
         })
        //  .when("/:individualTest", {
        //    templateUrl: "views/individualTest.html",
        //    controller: "ViewtestController as viewtest",
        //    authRequired: true
        //  })
       .when("/newUser", {
         templateUrl: "views/register.html",
         controller: "RegisterController as register"
       })
       .otherwise({
         templateUrl: "views/login.html",
         controller: "LoginController as login"
       });
   })
   .run(function($rootScope, $location, $route, AuthService) {
     $rootScope.$on("$routeChangeStart", function(event, next, current) {
       AuthService.checkLoginStatus().then(function(loggedIn) {
         console.log(loggedIn);
         if (next.authRequired && !loggedIn) {
           $location.path("/login");
           $route.reload();
         }
       });
     });
});
