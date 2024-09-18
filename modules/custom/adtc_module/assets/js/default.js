(function ($) {

  $('#addressSelect').change(function () {
    var filterString = $(this).val();
    var [address, city] = filterString.split('-');

    $.ajax({
      url: 'http://localhost/Site-ADTC/api/v1/membros/all',
      method: 'GET',
      success: function (response) {
        // Filtra os dados com base no address e city extraídos
        var filteredData = response.filter(function (item) {
          return item.endereco.address === address && item.endereco.city === city;
        });

        var $congregationSelect = $('#congregation'); // Selecione o select onde as opções serão adicionadas
        $congregationSelect.empty(); // Limpe as opções existentes

        if (filteredData.length > 0) {
          // Usar um Set para garantir que os valores sejam únicos
          var uniqueCongregations = new Set();

          filteredData.forEach(function (item) {
            uniqueCongregations.add(item.nome_da_congregacao);
          });

          // Adicionar opções únicas ao select
          uniqueCongregations.forEach(function (congregation) {
            $congregationSelect.append($('<option>').text(congregation).val(congregation));
          });
        } else {
          console.log('No matching data found.');
        }
      },
      error: function (xhr, status, error) {
        console.log('Erro:', status, error);
      }
    });


  });


  // Evento de clique para o botão de filtro
// Evento de clique para o botão de filtro
$('.btn-where-find').on('click', function (event) {
  event.preventDefault(); // Impede o envio do formulário
  
  var filterString = $('#addressSelect').val();
  var [address, city] = filterString.split('-');
  var congregation = $('#congregation').val();

  // Faz a requisição AJAX
  $.ajax({
    url: 'http://localhost/Site-ADTC/api/v1/membros/all',
    method: 'GET',
    success: function (response) {
      // Filtra os dados com base no address, city e congregation
      var filteredData = response.filter(function (item) {
        return item.endereco.address === address && item.endereco.city === city && item.nome_da_congregacao === congregation;
      });

      // Oculta o conteúdo inicial
      $('#initial-content').css('display', 'none');

      // Gera o HTML dinamicamente
      var htmlContent = '<div id="filter-content" class="row">';
      
      filteredData.forEach(function (item) {
        htmlContent += `
          <div class="col-md-4">
            <h4 class="name-member"><b>${item.nome_do_membro}</b></h4>
            <p>Email: ${item.email}</p>
            <p>Endereço: ${item.endereco.address} - ${item.endereco.city}</p>
            <p>CPF: ${item.cpf}</p>
            <p>Nome do Administrador: ${item.nome_do_administrador}</p>
            <p>Nome da Congregação: ${item.nome_da_congregacao}</p>`;
        
        if (item.imagem) {
          htmlContent += `<p><img src="${item.imagem}" alt="Imagem do Membro"></p>`;
        }

        htmlContent += `</div>`;
      });

      htmlContent += '</div>';

      // Insere o conteúdo gerado no DOM
      $('#filter-content').html(htmlContent);
    },
    error: function (xhr, status, error) {
      console.log('Erro:', status, error);
    }
  });
});

// Evento de clique para o botão de limpar filtro
$('.btn-clear-filter').on('click', function () {
  // Exibe o conteúdo inicial
  $('#initial-content').css('display', 'block');

  // Limpa o conteúdo filtrado
  $('#filter-content').empty();

  // Reseta o select e outros valores
  $('#addressSelect').val('');
  $('#congregation').val('');
});

  

})(jQuery);
