/**
 * @file
 * Global utilities.
 *
 */
(function (Drupal) {

  'use strict';

  Drupal.behaviors.bootstrap_barrio_subtheme = {
    attach: function (context, settings) {

      $('.slick-carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        dots: false,
      });
      //eventos do slide home
      $('.slick-prev').on('click', function () {
        $('.slick-carousel').slick('slickPrev');
      });

      $('.slick-next').on('click', function () {
        $('.slick-carousel').slick('slickNext');
      });
    }
  };

})(jQuery, Drupal);
