# Creatiview Shop

Creatiview shop est un projet d'e-shop personnalisé et configurable.

## Ma motivation
Un client est venu vers moi en me demandant un e-shop personnalisé. Naturellement, je l'ai redirigé vers des solutions existantes comme Shopify ou Wix.

Après un premier aperçu, ces solutions ne lui convenaient pas. Il avait des besoins spécifiques et demandait une solution sur mesure.

C'est alors que je me suis demandé "Si je développe cette solution couteuse en temps pour ce client, pourquoi ne pas réfléchir pour la rentabiliser avec d'autres clients ?"

Et Creatiview Shop est né.

## Comment j'ai construit le projet
J'ai utilisé une stack classique:
- Vue.js et la librairie Vuetify en front-end. Cela me permet d'avoir une application dynamique, performante et bien structurée. Vuetify m'a fait gagner du temps dans l'UX experience.
- Node.js et Express framework en back-end. Il est très simple de déployer un serveur Node.js et cela permet de garder le même language Typescript dans toute l'application.
- PostgreSQL comme base de données relationnelle et un bucket AWS S3 pour toutes les données non-structurées concernant le stockage.

## Comment j'ai sécurisé le projet
Concernant l'authentification, j'utilise actuellement un user / password classique où le mot de passe est hashé avec l'algorithme bcrypt auquel j'ajoute un random salt. Lors du login, le client reçoit un JWT qui est stocké en 2 parties dans les cookies du navigateur. La signature du JWT se trouve dans un cookie http-only, secure et same-site afin d'éviter au maximum tout vol ou altération de la valeur.

Le token a une durée de vie maximum de 24h et est renouvelé lors de chaque requête. Si des problèmes de performances venaient a être constatés à ce niveau, j'utiliserai alors la date d'expiration pour renouveler le token moins régulièrement.

Conernant les autorisations, l'utilisateur va appartenir à un ensemble de groupe où chaque groupe va lui donner un accès à plusieurs endpoints. Si je souhaite protéger l'accès d'un endpoint à un certain groupe, comme les admins, j'ai juste à ajouter un middleware de vérification d'accès au groupe au niveau de mon point d'entrée.

Pour me protéger des bots, je peux déjà faire confiance à mon fournisseur Heroku qui met en place certaines limitations, notamment au niveau de la couche de transport.

Au niveau de la couche applicative, j'ai mis en place Google Recaptcha V3 afin de protéger certains de mes endpoints contre des ajouts massifs venant d'un bot. J'ai également utilisé un rate-limiter afin d'éviter qu'un client ne puisse réaliser trop de requêtes en un court laps de temps.

## Comment je gère plusieurs sites sur le même serveur
Au niveau de ma base de données, j'ai une table reprenant mes clients ainsi qu'un nom DNS associé.

Mes autres tables (users, products, newsletters, ...) font référence à cette table client. Cela me permet d'isoler les données de chaque client malgré qu'elles se trouvent dans une base de données unique.

Si je souhaite ajouter un nouveau client, j'ai juste à louer son nom de domaine et réaliser une redirection vers mon serveur Node.

Sur le serveur Node, il y a un middleware qui va récupérer le client sur base du nom de domaine.
