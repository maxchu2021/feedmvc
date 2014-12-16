$(function() {
  'use strict';

  $("header").headroom();

  $('.add-feed-button').click(function ( event ) {
    event.preventDefault();

    $('.add-form form').show();
  });

  $('button[name=cancel]').click(function ( event ) {
      event.preventDefault();

      $('form[name=add-feed]')[0].reset();
      $('.add-form form').hide();
  });

  $(document).on( "mouseover", "nav ul.menu li", function () {
    $(this).children('.delete-feed').show();
  });

  $(document).on( "mouseout", "nav ul.menu li", function () {
    $(this).children('.delete-feed').hide();
  });
});
