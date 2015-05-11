/// <reference path="../Models/feedItemModel.ts"/>
/// <reference path="../Modules/Feed/feedController.ts"/>

module Feed.Interfaces {
	export interface IFeedScope extends ng.IScope {
		items: Feed.Models.FeedItemModel[];
        newFeedTitle: string;
		newFeedUrl: string;
		vm: Feed.Controllers.FeedController;
	}
}
