<?php
// src/Controller/CreateStripeCheckoutController.php
namespace App\Controller;

use App\Entity\Order;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;
use Stripe\Stripe;
use Stripe\Checkout\Session;

final class CreateStripeCheckoutController extends AbstractController
{
    #[Route('/api/orders/{id}/checkout', name: 'order_checkout', methods: ['POST'])]
    public function __invoke(Order $order): JsonResponse
    {
        Stripe::setApiKey($_ENV['STRIPE_SECRET']);

        $session = Session::create([
            'line_items' => [[
                'price_data' => [
                    'currency' => 'eur',
                    'product_data' => ['name' => 'Order #' . $order->getReference()],
                    'unit_amount' => (int) ($order->getTotalAmount() * 100),
                ],
                'quantity' => 1,
            ]],
            'mode' => 'payment',
            'success_url' => 'https://ton-domaine.com/success',
            'cancel_url' => 'https://ton-domaine.com/cancel',
        ]);

        return $this->json(['sessionId' => $session->id]);
    }
}

