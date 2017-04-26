/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../../../Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../../TypeScripts/app.module.ts"/>
/// <reference path="../../../TypeScripts/Utilities/LoadingBarUtility/loadingBarUtility.ts"/>
/// <reference path="../../../TypeScripts/Models/feedItemModel.ts"/>
/// <reference path="../../../TypeScripts/Interfaces/IFeedStorage.ts"/>
/// <reference path="../../../TypeScripts/Services/feedService.ts"/>
/// <reference path="../../../TypeScripts/Services/feedStorage.ts"/>
var Feed;
(function (Feed) {
    var Controllers;
    (function (Controllers) {
        var FeedController = (function () {
            function FeedController($scope, $http, $log, $window, LoadingBarUtility, FeedService, FeedStorage) {
                var _this = this;
                this.$scope = $scope;
                this.$http = $http;
                this.$log = $log;
                this.$window = $window;
                this.LoadingBarUtility = LoadingBarUtility;
                this.FeedService = FeedService;
                this.FeedStorage = FeedStorage;
                this.items = $scope.items = this.FeedStorage.get();
                this.$scope.vm = this;
                this.$scope.$watch('items', function () { return _this.onFeed(); }, true);
                this.$scope.$watch(function () {
                    return $window.innerWidth;
                }, function (value) {
                    if (value > 1200) {
                        $scope.isNavOpen = true;
                        $scope.isTouchDevice = false;
                    }
                    else {
                        $scope.hoverRemove = true;
                        $scope.isTouchDevice = true;
                    }
                });
                this.$scope.hoverIn = function () {
                    this.hoverRemove = true;
                };
                this.$scope.hoverOut = function () {
                    this.hoverRemove = false;
                };
                if (this.items.length === 0) {
                    this.items.push(new Feed.Models.FeedItemModel('TechCrunch', 'http://feeds.feedburner.com/TechCrunch/'));
                    this.items.push(new Feed.Models.FeedItemModel('Gamespot', 'http://www.gamespot.com/feeds/news/'));
                }
                var item = typeof localStorage['url'] !== 'undefined' ? JSON.parse(localStorage['url']) : this.items[0];
                this.GetFeedList(this, item);
                this.Open = false;
            }
            FeedController.prototype.onFeed = function () {
                this.FeedStorage.put(this.$scope.items);
            };
            FeedController.prototype.addFeed = function () {
                var newFeedTitle = this.$scope.newFeedTitle;
                var newFeedUrl = this.$scope.newFeedUrl;
                if (!/^https?\:\/\//.test(newFeedUrl)) {
                    newFeedUrl = "http://" + newFeedUrl;
                }
                this.items.push(new Feed.Models.FeedItemModel(newFeedTitle, newFeedUrl));
                this.$scope.newFeedTitle = '';
                this.$scope.newFeedUrl = '';
            };
            FeedController.prototype.removeFeed = function (FeedItemModel) {
                this.items.splice(this.items.indexOf(FeedItemModel), 1);
            };
            FeedController.prototype.GetFeedList = function (tableState, item) {
                var _this = this;
                if (this.$scope.isTouchDevice) {
                    this.$scope.isNavOpen = false;
                    this.showMobileMenu();
                }
                this.LoadingBarUtility.ShowLoadingBar();
                this.FeedService.GetFeedList(item.url)
                    .success(function (result) {
                    tableState.Feeds = result;
                    tableState.FeedTitle = item.name;
                    _this.LoadingBarUtility.HideLoadingBar();
                    localStorage['url'] = JSON.stringify(item);
                })
                    .error(function (result) {
                    _this.LoadingBarUtility.HideLoadingBar();
                    alert("Can't parse this URL. Please try again.");
                });
            };
            FeedController.prototype.showMobileMenu = function () {
                if (!this.Open) {
                    $('.mobile-menu button').addClass('close');
                    this.Open = true;
                }
                else {
                    $('.mobile-menu button').removeClass('close');
                    this.Open = false;
                }
            };
            return FeedController;
        }());
        FeedController.$inject = [
            '$scope',
            '$http',
            '$log',
            '$window',
            'LoadingBarUtility',
            'FeedService',
            'FeedStorage'
        ];
        Controllers.FeedController = FeedController;
        angular.module('Feed.Controllers')
            .controller('FeedController', FeedController);
    })(Controllers = Feed.Controllers || (Feed.Controllers = {}));
})(Feed || (Feed = {}));
