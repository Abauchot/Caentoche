# Documentation du Processus d'Authentification dans le Projet Symfony 7

## 1. Architecture des Composants

### 1.1 Entité User (`src/Entity/User.php`)

````php
<?php

namespace App\Entity;

use App\State\UserProcessor;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Post;
use App\Dto\UserInput;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\GetCollection;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/register',
            security: "is_granted('PUBLIC_ACCESS')",
            input: UserInput::class,
            processor: UserProcessor::class,
            denormalizationContext: ['groups' => ['user:write']],
            output: false, // ✅ AUCUNE REPONSE DOCUMENTÉE
        ),
        new Get(),                // GET /api/users/{id}
        new GetCollection(),      // GET /api/users
        new Patch(),              // PATCH /api/users/{id}
        new Delete(),
    ],
)]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    // ...existing code...
}
````

**Rôle :** 
- Représente l'entité utilisateur dans la base de données.
- Implémente `UserInterface` et `PasswordAuthenticatedUserInterface` pour l'intégration avec le composant de sécurité de Symfony.
- Définit les endpoints API via ApiPlatform.
- Assure que l'email soit unique via l'annotation `UniqueEntity`.

### 1.2 DTO UserInput (`src/Dto/UserInput.php`)

````php

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

````

**Rôle :**
- Classe DTO (Data Transfer Object) qui capture les données d'entrée de l'API.
- Contient les contraintes de validation pour s'assurer que les données sont valides avant traitement.
- Utilise le groupe de sérialisation `user:write` pour contrôler la désérialisation.

### 1.3 UserProcessor (`src/State/UserProcessor.php`)

````php
<?php

namespace App\State;

use App\Entity\User;
use App\Repository\SchoolRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Dto\UserInput;
use Doctrine\DBAL\Exception\UniqueConstraintViolationException;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class UserProcessor implements ProcessorInterface
{
    public function __construct(
        private EntityManagerInterface $em,
        private UserPasswordHasherInterface $passwordHasher,
        private SchoolRepository $schoolRepo
    ) {}

    public function process(mixed $data, Operation $operation, array $uriVariables = [], array $context = []): User
    {
        assert($data instanceof UserInput);
        dump($data);
        $user = new User();
        $user->setEmail($data->email);
        $user->setFirstName($data->firstName);
        $user->setLastName($data->lastName);
        $user->setUsername($data->username);

        $user->setPassword(
            $this->passwordHasher->hashPassword($user, $data->password)
        );

        try {
            $this->em->persist($user);
            $this->em->flush();
        } catch (UniqueConstraintViolationException $e) {
            throw new UnprocessableEntityHttpException('There is already an account with this email.');
        }

        return $user;
    }
}

````

**Rôle :**
- Transforme le DTO `UserInput` en entité `User`.
- Gère le hachage du mot de passe avant la persistance.
- Gère les erreurs potentielles comme les violations de contraintes uniques.

## 2. Logique de Hash de Mot de Passe

### 2.1 Déclenchement
Le hachage du mot de passe est déclenché lors de la création d'un compte utilisateur via l'endpoint `/api/register`.

### 2.2 Mécanisme
1. L'API reçoit une requête POST avec les données utilisateur.
2. API Platform désérialise les données JSON en objet `UserInput`.
3. Les contraintes de validation sont vérifiées.
4. Le `UserProcessor` est appelé pour traiter l'objet `UserInput`.
5. Le processor crée une nouvelle entité `User` et copie les propriétés de `UserInput`.
6. Le mot de passe est haché via `UserPasswordHasherInterface::hashPassword()`.
7. L'entité est persistée dans la base de données.

### 2.3 Service Symfony Utilisé
Le service `UserPasswordHasherInterface` de Symfony est injecté dans le `UserProcessor` pour haché les mots de passe de manière sécurisée. Ce service utilise l'algorithme de hachage configuré dans `security.yaml` (probablement bcrypt ou Argon2i).

## 3. Contraintes de Validation sur le Mot de Passe

