/*global Vue, feedStorage */

(function(exports) {

  'use strict';

  exports.app = new Vue({
    el: '.feedapp',

    data: {
      items: feedStorage.fetch(),
      feeds: '',
      feedTitle: '',
      newItem: {
        name: '',
        url: '',
      },
      isMobileMenuOn: true,
      isAddFeedOn: false
    },

    // watch todos change for localStorage persistence
    watch: {
      items: {
        deep: true,
        handler: feedStorage.save
      }
    },

    methods: {
      showMobileMenu: function() {
        if (this.items.length === 0) {
          this.items.push({
            name: 'TechCrunch',
            url: 'http://feeds.feedburner.com/TechCrunch/'
          });
          this.items.push({
            name: 'Gamespot',
            url: 'http://www.gamespot.com/feeds/news/'
          });
        }

        this.isMobileMenuOn = !this.isMobileMenuOn;
      },

      showAddFeed: function() {
        this.isAddFeedOn = !this.isAddFeedOn;
      },

      addFeed: function() {
        var name = this.newItem.name && this.newItem.name.trim();
        var url = this.newItem.url && this.newItem.url.trim();
        if (!name || !url) {
          return;
        }
        this.items.push({
          name: name,
          url: url
        });
        this.newItem = '';
      },

      removeFeed: function(item) {
        var index = this.items.indexOf(item);
        this.items.splice(index, 1);
      },

      getFeed: function(name, url) {
        var self = this;
        axios.get('../../server/get_feed.php?url=' + url)
          .then(function(response) {
            self.feeds = response.data;
            self.feedTitle = name;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  });
})(window);
