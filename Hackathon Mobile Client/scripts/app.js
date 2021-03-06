'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('app', ['ionic', 'config', 'ngCordova'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function ($stateProvider, $urlRouterProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

        // setup an abstract state for the tabs directive

            .state('index', {
                       url: '/',
                       templateUrl: 'templates/home.html'
                   })
    
            .state('getDiscountPage', {
                url: '/getDiscountPage',
                       templateUrl: 'templates/discountPage.html'
            })

            .state('getLocalDeals', {
                       url: '/getLocalDeals',
                       templateUrl: 'templates/deals.html'
                   })
        
            .state('booking', {
                       url: '/booking',
                       templateUrl: 'templates/booking.html'
                   })

            .state('login', {
                       url: '/login',
                       templateUrl: 'templates/login.html'
                   })

            .state('register', {
                       url: '/register',
                       templateUrl: 'templates/register.html'
                   })
    
            .state('restaurants', {
                       url: '/restaurants',
                       templateUrl: 'templates/restaurants-list.html'
                   })

            .state('restaurant-info', {
                       url: '/restaurants/:id',
                       templateUrl: 'templates/restaurant-info.html'
                   })

            .state('restaurant-menu', {
                       url: '/restaurants/:id/menu',
                       templateUrl: 'templates/menu.html'
                   })

            .state('check', {
                       url: '/check',
                       templateUrl: 'templates/check.html'
                   })

            .state('deals', {
                       url: '/deals',
                       templateUrl: 'templates/deal.html'
                   })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/');
    });