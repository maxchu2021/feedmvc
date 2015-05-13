/// <reference path="../../../Scripts/typings/jquery/jquery.d.ts"/>
/// <reference path="../../../Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="../../../TypeScripts/app.module.ts"/>
/// <reference path="../../../TypeScripts/Utilities/LoadingBarUtility/loadingBarUtility.ts"/>
/// <reference path="../../../TypeScripts/Models/feedItemModel.ts"/>
/// <reference path="../../../TypeScripts/Interfaces/IFeedStorage.ts"/>
/// <reference path="../../../TypeScripts/Services/feedService.ts"/>
/// <reference path="../../../TypeScripts/Services/feedStorage.ts"/>

module Feed.Controllers {
    export class FeedController {
        static $inject = [
            '$scope',
            '$http',
            '$log',
            '$window',
            'LoadingBarUtility',
            'FeedService',
            'FeedStorage'
        ];

        items: Feed.Models.FeedItemModel[];

        Title: string;

        Feeds: any;

        Open: boolean;

        newFeedTitle: string;

        newFeedUrl: string;

        constructor(
            private $scope: Feed.Interfaces.IFeedScope,
            private $http: ng.IHttpService,
            private $log: ng.ILogService,
            private $window: ng.IWindowService,
            private LoadingBarUtility: Utilities.LoadingBarUtility,
            private FeedService: Services.FeedService,
            private FeedStorage: Feed.Interfaces.IFeedStorage) {

            this.items = $scope.items = this.FeedStorage.get();

            this.$scope.vm = this;

            this.$scope.$watch('items', () => this.onFeed(), true);

            this.$scope.$watch(function(){
                return $window.innerWidth;
            }, function(value) {
                if (value > 1200) {
                    $scope.isNavOpen = true;
                    $scope.isTouchDevice = false;
                } else {
                    $scope.hoverRemove = true;
                    $scope.isTouchDevice = true;
                }
            });

            this.$scope.hoverIn = function(){
                this.hoverRemove = true;
            };

            this.$scope.hoverOut = function(){
                this.hoverRemove = false;
            };

            this.Title = "feed";

            this.Feeds = this.GetFeedList(this, 'http://feeds.feedburner.com/TechCrunch/');

            this.Open = false;

            if (this.items.length === 0) {
                this.items.push(new Feed.Models.FeedItemModel('TechCrunch', 'http://feeds.feedburner.com/TechCrunch/'));
                this.items.push(new Feed.Models.FeedItemModel('Gamespot', 'http://www.gamespot.com/feeds/news/'));
            }
        }

        onFeed() {
            this.FeedStorage.put(this.$scope.items);
        }

        addFeed() {
            var newFeedTitle: string = this.$scope.newFeedTitle;
            var newFeedUrl: string = this.$scope.newFeedUrl;
            if (!/^https?\:\/\//.test(newFeedUrl)) {
                newFeedUrl = "http://" + newFeedUrl;
            }

            this.items.push(new Feed.Models.FeedItemModel(newFeedTitle, newFeedUrl));
            this.$scope.newFeedTitle = '';
            this.$scope.newFeedUrl = '';
        }

        removeFeed(FeedItemModel: Feed.Models.FeedItemModel) {
            this.items.splice(this.items.indexOf(FeedItemModel), 1);
        }


        GetFeedList(tableState, url) {
            this.LoadingBarUtility.ShowLoadingBar();
            this.FeedService.GetFeedList(url)
                .success((result) => {
                    tableState.Feeds = result;
                    this.LoadingBarUtility.HideLoadingBar();
                });
        }

        showMobileMenu() {
            if (!this.Open) {
                $('.mobile-menu button').addClass('close');
                this.Open = true;
            } else {
                $('.mobile-menu button').removeClass('close');
                this.Open = false;
            }
        }
    }

    angular.module('Feed.Controllers')
        .controller('FeedController', FeedController);
}
