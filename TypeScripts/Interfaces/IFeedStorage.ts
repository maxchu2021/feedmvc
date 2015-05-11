/// <reference path="../Models/feedItemModel.ts"/>

module Feed.Interfaces {
	export interface IFeedStorage {
		get (): Feed.Models.FeedItemModel[];
		put(feed: Feed.Models.FeedItemModel[]);
	}
}
