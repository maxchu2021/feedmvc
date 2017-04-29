var Feed;
(function (Feed) {
    var Models;
    (function (Models) {
        var FeedItemModel = (function () {
            function FeedItemModel(name, url) {
                this.name = name;
                this.url = url;
            }
            return FeedItemModel;
        })();
        Models.FeedItemModel = FeedItemModel;
    })(Models = Feed.Models || (Feed.Models = {}));
})(Feed || (Feed = {}));
