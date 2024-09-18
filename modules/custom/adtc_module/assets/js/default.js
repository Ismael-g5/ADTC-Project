(function ($) {
  $.ajax({
    url: 'http://localhost/Site-ADTC/api/v1/membros/all',
    method: 'GET',
    success: function(response) {
      // Suponha que você queira filtrar no lado do cliente
      var filteredData = response.filter(function(item) {
        return item.nome_do_membro === 'Ismael'; // Filtro de exemplo
      });

      console.log('Filtered Data:', filteredData);
    },
    error: function(xhr, status, error) {
      console.log('Erro:', status, error);
    }
  });
})(jQuery);