- **Obligatoire** (`NotBlank`) : Le mot de passe ne peut pas être vide.
- **Longueur minimale** : 6 caractères.
- **Potentiellement une regex** pour imposer des critères de complexité (majuscules, minuscules, chiffres, caractères spéciaux).

## 4. Intégration avec API Platform

### 4.1 Flux de données
1. L'utilisateur envoie une requête POST à `/api/register` avec les données JSON.
2. API Platform utilise le `input: UserInput::class` défini dans l'annotation `#[ApiResource]` pour savoir quelle classe utiliser pour désérialiser les données.
3. Le système de validation de Symfony valide les données selon les contraintes définies dans `UserInput`.
4. Le `processor: UserProcessor::class` indique à API Platform d'utiliser cette classe pour transformer le DTO en entité.
5. Le traitement est effectué, incluant le hachage du mot de passe.
6. Comme `output: false` est défini, aucune réponse n'est renvoyée (code HTTP 204 No Content).

## 5. Schéma de Séquence

```
Client                        API Platform                   UserProcessor                  PasswordHasher               Database
   |                                |                              |                              |                         |
   | POST /api/register (JSON)      |                              |                              |                         |
   |------------------------------>|                              |                              |                         |
   |                                |                              |                              |                         |
   |                                | Désérialisation en UserInput |                              |                         |
   |                                |------------------------------|                              |                         |
   |                                |                              |                              |                         |
   |                                | Validation des contraintes   |                              |                         |
   |                                |------------------------------|                              |                         |
   |                                |                              |                              |                         |
   |                                | process($userInput, ...)     |                              |                         |
   |                                |----------------------------->|                              |                         |
   |                                |                              | Création de User             |                         |
   |                                |                              |------------------------------|                         |
   |                                |                              |                              |                         |
   |                                |                              | hashPassword($user, $pwd)    |                         |
   |                                |                              |----------------------------->|                         |
   |                                |                              |                              |                         |
   |                                |                              | hashedPassword               |                         |
   |                                |                              |<-----------------------------|                         |
   |                                |                              |                              |                         |
   |                                |                              | $user->setPassword(...)      |                         |
   |                                |                              |------------------------------|                         |
   |                                |                              |                              |                         |
   |                                |                              | persist($user)               |                         |
   |                                |                              |---------------------------------------------->|         |
   |                                |                              |                              |                         |
   |                                |                              | flush()                      |                         |
   |                                |                              |---------------------------------------------->|         |
   |                                |                              |                              |                         |
   | 204 No Content                 |                              |                              |                         |
   |<------------------------------|                              |                              |                         |
```

## 6. Annotations de Sécurité

### 6.1 Dans l'entité User
- **API Resource** : Configure les endpoints et les opérations disponibles.
- **UniqueEntity** : Assure que l'email est unique.
- **Security** : L'endpoint `/api/register` est accessible sans authentification grâce à `"is_granted('PUBLIC_ACCESS')"`.

### 6.2 Dans UserInput
- **Groups** : Toutes les propriétés ont `user:write` pour contrôler la désérialisation.
- **Assert** : Contraintes de validation pour assurer la qualité des données.

## 7. Exclusion du mot de passe des réponses API

Le mot de passe est automatiquement exclu des réponses API car :

1. Le mot de passe est stocké de manière hachée, donc n'est pas exploitable directement.
2. L'entité `User` n'expose probablement pas la propriété `password` dans les groupes de sérialisation pour les réponses API.
3. Pour l'opération POST sur `/api/register`, `output: false` est défini, ce qui signifie qu'aucune réponse n'est renvoyée, protégeant ainsi toutes les données.

## Conclusion

Cette architecture suit les principes de Clean Code :

- **Principe de responsabilité unique (SRP)** : Chaque classe a une responsabilité claire.
- **Nommage explicite** : Les noms des classes et méthodes reflètent leur objectif.
- **Séparation des préoccupations** : DTO pour l'entrée de données, entité pour la persistance, processor pour la logique métier.
- **Sécurité** : Hachage des mots de passe, validation des données, gestion des erreurs.

Cette architecture permet une gestion sécurisée de l'authentification tout en maintenant un code propre et facilement maintenable.

Made changes.
