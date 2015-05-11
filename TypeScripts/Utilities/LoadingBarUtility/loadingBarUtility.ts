/// <reference path="../../../Scripts/typings/angularjs/angular.d.ts"/>

module Feed.Utilities {
    //// 載入進度條
    export class LoadingBarUtility {
        static $inject = ['$rootScope', '$log', 'cfpLoadingBar'];

        constructor(
            private $rootScope,
            private $log: ng.ILogService,
            private cfpLoadingBar) {
        }

        //// 啟用載入進度
        EnableLoadingBar() {
            this.$rootScope.IsStillLoading = true;
            this.$rootScope.$on('loadingBar:start', () => {
                this.cfpLoadingBar.start();
            });

            this.$rootScope.$on('loadingBar:finish', () => {
                this.$rootScope.IsStillLoading = false;
                this.cfpLoadingBar.complete();
            });
        }

        //// 開始（顯示）載入進度
        ShowLoadingBar() {
            this.$rootScope.$emit('loadingBar:start');
        }

        //// 完成（隱藏）載入進度
        HideLoadingBar() {
            this.$rootScope.$emit('loadingBar:finish');
        }
    }

    angular.module('Feed.Utilities')
        .service('LoadingBarUtility', LoadingBarUtility);
}
