+++
title = "SQL"
author = ["TRNEEDANAME"]
date = 2025-10-12
layout = "page"
tags = ["fiches", "sql"]
draft = false
+++

Le SQL est un language de requète de base de données.

<!--more-->


## Le SQL c'est quoi ? {#le-sql-c-est-quoi}

> [!INFO]
> Le `Structured Query Language` est un langage de `requète` de bases de données, chaque requête est exécuté à la suite.
> 

> [!MEMO] Convention
> En SQL on utilise le [Snake Case](https://fr.wikipedia.org/wiki/Snake_case), les objets sont au singulier, exemple :
> 
> Les tables descriptives sont plus faciles à comprendre, les colonnes doivent être lisibles :
> `date_achat` et non `dt_achat` !
> 
>> [!IMPORTANT]
>> Chaque ordre d'une requète sur sa propre ligne !
>> 
>>> [!CODE] sql
>>>  ```sql
>>>  CREATE TABLE IF NOT EXISTS utilisateur(
>>>         id INTEGER PRIMARY KEY,
>>>         nom TEXT,
>>>         dateNaissance DATE,
>>>         villeNaissance TEXT
>>>  );
>>>  INSERT INTO utilisateur (nom,
>>>                          dateNaissance,
>>>                          villeNaissance)
>>>  VALUES ("Jean", '2000-01-01', "Lille"),
>>>         ("François", '1980-05-07', "Roubaix");
>>>  -- A ne pas faire !
>>>  SELECT * FROM utilisateur WHERE dateNaissance > '1990-01-01';
>>>  -- A faire !
>>>  SELECT *
>>>  FROM utilisateur
>>>  WHERE dateNaissance > '1990-01-01';
>>> ```
>
> Les conventions sont définies par la norme [ISO/IEC 9075](https://www.iso.org/standard/76583.html).


## Les requètes simples {#les-requètes-simples}


### SELECT {#select}

Permet de sélectionner des valeurs dans une table.

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS utilisateur(
>         id INTEGER PRIMARY KEY,
>         nom TEXT,
>         dateNaissance DATE,
>         villeNaissance TEXT
>  );
>  INSERT INTO utilisateur (nom,
>                          dateNaissance,
>                          villeNaissance)
>  VALUES ("Jean", '2000-01-01', "Lille"),
>         ("François", '1980-05-07', "Roubaix"),
>         ("Thomas", '1990-01-01', "Paris");
>  SELECT *
>  FROM utilisateur;
> ```


### WHERE {#where}

Filtre les résultats selon une condition.

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS utilisateur(
>         id INTEGER PRIMARY KEY,
>         nom TEXT,
>         dateNaissance DATE,
>         villeNaissance TEXT
>  );
>  INSERT INTO utilisateur (nom,
>                          dateNaissance,
>                          villeNaissance)
>  VALUES ("Jean", '2000-01-01', "Lille"),
>         ("François", '1980-05-07', "Roubaix"),
>         ("Thomas", '1990-01-01', "Paris");
>  SELECT *
>  FROM utilisateur
>  WHERE dateNaissance > '1990-01-01';
> ```

Il est possible d'utiliser les opérateurs `>`, `<`, `<=` et `>=`.


### BETWEEN {#between}

Permet de filtrer des valeurs comprises dans un intervalle.

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS utilisateur(
>         id INTEGER PRIMARY KEY,
>         nom TEXT,
>         dateNaissance DATE,
>         villeNaissance TEXT
>  );
>  INSERT INTO utilisateur (nom,
>                          dateNaissance,
>                          villeNaissance)
>  VALUES ("Jean", '2000-01-01', "Lille"),
>         ("François", '1980-05-07', "Roubaix"),
>         ("Thomas", '1990-01-01', "Paris");
>  SELECT *
>  FROM utilisateur
>  WHERE dateNaissance BETWEEN '1980-01-01' AND '2000-12-31';
> ```
> 

> [!INFO]
> `BETWEEN` inclut les bornes : ici, les utilisateurs nés le 1er janvier 1980 et le 31 décembre 2000 seront inclus.


### LIKE {#like}

`LIKE` permet de rechercher des valeurs partiellement correspondantes.

-   `%` : zéro ou plusieurs caractères
-   `_` : un seul caractère

<!--listend-->

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS utilisateur(
>         id INTEGER PRIMARY KEY,
>         nom TEXT,
>         dateNaissance DATE,
>         villeNaissance TEXT
>  );
>  INSERT INTO utilisateur (nom,
>                          dateNaissance,
>                          villeNaissance)
>  VALUES ("Jean", '2000-01-01', "Lille"),
>         ("François", '1980-05-07', "Roubaix"),
>         ("Thomas", '1990-01-01', "Paris");
>  SELECT *
>  FROM utilisateur
>  WHERE nom LIKE '%J%';
> ```

Cherche ici tous les utilisateurs dont le nom contient la lettre “J”.


## Fonctions d’agrégation {#fonctions-d-agrégation}

Les fonctions d’agrégation permettent de calculer des valeurs globales à partir de plusieurs lignes.


### COUNT {#count}

Compte le nombre d'éléments.

> [!INFO]- A voir
> On utilise des `'` et non des `"` car SQL peut interprété `table` comme une commande.
> 

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS produit(
>          id SERIAL PRIMARY KEY,
>          nom TEXT,
>          type_produit TEXT
>  );
>  INSERT INTO produit (nom, type_produit)
>  VALUES ('table', 'jardin'),
>         ('chaise', 'jardin'),
>         ('lampe', 'chambre'),
>         ('parasol', 'jardin');
>  SELECT COUNT(*) AS 'Quantité',
>         type_produit AS 'Type'
>  FROM produit
>  GROUP BY type_produit, type_produit;
> ```


### AVG {#avg}

Calcule la moyenne d'une colonne.

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS course (
>      id SERIAL PRIMARY KEY,
>      nom_coureur TEXT,
>      nom_course TEXT,
>      temps_course DOUBLE PRECISION,
>      taille_course INTEGER
>  );
>  INSERT INTO course (nom_coureur,
>                      nom_course,
>                      temps_course,
>                      taille_course)
>  VALUES
>      ('Jean', 'course du peuplier', 32.04, 200),
>      ('Charles', 'course de la musaraigne', 10.41, 100),
>      ('Thomas', 'course du chat', 42.41, 200),
>      ('Jeanne', 'course du berger', 21.10, 200),
>      ('Marc', 'course de Lille', 15.86, 100),
>      ('Patrique', 'course de pot', 20.06, 100);
>  SELECT
>      AVG(temps_course) AS "temps moyen",
>      taille_course AS "distance"
>  FROM course
>  GROUP BY taille_course;
> ```


### MIN {#min}

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS course (
>      id SERIAL PRIMARY KEY,
>      nom_coureur TEXT,
>      nom_course TEXT,
>      temps_course DOUBLE PRECISION,
>      taille_course INTEGER
>  );
>  INSERT INTO course (nom_coureur,
>                      nom_course,
>                      temps_course,
>                      taille_course)
>  VALUES
>      ('Jean', 'course du peuplier', 32.04, 200),
>      ('Charles', 'course de la musaraigne', 10.41, 100),
>      ('Thomas', 'course du chat', 42.41, 200),
>      ('Jeanne', 'course du berger', 21.10, 200),
>      ('Marc', 'course de Lille', 15.86, 100),
>      ('Patrique', 'course de pot', 20.06, 100);
>  SELECT nom_coureur AS 'coureur',
>         taille_course AS 'taille course',
>         MIN(temps_course) AS 'temps minimum'
>  FROM course
>  GROUP BY taille_course;
> ```


### MAX {#max}

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS course (
>      id SERIAL PRIMARY KEY,
>      nom_coureur TEXT,
>      nom_course TEXT,
>      temps_course DOUBLE PRECISION,
>      taille_course INTEGER
>  );
>  INSERT INTO course (nom_coureur,
>                      nom_course,
>                      temps_course,
>                      taille_course)
>  VALUES
>      ('Jean', 'course du peuplier', 32.04, 200),
>      ('Charles', 'course de la musaraigne', 10.41, 100),
>      ('Thomas', 'course du chat', 42.41, 200),
>      ('Jeanne', 'course du berger', 21.10, 200),
>      ('Marc', 'course de Lille', 15.86, 100),
>      ('Patrique', 'course de pot', 20.06, 100);
>  SELECT nom_coureur AS 'coureur',
>         taille_course AS 'taille course',
>         MAX(temps_course) AS 'temps maxiumum'
>  FROM course
>  GROUP BY taille_course;
> ```
> 

> [!INFO]
> La clause `GROUP BY` permet de regrouper les lignes selon une colonne, pour appliquer des fonctions d’agrégation sur chaque groupe.


### SUM {#sum}

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS produit (
>      id INTEGER PRIMARY KEY,
>      nom TEXT,
>      nombre_produit INTEGER,
>      type_produit TEXT
>  );
>  INSERT INTO produit (nom, nombre_produit, type_produit)
>  VALUES  ('Baguette', 10, "aliment"),
>          ('Chaise', 5, "objet"),
>          ('Banane', 25, "aliment"),
>          ('Tasse', 8, "aliment");
>  SELECT type_produit AS 'type de produit',
>          SUM(nombre_produit) AS 'nombre de produit'
>  FROM produit
>  GROUP BY type_produit;
> ```


### ORDER BY {#order-by}

`ORDER BY` permet de trier les résultats.

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS utilisateur(
>         id INTEGER PRIMARY KEY,
>         nom TEXT,
>         dateNaissance DATE,
>         villeNaissance TEXT
>  );
>  INSERT INTO utilisateur (nom, dateNaissance, villeNaissance)
>  VALUES ("Jean", '2000-01-01', "Lille"),
>         ("François", '1980-05-07', "Roubaix"),
>         ("Thomas", '1990-01-01', "Paris");
>  SELECT *
>  FROM utilisateur
>  ORDER BY dateNaissance DESC;
> ```

-   `DESC` : ordre décroissant
-   `ASC` (par défaut) : ordre croissant


## Modification et suppression {#modification-et-suppression}


### INSERT INTO {#insert-into}

Ajoute une ou plusieurs lignes dans une table.

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS utilisateur(
>         id INTEGER PRIMARY KEY,
>         nom TEXT,
>         dateNaissance DATE,
>         villeNaissance TEXT
>  );
>  INSERT INTO utilisateur (nom,
>                          dateNaissance,
>                          villeNaissance)
>  VALUES ('Lucie', '1995-09-12', 'Marseille'),
>         ('Paul', '1988-03-22', 'Lyon');
>  SELECT *
>  FROM utilisateur;
> ```
> 

> [!INFO]
> Il est possible d’insérer plusieurs lignes à la fois avec une seule commande.


### UPDATE {#update}

Modifie des valeurs existantes.

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS utilisateur(
>         id INTEGER PRIMARY KEY,
>         nom TEXT,
>         dateNaissance DATE,
>         villeNaissance TEXT
>  );
>  INSERT INTO utilisateur (nom,
>                          dateNaissance,
>                          villeNaissance)
>  VALUES ("Jean", '2000-01-01', "Lille"),
>         ("François", '1980-05-07', "Roubaix"),
>         ("Thomas", '1990-01-01', "Paris");
>  UPDATE utilisateur
>  SET villeNaissance = 'Bordeaux'
>  WHERE nom = 'Jean';
>  SELECT *
>  FROM utilisateur;
> ```
> 

> [!IMPORTANT]
> Toujours utiliser une clause `WHERE`, sinon toutes les lignes seront modifiées.


### DELETE {#delete}

Supprime des lignes de la table.

> [!CAUTION] Attention
> Il est recommandé de faire un `SELECT` avant de faire un `DELETE`. Il est aussi possible de faire une `TRANSACTION`
> 
>> [!CODE] sql
>>  ```sql
>>  CREATE TABLE IF NOT EXISTS utilisateur(
>>         id INTEGER PRIMARY KEY,
>>         nom TEXT,
>>         dateNaissance DATE,
>>         villeNaissance TEXT
>>  );
>>  INSERT INTO utilisateur (nom,
>>                          dateNaissance,
>>                          villeNaissance)
>>  VALUES ("Jean", '2000-01-01', "Lille"),
>>         ("François", '1980-05-07', "Roubaix"),
>>         ("Thomas", '1990-01-01', "Paris");
>>  BEGIN TRANSACTION;
>>  DELETE FROM utilisateur
>>  WHERE nom = 'Jean';
>>  ROLLBACK;
>>  SELECT *
>>  FROM utilisateur;
>> ```
>> 
> Aucun changement de la base !

-   Supprime l’utilisateur “François”
-   La deuxième requête affiche la table mise à jour

<!--listend-->

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS utilisateur(
>         id INTEGER PRIMARY KEY,
>         nom TEXT,
>         dateNaissance DATE,
>         villeNaissance TEXT
>  );
>  INSERT INTO utilisateur (nom,
>                          dateNaissance,
>                          villeNaissance)
>  VALUES ("Jean", '2000-01-01', "Lille"),
>         ("François", '1980-05-07', "Roubaix"),
>         ("Thomas", '1990-01-01', "Paris");
>  DELETE FROM utilisateur
>  WHERE nom = 'François';
>  SELECT *
>  FROM utilisateur;
> ```


## Les jointures {#les-jointures}

> [!INFO]
> Les jointures servent à relier les données de plusieurs tables grâce à des colonnes communes (souvent des identifiants).


### INNER JOIN {#inner-join}

On retourne seulement les lignes correspondantes dans les deux tables

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS utilisateur(
>      id INTEGER PRIMARY KEY,
>      nom TEXT
>  );
>  CREATE TABLE IF NOT EXISTS commande(
>      id INTEGER PRIMARY KEY,
>      utilisateur_id INTEGER,
>      produit TEXT,
>      nombre_produit INTERGER,
>      FOREIGN KEY(utilisateur_id) REFERENCES utilisateur(id)
>  );
>  INSERT INTO utilisateur (nom)
>  VALUES ('Jean'), ('François'), ("Thomas");
>  INSERT INTO commande (utilisateur_id, produit, nombre_produit)
>  VALUES (1, 'Chaise', 4), (2, 'Table', 1);
>  -- INNER JOIN : uniquement les utilisateurs ayant une commande
>  SELECT u.nom, c.produit, c.nombre_produit
>  FROM utilisateur AS u
>  INNER JOIN commande AS c ON c.utilisateur_id = u.id;
> ```


### LEFT JOIN {#left-join}

On retourne toutes les lignes de la table de gauche et droite qui correspondent.

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS utilisateur(
>      id INTEGER PRIMARY KEY,
>      nom TEXT
>  );
>  CREATE TABLE IF NOT EXISTS commande(
>      id INTEGER PRIMARY KEY,
>      utilisateur_id INTEGER,
>      produit TEXT,
>      nombre_produit INTERGER,
>      FOREIGN KEY(utilisateur_id) REFERENCES utilisateur(id)
>  );
>  INSERT INTO utilisateur (nom)
>  VALUES ('Jean'), ('François'), ("Thomas");
>  INSERT INTO commande (utilisateur_id, produit, nombre_produit)
>  VALUES (1, 'Chaise', 4), (2, 'Table', 1);
>  SELECT u.nom, c.produit
>  FROM utilisateur AS u
>  LEFT JOIN commande AS c ON c.utilisateur_id = u.id;
> ```


### RIGHT JOIN {#right-join}

On retourne toutes les lignes de la table de droite.

> [!CODE] sql
>  ```sql
>  CREATE TABLE IF NOT EXISTS utilisateur(
>      id INTEGER PRIMARY KEY,
>      nom TEXT
>  );
>  CREATE TABLE IF NOT EXISTS commande(
>      id INTEGER PRIMARY KEY,
>      utilisateur_id INTEGER,
>      produit TEXT,
>      nombre_produit INTERGER,
>      FOREIGN KEY(utilisateur_id) REFERENCES utilisateur(id)
>  );
>  INSERT INTO utilisateur (nom)
>  VALUES ('Jean'), ('François'), ("Thomas");
>  INSERT INTO commande (utilisateur_id, produit, nombre_produit)
>  VALUES (1, 'Chaise', 4), (2, 'Table', 1);
>  SELECT u.nom, c.produit
>  FROM utilisateur AS u
>  RIGHT JOIN commande AS c ON c.utilisateur_id = u.id;
> ```
> 

> [!MEMO]
> Dans une jointure, utiliser des alias (ici `u` et `c`) rend le code plus lisible.
> Toujours écrire les mots-clés SQL en majuscules : `SELECT`, `FROM`, `JOIN`, `WHERE`, etc.
