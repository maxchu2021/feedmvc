$(function() {
  'use strict';

  $("header").headroom();

  // default feeds
  feed.add( "Techcrunch", "http://techcrunch.com/feed/" );
  feed.add( "Gamespot", "http://www.gamespot.com/feeds/news/" );
  
  feed.list();
  feed.fetch( "http://techcrunch.com/feed/" );

  // add feed form 
  $('.add-feed-button').click(function ( event ) {
    event.preventDefault();

    $('.add-form form').show();
  });

  $('button[name=cancel]').click(function ( event ) {
      event.preventDefault();

      $('form[name=add-feed]')[0].reset();
      $('.add-form form').hide();
  });

  $('form[name=add-feed]').submit(function ( event ) {
    event.preventDefault();

    var key = $('input[name=title]').val();
    var val = $('input[name=url]').val();

    feed.fetch(val);
    feed.add(key, val);
    feed.list();

    $('form[name=add-feed]')[0].reset();
  });

  // feed item
  $(document).on( "click", ".feed", function ( event ) {
    event.preventDefault();
    var url = $(this).data('url');
    feed.fetch(url);
  });

  // delete feed
  $(document).on( "click", ".delete-feed", function () {
    var key = $(this).data('key');

    feed.remove(key);
    feed.list();
  });

  $(document).on( "mouseover", "nav ul.menu li", function () {
    $(this).children('.delete-feed').show();
  });

  $(document).on( "mouseout", "nav ul.menu li", function () {
    $(this).children('.delete-feed').hide();
  });
});
