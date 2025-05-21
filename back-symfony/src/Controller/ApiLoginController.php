<?php
// src/Controller/SecurityController.php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\User;
use Symfony\Component\Security\Http\Attribute\CurrentUser;

class ApiLoginController extends AbstractController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(#[CurrentUser] ?User $user, Request $request, JWTTokenManagerInterface $jwtManager, EntityManagerInterface $entityManager, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        // dump($data); // Removed

        if (!isset($data['email']) || !isset($data['password'])) {
            return new JsonResponse(['error' => 'Missing email or password'], 400);
        }

        // Find user by email
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data['email']]);
        if (!$user) {
            return new JsonResponse(['error' => 'User not found for email: ' . $data['email']], 401);
        }

        // Debug: log hashed password and input password
        // Remove or comment out in production!
        file_put_contents('/tmp/login_debug.log', "User found: " . $user->getEmail() . "\n", FILE_APPEND);
        file_put_contents('/tmp/login_debug.log', "Hashed password: " . $user->getPassword() . "\n", FILE_APPEND);
        file_put_contents('/tmp/login_debug.log', "Input password: " . $data['password'] . "\n", FILE_APPEND);

        // Verify password
        $isValid = $passwordHasher->isPasswordValid($user, $data['password']);
        file_put_contents('/tmp/login_debug.log', "Password valid: " . ($isValid ? "yes" : "no") . "\n", FILE_APPEND);

        if (!$isValid) {
            return new JsonResponse(['error' => 'Password invalid for user: ' . $data['email']], 401);
        }

        // Generate JWT token
        $token = $jwtManager->create($user);

        // Return token in response for frontend storage
        return new JsonResponse([
            'token' => $token,
        ]);
    }

    // Logout endpoint for stateless JWT (front simply discards the token)
    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): JsonResponse
    {
        return new JsonResponse(null, 204);
    }
}
