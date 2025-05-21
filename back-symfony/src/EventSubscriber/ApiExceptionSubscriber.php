<?php

namespace App\EventSubscriber;

use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class ApiExceptionSubscriber implements EventSubscriberInterface
{
	public static function getSubscribedEvents(): array
	{
		return [
			'kernel.exception' => 'onKernelException',
		];
	}

	public function onKernelException(ExceptionEvent $event): void
	{
		$exception = $event->getThrowable();

		if ($exception instanceof UnprocessableEntityHttpException) {
			$response = new JsonResponse([
				'success' => false,
				'error' => [
					'code' => 422,
					'message' => 'Registration failed: ' . $exception->getMessage(),
					'field' => 'email'
				]
			], 422);

			$event->setResponse($response);
		}
	}
}
