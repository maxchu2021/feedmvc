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
      isMobileMenuOn: false,
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
      toggleMobileMenu: function() {
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
        self.feeds = null;
        self.feedTitle = 'loading...';
        fetch('../../server/get_feed.php?url=' + url)
          .then(function(response) {
            return response.json();
          })
          .then(function(response) {
            self.feeds = response;
            self.feedTitle = name;
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },

    created () {
      if (window.innerWidth > 1200) this.isMobileMenuOn = true;

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

      this.getFeed(this.items[0].name, this.items[0].url);
    }
  });
})(window);
