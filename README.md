# ASSIGNMENT-APP (MBDS_Madagascar2021_G23Frontend)

## Informations générales  
ASSIGNMENT-APP est une application de gestion de devoirs d'une école.  
L'administrateur pourra donc consulter, ajouter, modifier, faire des recherches et voir les détails des devoirs.  
Il peut aussi voir les élèves avec leur moyenne et leur nombre de devoirs rendus et également consulter les matières avec les professeurs correspondants.  
ASSIGNMENT-APP est une application de type MEAN et le code contenu dans ce lien github est le côté FRONTEND de l'application.

## Lancement du projet     
Comme le projet est déjà deployé, il suffit d'utiliser ce lien pour lancer l'application: [https://mbdsmadagascar2021g23frontend.herokuapp.com](https://mbdsmadagascar2021g23frontend.herokuapp.com).  

Et si vous voulez lancer le projet en local, il faut:
- Télécharger le code source du projet
- Ouvrir le code source dans un éditeur de texte (Visual Studio Code comme par exemple)
- Installer NodeJs et mettre à jour le npm
- Ouvrir un terminal dans le chemin `/MBDS_Madagascar2021_G23Frontend-master/`
- Faire un `npm install`
- Faire un `ng serve`
- Si tout se passe bien, il va indiqué qu'on peut ouvrir notre navigateur et executer http://localhost:4200/ qui va afficher une page de login

Le login est: Rilah / rilahmdp   

## Auteur    
L'application a été conçue par le groupe 23 composé de:
- MIHARINIAINA Andriamihanta Rilah Mario    n°12  
- RAMIANDRISOA Rindra Ny Aina               n°34

## Fonctionnalités    
Les fonctionnalités développées sont:  
1. Login avec JSON Web Tokens (JWT): si les données entrées sont fausses, on revient sur la page de login avec un message d'erreur.  
2. L'ajout de nouvelles propriétés au modèle des Devoirs:
- Auteur (nom de l'élève, mail, dateNaissance, photo)
- Matière (nom, photoMatiere, professeur, photoProfesseur)
- Note sur 20
- Remarque 
- Nom du devoir 
3. Améliorations de l'affichage des devoirs
- Affichage de chaque devoir sous forme de Material Card
- La vue détails du devoir qui montrera en plus la note s'il a été rendu, sa mention selon sa note et la remarque
- Les formulaires d'ajout, de modification et de détails d'un devoir proposeront un choix fixe de matière et associeront automatiquement le professeur avec son image.
4. L'affichage des devoirs rendus et non rendus est séparée
- Lorsqu'on met une note à un devoir, il devient rendu et apparaitra dans l'onglet "Rendu"
5. Amélioration du design:
- Login
- Ajout header, footer et menu à gauche
- Scroll infini de la liste des devoirs
- Ajouter des photos pour chaque élève et les mettre dans un Material Card 
- Ajouter une photo pour la matière et pour le professeur
6. Ajout de 500 devoirs dans la base de données
7. Ajout du menu aide qui indique des liens qui nous ont aidé pour la réalisation du projet
8. Hébergement sur Heroku

## Fonctionnalités en plus    
En dehors des fonctionnalités demandées, le groupe 23 a ajouté d'autres fonctionnalités:
1. Le Bar Chart dans la liste des devoirs rendus et non rendus pour montrer d'une façon graphique le nombre de devoirs rendus / non rendus pour chaque élève
2. La recherche de devoir selon le nom de l'élève, le nom de la matière, le nom du professeur ou le nom du devoir
3. Le nombre de devoir rendus et la moyenne de chaque élève
4. Ajout de messages de notification (SnackBar Material) pour l'ajout et la modification d'un devoir
5. Création des collections d'élèves et de matières
6. Dans l'ajout, la modification et le détails du devoir, lorsqu'on clique sur un nom d'un élève, la photo de l'élève se change automatiquement