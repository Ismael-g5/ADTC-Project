(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.default = {
    attach: function (context, settings) {
      // Inicializa o carousel Slick
      $(".slick-carousel").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 850,
        arrows: false,
        dots: true,
        fade: true,
        cssEase: 'linear'
      });

      // Controles manuais do Slick
      $(".slick-prev").on("click", function () {
        $(".slick-carousel").slick("slickPrev");
      });

      $(".slick-next").on("click", function () {
        $(".slick-carousel").slick("slickNext");
      });

     
    }
  };
})(jQuery, Drupal);
