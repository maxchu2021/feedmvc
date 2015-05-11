/// <reference path="../../TypeScripts/Models/feedItemModel.ts"/>
/// <reference path="../../TypeScripts/Interfaces/IFeedStorage.ts"/>
var Feed;
(function (Feed) {
    var Services;
    (function (Services) {
        var FeedStorage = (function () {
            function FeedStorage() {
                this.STORAGE_ID = 'feed';
            }
            FeedStorage.prototype.get = function () {
                return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
            };
            FeedStorage.prototype.put = function (feed) {
                localStorage.setItem(this.STORAGE_ID, JSON.stringify(feed));
            };
            return FeedStorage;
        })();
        Services.FeedStorage = FeedStorage;
        angular.module('Feed.Services')
            .service('FeedStorage', FeedStorage);
    })(Services = Feed.Services || (Feed.Services = {}));
})(Feed || (Feed = {}));
