<?php

namespace Drupal\adtc_module\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\adtc_module\Service\AdtcModuleService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Dompdf\Dompdf;
use Dompdf\Options;


class AdtcModuleController extends ControllerBase {

  public function index() {
    $content = \Drupal::service('adtc_module.custom_service')->getWebformSubmissions();


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


  public function generatePdf() {
    $submissions = \Drupal::service('adtc_module.custom_service')->getWebformSubmissions();

    $options = new Options();
    $options->set('defaultFont', 'DejaVu Sans');
    $options->set('isHtml5ParserEnabled', true);
    $options->set('isRemoteEnabled', true);
    $dompdf = new Dompdf($options);

    $html = '<h1>Lista de Membros</h1>';
    foreach ($submissions as $submission) {
      if ($submission['imagem_membro']) {
        $html .= '<img src="' . $submission['imagem_membro'] . '" width="150" height="150">';
      }
      $html .= '<p><strong>Nome:</strong> ' . $submission['nome_do_membro'] . '</p>';
      $html .= '<p><strong>Email:</strong> ' . $submission['email'] . '</p>';
      $html .= '<p><strong>CPF:</strong> ' . $submission['cpf'] . '</p>';
      $html .= '<p><strong>Nome da Congregação:</strong> ' . $submission['nome_da_congregacao'] . '</p>';
      $html .= '<hr>';
    }

    $dompdf->loadHtml($html);

    $dompdf->setPaper('A4', 'portrait');

    $dompdf->render();

    return new Response(
      $dompdf->output(),
      200,
      array(
        'Content-Type' => 'application/pdf',
        'Content-Disposition' => 'attachment; filename="membros.pdf"',
      )
    );
}



 

}
