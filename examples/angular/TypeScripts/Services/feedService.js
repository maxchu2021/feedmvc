/// <reference path="../../Scripts/typings/angularjs/angular.d.ts"/>
var Feed;
(function (Feed) {
    var Services;
    (function (Services) {
        var FeedService = (function () {
            function FeedService($http, $log, $templateCache) {
                this.$http = $http;
                this.$log = $log;
                this.$templateCache = $templateCache;
            }
            FeedService.prototype.GetFeedList = function (url) {
                var url = '../../server/get_feed.php?url=' + url;
                return this.$http.get(url, {
                    cache: this.$templateCache
                });
            };
            return FeedService;
        }());
        FeedService.$inject = ['$http', '$log', '$templateCache'];
        Services.FeedService = FeedService;
        angular.module('Feed.Services')
            .service('FeedService', FeedService);
    })(Services = Feed.Services || (Feed.Services = {}));
})(Feed || (Feed = {}));
