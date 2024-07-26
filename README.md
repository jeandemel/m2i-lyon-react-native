# React Native

React Native est un outil permettant de créer des applications hybrides "natives" en utilisant le framework JS/TS ReactJs.

Toute la logique React (components,useState,JSX,props,etc.) s'applique également dans React Native, la différence technique principale étant que les templates des components n'utilisera pas du HTML/CSS mais des composants React Native qui seront compilé/interprétés en composants natifs du device ciblé.

## Initialiser un projet
On peut utiliser `npx create-expo-app` pour initialiser un projet expo. Cette commande fera une application avec déjà des libraries d'installées et configurées (routing, animation, gesture, etc.) ainsi que des pages et components d'exemples pouvant être supprimer.

Pour partir d'un projet vide, on rajoutera `--template blank`.

Pour lancer le projet avec expo, on utilise un `npm start` ou `npx expo start` ce qui affichera un QR Code à scanner avec l'application Expo Go sur Android ou iOS.

Si notre PC et notre téléphone ne sont pas sur le même réseau, il faudra rajouter un `--tunnel` au bout du script "start" dans le [package.json](./package.json) ou au bout du `npx expo start --tunnel`

## Routing/Navigation

Utilisation du [Expo Router](https://docs.expo.dev/router/introduction/) pour la pagination de l'application.

Son fonctionnement est très proche du routing de Next.js : chaque "page"/écran de l'application sera représenté par un component React dont le fichier devra se trouver dans le dossier [app](./app/). Le nom des fichiers sera utilisé comme route pour pouvoir faire la navigation soit avec un `<Link href="/nom-fichier">Lien</Link>` dans le template. Soit via un `router.navigate('/nom-fichier')` (router étant importé de expo-router) si l'on souhaite faire une navigation programatique, par exemple après une action, un traitement de données ou autre.

On peut définir un fichier [app/_layout.js](app/_layout.js) qui qui permettra de définir une interface/un layout commun entre les différentes pages d'un même dossier.

## Data Fetching [page](app/data-dog.js)
La récupération des données ne diffère pas sensiblement par rapport à une application ReactJs classique. On l'effectue via une requête HTTP asynchrone (via fetch ou via une library type axios/tanstack/swr).

Une particularité à prendre en compte pour fetch des datas d'un serveur local depuis une appli mobile est qu'il faudra mettre l'ip locale de notre PC en url de fetch si les deux sont sur le même réseaux. Si ce n'est pas le cas, il faudra passer par un service de tunneling type [ngrok](https://ngrok.com/) ou déployer notre backend d'une manière ou d'une autre.

## Camera [page](app/camera.js)
Dans ce component, on utilise le [expo-camera](https://docs.expo.dev/versions/latest/sdk/camera/) qui permet d'avoir un plein contrôle sur l'utilisation de l'appareil photo du device, ce qui sera surtout utile si on veut faire sa propre interface, placer la vue de l'appareil où et comme on veut etc.

Pour une utilisation plus simple dans le cas où on souhaite juste récupérer une photo via l'appareil ou via la gallerie, utiliser plutôt le [expo-image-picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)

## Animation [page](app/animation.js)
Page dans laquelle on utilise la library [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/) qui permet de créer des animations complexes et optimisées plus simplement qu'avec l'API par défaut de React Native.

Cette library marche avec des `useSharedValue()` qui permette de créer des valeurs qui pourront directement être partager avec l'UI native du téléphone et assigner au styles des balises à animer, on utilise ensuite les fonctions d'animation (withSpring, withTiming, withRepeat, etc.) pour changer ces valeurs et créer des animations