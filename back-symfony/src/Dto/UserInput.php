<?php

namespace App\Dto;

use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

class UserInput
{
	#[Groups(['user:write'])]
	#[Assert\NotBlank]
	#[Assert\Email(message: 'L\'adresse email {{ value }} n\'est pas valide.')]
	public string $email;

	#[Groups(['user:write'])]
	#[Assert\NotBlank]
	#[Assert\Length(
		min: 6,
		minMessage: 'Votre mot de passe doit contenir au moins {{ limit }} caractères.'
	)]
	#[Assert\Regex(
		pattern: '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/',
		message: 'Le mot de passe doit contenir au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial.'
	)]
	public string $password;

	#[Groups(['user:write'])]
	#[Assert\NotBlank]
	public string $firstName;

	#[Groups(['user:write'])]
	#[Assert\NotBlank]
	public string $username;

	#[Groups(['user:write'])]
	#[Assert\NotBlank]
	public string $lastName;
}
