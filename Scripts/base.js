$(function() {
  'use strict';

  $('header').headroom();

  $(document).on('mouseover', 'nav ul.menu li', function () {
    $(this).children('.delete-feed').show();
  });

  $(document).on('mouseout', 'nav ul.menu li', function () {
    $(this).children('.delete-feed').hide();
  });
});
