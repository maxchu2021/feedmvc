/// <reference path="../../Scripts/typings/angularjs/angular.d.ts"/>

module Feed.Services {
    export class FeedService {
        static $inject = ['$http', '$log', '$templateCache'];

        constructor(
            private $http: ng.IHttpService,
            private $log: ng.ILogService,
            private $templateCache: ng.ITemplateCacheService) {
        }

        GetFeedList(url: string) {
            var url = '../../server/get_feed.php?url=' + url;

            return this.$http.get(url, {
                cache: this.$templateCache
            });
        }
    }

    angular.module('Feed.Services')
        .service('FeedService', FeedService);
}
