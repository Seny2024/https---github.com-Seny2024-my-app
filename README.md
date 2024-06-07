# MyLib

MyLib est une application complète pour la gestion de bibliothèques. Elle permet de gérer les utilisateurs, les livres et les prêts via une interface conviviale et un backend robuste, offrant ainsi une expérience utilisateur fluide et sécurisée.

## API REST

L'application MyLib fournit une API REST pour la gestion des utilisateurs, des livres et des prêts.

### API Utilisateur

- Création d'un utilisateur : `POST http://localhost:3000/api/users/`
- Authentification d'un utilisateur : `POST http://localhost:3000/api/users/login`
- Récupération d'un utilisateur : `GET http://localhost:3000/api/users/{id}`
- Mise à jour d'un utilisateur : `PUT http://localhost:3000/api/users/{id}`
- Suppression d'un utilisateur : `DELETE http://localhost:3000/api/users/{id}`

### API Livres

- Récupération de tous les livres : `GET http://localhost:3000/api/books/`
- Récupération d'un livre par son ID : `GET http://localhost:3000/api/books/{id}`
- Ajout d'un livre : `POST http://localhost:3000/api/books/`
- Mise à jour d'un livre : `PUT http://localhost:3000/api/books/{id}`
- Suppression d'un livre : `DELETE http://localhost:3000/api/books/{id}`

### API Prêts

- Récupération de tous les prêts : `GET http://localhost:3000/api/loans/`
- Récupération d'un prêt par son ID : `GET http://localhost:3000/api/loans/{id}`
- Ajout d'un prêt : `POST http://localhost:3000/api/loans/`
- Mise à jour d'un prêt : `PUT http://localhost:3000/api/loans/{id}`
- Suppression d'un prêt : `DELETE http://localhost:3000/api/loans/{id}`

## Authentification par jeton

L'application MyLib utilise une authentification par jeton pour sécuriser l'accès à ses ressources. Pour obtenir un jeton d'authentification, vous devez envoyer une requête `POST` à l'endpoint `http://localhost:3000/api/users/login` avec les informations d'identification de l'utilisateur (nom d'utilisateur et mot de passe). Le jeton d'authentification renvoyé doit ensuite être inclus dans l'en-tête `Authorization` de toutes les requêtes ultérieures à l'API.

## Validation assurée côté serveur

L'application MyLib valide toutes les données entrantes côté serveur pour garantir l'intégrité et la cohérence des données. Les erreurs de validation sont renvoyées à l'utilisateur sous la forme de messages d'erreur explicites.

## Gestion des erreurs par POP

L'application MyLib utilise une approche de gestion des erreurs inspirée du modèle POP (Problem-Oriented Policing) pour garantir une expérience utilisateur fluide et agréable. Les erreurs sont traitées de manière proactive et efficace pour minimiser leur impact sur l'utilisateur.



# MyLib - Mode d'installation

MyLib est une application SaaS (Software as a Service) hébergée dans le cloud. Vous n'avez donc pas besoin d'installer l'application sur votre ordinateur local pour l'utiliser. Il vous suffit de vous rendre sur le site web de MyLib et de créer un compte utilisateur.

## Création d'un compte utilisateur

Pour créer un compte utilisateur sur MyLib, suivez les étapes suivantes :

1. Rendez-vous sur le site web de MyLib à l'adresse suivante : [http://localhost:3001/login]
2. Cliquez sur le bouton "S'inscrire" en bas de la page de connexion.
3. Remplissez le formulaire d'inscription en fournissant les informations demandées, notamment votre nom, votre adresse e-mail et un mot de passe.
4. Cliquez sur le bouton "Créer un compte" pour soumettre le formulaire.
6. Une fois votre compte créé, authenfiez vous en vous connectant

## Configuration de l'application

Une fois que vous avez créé un compte utilisateur et que vous vous êtes connecté à l'application, vous pouvez commencer à configurer votre bibliothèque. Suivez les étapes suivantes pour ajouter des livres et des utilisateurs à votre bibliothèque :

1. Cliquez sur le bouton "Ajouter un livre" dans la barre de navigation pour ajouter un nouveau livre à votre bibliothèque. Remplissez le formulaire en fournissant les informations demandées, notamment le titre, l'auteur et la date de publication. Cliquez sur le bouton "Enregistrer" pour ajouter le livre à votre bibliothèque.
2. Cliquez sur le bouton "Ajouter un utilisateur" dans la barre de navigation pour ajouter un nouvel utilisateur à votre bibliothèque. Remplissez le formulaire en fournissant les informations demandées, notamment le nom, l'adresse e-mail et le mot de passe. Cliquez sur le bouton "Enregistrer" pour ajouter l'utilisateur à votre bibliothèque.
3. Vous pouvez également gérer les prêts de livres en cliquant sur le bouton "Prêts" dans la barre de navigation. Vous pouvez ajouter un nouveau prêt en sélectionnant un livre et un utilisateur, et en fournissant une date de retour prévue. Vous pouvez également afficher la liste des prêts en cours et des prêts passés.

## Support technique

Si vous rencontrez des difficultés pour utiliser l'application MyLib, n'hésitez pas à contacter notre équipe de support technique. Vous pouvez nous envoyer un e-mail à l'adresse suivante : [nitiema24@gmail.com].

Nous sommes là pour vous aider à tirer le meilleur parti de notre application, alors n'hésitez pas à nous contacter si vous avez besoin d'aide.
