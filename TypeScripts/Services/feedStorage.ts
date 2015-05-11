/// <reference path="../../TypeScripts/Models/feedItemModel.ts"/>
/// <reference path="../../TypeScripts/Interfaces/IFeedStorage.ts"/>

module Feed.Services {
    export class FeedStorage implements IFeedStorage {

        STORAGE_ID = 'feed';

        get (): FeedItemModel[] {
            return JSON.parse(localStorage.getItem(this.STORAGE_ID) || '[]');
        }

        put(feed: FeedItemModel[]) {
            localStorage.setItem(this.STORAGE_ID, JSON.stringify(feed));
        }
    }

    angular.module('Feed.Services')
        .service('FeedStorage', FeedStorage);
}
