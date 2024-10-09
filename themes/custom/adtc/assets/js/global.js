(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.default = {
    attach: function (context, settings) {
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

      $(".slick-prev").on("click", function () {
        $(".slick-carousel").slick("slickPrev");
      });

      $(".slick-next").on("click", function () {
        $(".slick-carousel").slick("slickNext");
      });

      // Captura os atributos data do elemento biblia-passage
      var book = $(".biblia-passage").attr("data-book");
      var cap = $(".biblia-passage").attr("data-cap");
      var verseString = $(".biblia-passage").attr("data-verse");

      // Inicializa o intervalo de versículos
      var verseRange = null;

      // Verifica se verseString está definido e não está vazio
      if (verseString) {
        // Divide o intervalo de versículos, caso exista
        verseRange = verseString.split('-').map(Number);
      }

      // Requisição AJAX para a API
      $.ajax({
        url: "https://www.abibliadigital.com.br/api/verses/nvi/" + book + "/" + cap,
        method: "GET",
        success: function (response) {
          // Adiciona log para verificar a estrutura do response
          //console.log("Response da API:", response);

          var bookName = response.book.name;
  

          // Verifica se a resposta possui os versículos
          if (response.verses && response.verses.length > 0) {
            var content = '';

            // Filtra os versículos com base no intervalo definido
            response.verses.forEach(function (passage) {
              var number = passage.number;
              var text = passage.text;

              // Adiciona apenas os versículos do intervalo desejado
              if (!verseRange || (verseRange.length === 1 && number === verseRange[0]) || 
                  (verseRange.length === 2 && number >= verseRange[0] && number <= verseRange[1])) {
                var cleanContent = text.replace(/<\/?[^>]+(>|$)/g, "") // Remove tags HTML
                                        .replace(/\s*\d+\s*/g, "");    // Remove números de versículos

                content += "<em>" + cleanContent + "</em><br>"; // Adiciona cada passagem com duas quebras de linha
              } else {
                console.log("Versículo ignorado:", number); // Log para versículos ignorados
              }
            });

            // Verifica se o conteúdo excede 500 caracteres
            if (content.length > 500) {
              content = content.substring(0, 500) + "..."; // Trunca o conteúdo e adiciona "..."
            }

            $(".book-name").html(bookName);
            // Insere o conteúdo na div biblia-passage
            if (content) {
              $(".biblia-passage").html(content);
            } else {
              $(".biblia-passage").html("<p>Nenhum versículo encontrado no intervalo especificado.</p>");
            }
          } else {
            $(".biblia-passage").html("<p>Nenhum versículo encontrado.</p>");
          }
        },
        error: function (error) {
          console.log("Erro na requisição:", error);
          $(".biblia-passage").html("<p>Erro ao carregar versículos.</p>");
        }
      });
    }
  };
})(jQuery, Drupal);
