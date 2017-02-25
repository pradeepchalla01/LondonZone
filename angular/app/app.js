(function() {


  /**
   * Definition of the main app module and its dependencies
   */
  angular
    .module('londonZones', [
      'ui.router',
      'ui.bootstrap',
      'londonZones.home',
      'londonZones.contact',
      'londonZones.aboutlondonZones',
      'londonZones.admin'
    ])
    .config(config);

  // safe dependency injection
  // this prevents minification issues
  config.$inject = ['$stateProvider', '$urlRouterProvider', '$httpProvider', '$compileProvider'];

  /**
   * App routing
   *
   * You can leave it here in the config section or take it out
   * into separate file
   * 
   */
  function config($stateProvider, $urlRouterProvider, $httpProvider, $compileProvider) {

    
    
    // routes
    $stateProvider
      .state('home', {
        url: '/home',
        views: {
          "main": {
              templateUrl: 'app/home/home.html',
              controller: 'homeController' 
            }
        }
      })
      .state('contact', {
        url: '/contact',
         views: {
          "main": {
              templateUrl: 'app/contact/contact.html',
              controller: 'contactController' 
            }
          }
      })
      .state('aboutLondonZones', {
        url: '/aboutLondonZones',
         views: {
          "main": {
              templateUrl: 'app/about_london_zones/aboutLondonZones.html',
              controller: 'aboutLondonZonesController' 
            }
          }
      })
      .state('admin', {
        url: '/admin_page',
         views: {
          "main": {
              templateUrl: 'app/admin/admin.html',
              controller: 'adminController',
              resolve:{
                trainDetails:  function(QueryService){
                  return QueryService.query('GET', 'trainDetails').then(function(data){
                      return data.data;
                  });
                },
                zoneList:  function(QueryService){
                  return QueryService.query('GET', 'allZone').then(function(data){
                      return data.data;
                  });
                },
                stationTypes:  function(QueryService){
                  return QueryService.query('GET', 'stationTypes').then(function(data){
                      return data.data;
                  });
                }
              }
            }
          }
      });

      $urlRouterProvider.otherwise('/home');
  }


  /**
   * You can intercept any request or response inside authInterceptor
   * or handle what should happend on 40x, 50x errors
   * 
   */
  angular
    .module('londonZones')
    .factory('authInterceptor', authInterceptor);

  authInterceptor.$inject = ['$rootScope', '$q', 'LocalStorage', '$location'];

  function authInterceptor($rootScope, $q, LocalStorage, $location) {

    return {

      // intercept every request
      request: function(config) {
        config.headers = config.headers || {};
        return config;
      },

      // Catch 404 errors
      responseError: function(response) {
        if (response.status === 404) {
          $location.path('/');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }


  /**
   * Run block
   */
  angular
    .module('londonZones')
    .run(run);

  run.$inject = ['$rootScope', '$location'];

  function run($rootScope, $location) {

    // put here everything that you need to run on page load

  }


})();