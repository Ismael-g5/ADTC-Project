<?php

namespace Drupal\adtc_module\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\adtc_module\Service\AdtcModuleService;

class AdtcModuleController extends ControllerBase {

  protected $customService;

  public function __construct(AdtcModuleService $customService) {
    $this->customService = $customService;
  }

  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('adtc_module.custom_service')
    );
  }

  public function index() {
    // Busca dados do serviço (conteúdos do tipo "sobre_nos").
    $content = $this->customService->getContentFromDatabase();

    // Renderiza os dados com o template 'index.html.twig'.
    return [
      '#theme' => 'adtc_template_custom',
      '#content' => $content,
    ];
  }

}
