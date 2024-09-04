<?php

namespace Drupal\adtc_module\Service;

use Drupal\Core\Database\Connection;

class AdtcModuleService {

  protected $database;

  public function __construct(Connection $database) {
    $this->database = $database;
  }

  // Método para buscar conteúdos do tipo "sobre_nos" no banco de dados.
  public function getContentFromDatabase() {
    // Buscar nodes do tipo 'sobre_nos'.
    $query = $this->database->select('node_field_data', 'n')
      ->fields('n', ['nid', 'title'])
      ->condition('n.type', 'sobre_nos')
      ->execute();

    // Converter o resultado em um array.
    $results = $query->fetchAll();
    return $results;
  }

}
