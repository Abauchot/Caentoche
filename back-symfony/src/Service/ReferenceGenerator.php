<?php
namespace App\Service;

use App\Repository\OrderRepository;

class ReferenceGenerator
{
    public function __construct(
        private readonly OrderRepository $orderRepository
    ) {}

    public function generateOrderReference(): string
    {
        $today = (new \DateTimeImmutable())->format('Ymd');
        $count = $this->orderRepository->countOrdersForToday();
        return sprintf('ORD-%s-%06d', $today, $count + 1);
    }
    public function generateInvoiceReference(): string
    {
	   $today = (new \DateTimeImmutable())->format('Ymd');
	   $count = $this->orderRepository->countInvoicesForToday();
	   return sprintf('INV-%s-%06d', $today, $count + 1);
    }
}
