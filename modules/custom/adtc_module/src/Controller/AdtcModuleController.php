<?php

namespace Drupal\adtc_module\Controller;

use Drupal\Core\Controller\ControllerBase;

class AdtcModuleController extends ControllerBase {

  public function index() {
    // Aqui você pode adicionar o conteúdo dinâmico.
    $output = [
      '#markup' => $this->t('Olá, este é o conteúdo da minha página customizada!'),
    ];
    return $output;
  }

}
