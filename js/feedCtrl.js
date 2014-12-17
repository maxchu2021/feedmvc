feed.controller('FeedCtrl', function FeedCtrl($scope, $http, $templateCache) {
  'use strict';
  $scope.title = 'feed';
  $scope.newFeedTitle = '';
  $scope.newFeedUrl = '';
  $scope.method = 'JSON';
  $scope.url = 'ajax/get_feed.php?url=http://feeds.feedburner.com/TechCrunch/';

  $scope.listFeed = function() {
    var index = $.jStorage.index(); 
    var name = '';
    var url = '';
    
    $scope.items = [];

    for (var key in index) {
      name = index[key];
      url = $.jStorage.get( name );
      $scope.items.push({
        name : name,
        url : url
      });
    }
  };

  $scope.addFeed = function() {
    var newFeedTitle = $scope.newFeedTitle.trim();
    var newFeedUrl = $scope.newFeedUrl.trim();
    
    if ( !$.jStorage.get( newFeedTitle ) ) {
      $.jStorage.set( newFeedTitle, newFeedUrl );
      $scope.newFeedTitle = '';
      $scope.newFeedUrl = '';
      $scope.listFeed();
    }
  };

  $scope.removeFeed = function() {
    $.jStorage.deleteKey( this.item.name );
    $scope.listFeed();
  };

  $scope.fetchFeed = function() {
    if (typeof this.item != 'undefined')
      $scope.url = 'ajax/get_feed.php?url=' + this.item.url;

    $http({method: $scope.method, url: $scope.url, cache: $templateCache}).
      success(function(data, status) {
        $scope.status = status;
        $scope.data = data;
        $scope.feeds = data;
      }).
      error(function(data, status) {
        $scope.data = data || "Request failed";
        $scope.status = status;
      });
  };

  $scope.showMobileMenu = function() {
    $('nav').toggle();
    $('.contact').toggle();
  }

  $scope.listFeed();
  $scope.fetchFeed();
})