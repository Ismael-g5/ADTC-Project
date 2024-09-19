<?php

namespace Drupal\adtc_module\Service;

use Drupal\Core\Database\Connection;
use Drupal\file\Entity\File;

class AdtcModuleService {

  protected $database;

  public function __construct(Connection $database) {
    $this->database = $database;
  }

  public function getContentFromDatabase() {
    $query = $this->database->select('node_field_data', 'n')
      ->fields('n', ['nid', 'title'])
      ->condition('n.type', 'sobre_nos');

    $query->leftJoin('node__field_imagem_ab', 'i', 'n.nid = i.entity_id');
    $query->fields('i', ['field_imagem_ab_target_id']);

    $results = $query->execute()->fetchAll();

    foreach ($results as $result) {
      if ($result->field_imagem_ab_target_id) {
        $file = File::load($result->field_imagem_ab_target_id);
        if ($file) {
          $result->image_url = \Drupal::service('file_url_generator')->generateAbsoluteString($file->getFileUri());
        }
      }
    }

    return $results;
  }

  public function getWebformSubmissions() {
    $webform_id = 'membros_cadastro'; // Identificador da Webform

    // Carrega todas as submissões do webform
    $submissions = \Drupal::entityTypeManager()
      ->getStorage('webform_submission')
      ->loadByProperties(['webform_id' => $webform_id]);

    $data = [];

    // Percorre cada submissão e extrai os dados
    foreach ($submissions as $submission) {
      /** @var \Drupal\webform\Entity\WebformSubmission $submission */
      $submission_data = $submission->getData();

      $data[] = [
        'nome_do_membro' => $submission_data['nome_do_membro'] ?? '',
        'email' => $submission_data['email'] ?? '',
        'endereco' => $submission_data['endereco_m'] ?? '',
        'cpf' => $submission_data['cpf'] ?? '',
        'nome_do_administrador' => $submission_data['nome_do_administrador'] ?? '',
        'nome_da_congregacao' => $submission_data['nome_da_congregacao'] ?? '',
        //'imagem' => $this->getFileUrl($submission_data['imagem'] ?? NULL),
        'imagem_membro' => $this->getFileUrl($submission_data['imagem_membro'] ?? NULL), // Adiciona o campo imagem_membro
      ];
    }

    return $data;
  }

  /**
   * Retorna a URL do arquivo se disponível.
   */
  
  // Método para gerar a URL da imagem
  protected function getFileUrl($file_id) {
    if ($file_id) {
      $file = File::load($file_id);
      if ($file) {
        return \Drupal::service('file_url_generator')->generateAbsoluteString($file->getFileUri());
      }
    }
    return NULL;
  }

}
