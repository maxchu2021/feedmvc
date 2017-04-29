/// <reference path="../../../Scripts/typings/angularjs/angular.d.ts"/>
var Feed;
(function (Feed) {
    var Utilities;
    (function (Utilities) {
        var LoadingBarUtility = (function () {
            function LoadingBarUtility($rootScope, $log, cfpLoadingBar) {
                this.$rootScope = $rootScope;
                this.$log = $log;
                this.cfpLoadingBar = cfpLoadingBar;
            }
            LoadingBarUtility.prototype.EnableLoadingBar = function () {
                var _this = this;
                this.$rootScope.IsStillLoading = true;
                this.$rootScope.$on('loadingBar:start', function () {
                    _this.cfpLoadingBar.start();
                });
                this.$rootScope.$on('loadingBar:finish', function () {
                    _this.$rootScope.IsStillLoading = false;
                    _this.cfpLoadingBar.complete();
                });
            };
            LoadingBarUtility.prototype.ShowLoadingBar = function () {
                this.$rootScope.$emit('loadingBar:start');
            };
            LoadingBarUtility.prototype.HideLoadingBar = function () {
                this.$rootScope.$emit('loadingBar:finish');
            };
            LoadingBarUtility.$inject = ['$rootScope', '$log', 'cfpLoadingBar'];
            return LoadingBarUtility;
        })();
        Utilities.LoadingBarUtility = LoadingBarUtility;
        angular.module('Feed.Utilities')
            .service('LoadingBarUtility', LoadingBarUtility);
    })(Utilities = Feed.Utilities || (Feed.Utilities = {}));
})(Feed || (Feed = {}));
