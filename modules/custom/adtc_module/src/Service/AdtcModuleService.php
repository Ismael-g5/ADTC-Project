<?php

namespace Drupal\adtc_module\Service;

use Drupal\Core\Database\Connection;
use Drupal\file\Entity\File;

class AdtcModuleService {

  protected $database;

  public function __construct(Connection $database) {
    $this->database = $database;
  }

  // Método para buscar conteúdos do tipo "sobre_nos", incluindo a imagem.
  public function getContentFromDatabase() {
    // Buscar nodes do tipo 'sobre_nos'.
    $query = $this->database->select('node_field_data', 'n')
      ->fields('n', ['nid', 'title'])
      ->condition('n.type', 'sobre_nos');

    // Juntar com a tabela do campo field_imagem_ab.
    $query->leftJoin('node__field_imagem_ab', 'i', 'n.nid = i.entity_id');
    $query->fields('i', ['field_imagem_ab_target_id']);

    $results = $query->execute()->fetchAll();

    // Adicionar a URL da imagem para cada resultado.
    foreach ($results as $result) {
      if ($result->field_imagem_ab_target_id) {
        $file = File::load($result->field_imagem_ab_target_id);
        if ($file) {
          // Usar o serviço de geração de URL.
          $result->image_url = \Drupal::service('file_url_generator')->generateAbsoluteString($file->getFileUri());
        }
      }
    }

    return $results;
  }

}
