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
          // Adicione uma opção padrão
          //$congregationSelect.append($('<option>').text('Select Congregation').val(''));
          
          // Adicione uma opção para cada nome_da_congregacao
          filteredData.forEach(function (item) {
            $congregationSelect.append($('<option>').text(item.nome_da_congregacao).val(item.nome_da_congregacao));
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

})(jQuery);
