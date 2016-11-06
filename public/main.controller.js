angular
  .module('mainApp', ['spotify', 'ui.router'])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
        url: '/',
        templateUrl: 'main.html',
        controller: 'MainCtrl'
    })
    .state('artist', {
        url: '/artist/:id',
        templateUrl: 'artist.html',
        controller: 'ArtistCtrl'
    })
})

.controller('MainCtrl', ['$scope', 'Spotify', function($scope, Spotify, $stateParams) {

  $scope.login = function() {
    Spotify.login().then(function(data) {
      $scope.loggedIn = true;
    }, function() {
      console.log('didn\'t log in');
    })
  };

$scope.searchArtist = function() {
  Spotify.search($scope.searchartist, 'artist').then(function(data) {
    $scope.artists = data.artists.items;
  });
};

}])

.controller('ArtistCtrl', ['$scope', 'Spotify', '$stateParams', function($scope, Spotify, $stateParams) {
    $scope.params = JSON.stringify($stateParams).replace('"id":', '').replace('"', '').replace('"', '').replace('{', '').replace('}', '');
    console.log($scope.params);
    $scope.getArtistAlbums = function() {
        Spotify.getArtistAlbums($scope.params).then(function(data) {
          $scope.artistAlbums = data.items;
        });

        Spotify.getRelatedArtists($scope.params).then(function(data) {
          $scope.relatedArtists = data;
        });

        Spotify.getArtistTopTracks($scope.params, 'US').then(function(data) {
          $scope.topTracks = data;
        });
        Spotify.getArtist($scope.params).then(function(data) {
          $scope.artistStuff = data;
        })
  }


$scope.searchArtist = function() {
  Spotify.search($scope.searchartist, 'artist').then(function(data) {
    $scope.artists = data.artists.items;
  });
};

}])


.filter('unique', function() {
   // we will return a function which will take in a collection
   // and a keyname
   return function(collection, keyname) {
      // we define our output and keys array;
      var output = [],
          keys = [];

      // we utilize angular's foreach function
      // this takes in our original collection and an iterator function
      angular.forEach(collection, function(item) {
          // we check to see whether our object exists
          var key = item[keyname];
          // if it's not already part of our keys array
          if(keys.indexOf(key) === -1) {
              // add it to our keys array
              keys.push(key);
              // push this item to our final output array
              output.push(item);
          }
      });
      // return our array which should be devoid of
      // any duplicates
      return output;
   };
});
