
# Ensemble de texhnologie utilise en tout

-Axios: pour faire des requetes cote serveur
-JSON server: service qui nous donne acces a un full rest API pour structure nos donne
-Material UI
-react hot toast est utilise pour mettre des notifications dans nos application react (c'est une librairie react)

## Serveur nécessaire

Si vous utilisez un serveur (comme JSON Server ou un serveur Express), il doit être lancé pour que votre application puisse envoyer des requêtes HTTP (GET, POST, etc.) et recevoir des réponses.

## Endpoints disponibles

Assurez-vous que les endpoints que vous essayez d'atteindre par exemple,<http://localhost:3000/utilisateurs)> sont correctement définis dans votre serveur.

## Tantasks query

    TanStack Query optimise les performances en regroupant les requêtes similaires et en évitant les appels redondants. Cela nous permet a notre appli d'etre plus performant
    il faut donc l'installer avec npm i @tanstack/react-query
    on install egalement devtools avec npm i @tanstack/react-query-devtools
    on importe donc le useQueryClien et useQuery dans le main.jsx de l'application et on met query.[EOF]