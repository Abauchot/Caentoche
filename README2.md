## lancer le backend

```cd back-symfony```

```docker compose up --build -d```

```composer install```

 - Regarder le nom du container docker avec la commande ```docker ps```

```docker exec -it back-symfony-web-1 bash``` Remplacer back-symfony-web-1 par le nom du container

```php bin/console doctrine:database:create```

```php bin/console doctrine:database:create```

## lancer le frontend

```cd caentoche-front```

```npm install```

```npx expo start```