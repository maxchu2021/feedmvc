/// <reference path="../Scripts/typings/angularjs/angular.d.ts"/>
var Feed;
(function (Feed) {
    var Controllers;
    (function (Controllers) {
        angular.module('Feed.Controllers', ['Feed.Services']);
        angular.module('Feed.Services', []);
        angular.module('Feed.Utilities', ['cfp.loadingBar']);
        angular.module('Feed.Interfaces', []);
        angular.module('Feed.Models', []);
    })(Controllers = Feed.Controllers || (Feed.Controllers = {}));
})(Feed || (Feed = {}));
