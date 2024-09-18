<?php

namespace Drupal\adtc_module\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\adtc_module\Service\AdtcModuleService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;


class AdtcModuleController extends ControllerBase {

  public function index() {
    // Busca dados do serviço (conteúdos do tipo "sobre_nos").
    //$content = $this->customService->getWebformSubmissions();
    $content = \Drupal::service('adtc_module.custom_service')->getWebformSubmissions();


    // Renderiza os dados com o template 'index.html.twig'.
    return [
      '#theme' => 'adtc_template_custom',
      '#attached' => [
        'library' => [
            'adtc_module/adtc_js',
        ],
      ],
      '#content' => $content,
      
    ];
  }

  public function getAllMembros() {
    $data = \Drupal::service('adtc_module.custom_service')->getWebformSubmissions();
    return new JsonResponse($data);
  }

 

}
