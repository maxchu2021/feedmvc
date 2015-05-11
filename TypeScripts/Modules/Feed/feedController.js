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
            function FeedController($scope, $http, $log, LoadingBarUtility, FeedService, FeedStorage) {
                var _this = this;
                this.$scope = $scope;
                this.$http = $http;
                this.$log = $log;
                this.LoadingBarUtility = LoadingBarUtility;
                this.FeedService = FeedService;
                this.FeedStorage = FeedStorage;
                this.items = $scope.items = this.FeedStorage.get();
                $scope.vm = this;
                this.Title = "feed";
                this.Contacts = [{
                        link: 'https://github.com/keanyc/feed',
                        icon: 'github',
                        target: '_blank'
                    }];
                this.Feeds = this.GetFeedList(this, 'http://feeds.feedburner.com/TechCrunch/');
                this.Open = false;
                if (this.items.length === 0) {
                    this.items.push(new Feed.Models.FeedItemModel('TechCrunch', 'http://feeds.feedburner.com/TechCrunch/'));
                    this.items.push(new Feed.Models.FeedItemModel('Gamespot', 'http://www.gamespot.com/feeds/news/'));
                }
                this.$scope.$watch('items', function () { return _this.onFeed(); }, true);
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
            FeedController.prototype.GetFeedList = function (tableState, url) {
                var _this = this;
                this.LoadingBarUtility.ShowLoadingBar();
                this.FeedService.GetFeedList(url)
                    .success(function (result) {
                    tableState.Feeds = result;
                    _this.LoadingBarUtility.HideLoadingBar();
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
                $('nav').toggle();
                $('.contact').toggle();
            };
            FeedController.$inject = [
                '$scope',
                '$http',
                '$log',
                'LoadingBarUtility',
                'FeedService',
                'FeedStorage'
            ];
            return FeedController;
        })();
        Controllers.FeedController = FeedController;
        angular.module('Feed.Controllers')
            .controller('FeedController', FeedController);
    })(Controllers = Feed.Controllers || (Feed.Controllers = {}));
})(Feed || (Feed = {}));
