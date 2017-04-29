/*jshint unused:false */

(function (exports) {

	'use strict';

	var STORAGE_KEY = 'feeds-vuejs';

	exports.feedStorage = {
		fetch: function () {
			return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
		},
		save: function (feeds) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(feeds));
		}
	};

})(window);
