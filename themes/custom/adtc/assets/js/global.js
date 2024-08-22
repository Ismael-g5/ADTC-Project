(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.default = {
    attach: function (context, settings) {
      // PAGINA ONDE ENCONTRAR


      $(".slick-carousel").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1000,
        arrows: false,
        dots: true,
      });
      //eventos do slide home
      $(".slick-prev").on("click", function () {
        $(".slick-carousel").slick("slickPrev");
      });

      $(".slick-next").on("click", function () {
        $(".slick-carousel").slick("slickNext");
      });
      

  
    },
  };
})(jQuery, Drupal);
