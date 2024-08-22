(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.default = {
    attach: function (context, settings) {
      // Inicializa o carousel Slick
      $(".slick-carousel").slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
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

      // Animação de flip de texto
      var items = $('.text-flip-item', context);
      var currentIndex = 0;

      // Adiciona a classe active ao primeiro item após a página carregar
      items.eq(currentIndex).addClass('active');

      function flipText() {
        // Remove a classe ativa do texto atual
        items.eq(currentIndex).removeClass('active');

        // Incrementa o índice
        currentIndex = (currentIndex + 1) % items.length;

        // Adiciona a classe ativa ao próximo texto
        items.eq(currentIndex).addClass('active');
      }

      // Inicia o efeito de rolagem a cada 3 segundos
      setInterval(flipText, 2000);
    }
  };
})(jQuery, Drupal);
