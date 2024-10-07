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

      // Requisição AJAX para API da Bíblia
      $.ajax({
        url: "https://api.scripture.api.bible/v1/bibles/d63894c8d9a7a503-01/passages?reference=Joao.3.16",
        method: "GET",
        headers: {
          "api-key": "46e0b63f37aa2b2c7ffd02b417e31019",
          "Accept": "application/json"
        },
        success: function (response) {
          if (response.data && response.data.length > 0) {
            var reference = response.data[0].reference;
            var content = response.data[0].content;

            // Remover tags HTML da passagem
            var cleanContent = content.replace(/<\/?[^>]+(>|$)/g, "");

            // Exibir a passagem bíblica no HTML
            $(".biblia-passage").html("<strong>" + reference + "</strong>: " + cleanContent);
          }
        },
        error: function (error) {
          console.log("Erro na requisição:", error);
        }
      });
    }
  };
})(jQuery, Drupal);
