(function() {
  'use strict';

  var feed = {
    add: function ( key, val ) {
      if ( !$.jStorage.get( key ) ) {
        $.jStorage.set( key, val );
      }
    },

    list: function () {
      var index = $.jStorage.index();
      var url = '';
      var html = '';

      $('nav ul.menu').html('');

      if (index.length === 0) {
        feed.add('TechCrunch', 'http://feeds.feedburner.com/TechCrunch/');
        feed.add('Gamespot', 'http://www.gamespot.com/feeds/news/');
      }

      for (var key in index) {
        url = $.jStorage.get( index[key] );
        html += "<li><a href='?feed=" + url + "' data-url='" + url + "' class='feed'>" + index[key] + "</a>";
        html += "<button class='delete-feed' data-key='" + index[key] + "'>x</button>";
      }

      $('nav ul.menu').append( html );
    },

    remove: function ( key ) {
      $.jStorage.deleteKey( key );
    },

    fetch: function ( url ) {
      $.getJSON( "../../server/get_feed.php?url=" + url, function( data ) {
        var items = [];
        var html = '';

        $('.items').html('');

        $.each( data, function( key, val ) {
          html = "<li>" +
            "<div class='item'>" +
            "<a href='" + val['link'] + "' title='" + val['title'] + "' target='_blank'>";

          if ( val['cover'] ) {
            html += "<div class='cover-outer'><div style='background-image:url(" + val['cover'] + ")' class='cover'></div></div>";
            html += "<div class='title'>";
          } else {
            html += "<div class='title solo'>";
          }

          html += "<h2>" + val['title'] + "</h2>" +
            "<div class='description'>" + val['description'] + "</div>" +
            "</div>" +
            "</a>" +
            "</div>" +
            "</li>";
          items.push( html );
        });

        $( "<ul/>", {
          html: items.join( "" )
        }).appendTo( ".items" );
      });
    }
  }

  window.feed = feed;

})();
