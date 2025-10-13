+++
title = "SQL"
author = ["TRNEEDANAME"]
date = 2025-10-12
layout = "page"
tags = ["fiches", "français", "sql"]
draft = false
+++

## Le SQL c'est quoi ? {#le-sql-c-est-quoi}

> [!INFO]
> Le `Structured Query Language` est un langage de `requète` de bases de données, chaque requête est exécuté à la suite.
> 

> [!MEMO] Convention
> En SQL on utilise le [Snake Case](https://fr.wikipedia.org/wiki/Snake_case), les objets sont au singulier, exemple :
> 
>> [!CODE] sql
>>  ```sql
>>  CREATE TABLE produit (
>>      id INTEGER PRIMARY KEY,
>>      nom TEXT,
>>      prix INTEGER
>>  );
>> ```
>> 
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
>>>  INSERT INTO utilisateur (nom, dateNaissance, villeNaissance)
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


### Le `SELECT` {#le-select}

Permet de sélectionner des valeurs dans une table.

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
>  FROM utilisateur;
> ```


### Le `WHERE` {#le-where}

Filtre les résultats selon une condition.

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
>  WHERE dateNaissance > '1990-01-01';
> ```

Il est possible d'utiliser les opérateurs `>`, `<`, `<=` et `>=`.


### Le `BETWEEN` {#le-between}

Permet de filtrer des valeurs comprises dans un intervalle.

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
>  WHERE dateNaissance BETWEEN '1980-01-01' AND '2000-12-31';
> ```
> 

> [!INFO]
> `BETWEEN` inclut les bornes : ici, les utilisateurs nés le 1er janvier 1980 et le 31 décembre 2000 seront inclus.


### Le `LIKE` {#le-like}

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
>  INSERT INTO utilisateur (nom, dateNaissance, villeNaissance)
>  VALUES ("Jean", '2000-01-01', "Lille"),
>         ("François", '1980-05-07', "Roubaix"),
>         ("Thomas", '1990-01-01', "Paris");
>  SELECT *
>  FROM utilisateur
>  WHERE nom LIKE '%J%';
> ```

Cherche ici tous les utilisateurs dont le nom contient la lettre “J”.


### Trier les résultats {#trier-les-résultats}

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

-   `INSERT INTO` : ajouter des lignes
-   `UPDATE` : modifier des lignes
-   `DELETE` : supprimer des lignes


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
>  INSERT INTO utilisateur (nom, dateNaissance, villeNaissance)
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
>  INSERT INTO utilisateur (nom, dateNaissance, villeNaissance)
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
>>  INSERT INTO utilisateur (nom, dateNaissance, villeNaissance)
>>  VALUES ("Jean", '2000-01-01', "Lille"),
>>         ("François", '1980-05-07', "Roubaix"),
>>         ("Thomas", '1990-01-01', "Paris");
>>  BEGIN TRANSACTION;
>>  DELETE FROM utilisateur
>>  WHERE nom = 'Jean';
>>  SELECT *
>>  FROM utilisateur;
>>  ROLLBACK;
>>  SELECT *
>>  FROM utilisateur;
>> ```

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
>  INSERT INTO utilisateur (nom, dateNaissance, villeNaissance)
>  VALUES ("Jean", '2000-01-01', "Lille"),
>         ("François", '1980-05-07', "Roubaix"),
>         ("Thomas", '1990-01-01', "Paris");
>  DELETE FROM utilisateur
>  WHERE nom = 'François';
>  SELECT *
>  FROM utilisateur;
> ```


## Les jointures (JOIN) {#les-jointures--join}

Les jointures permettent de combiner plusieurs tables.

> [!INFO]
> Les jointures servent à relier les données de plusieurs tables grâce à des colonnes communes (souvent des identifiants).

-   `INNER JOIN` : retourne seulement les lignes correspondantes dans les deux tables
-   `LEFT JOIN` : retourne toutes les lignes de la table de gauche, même sans correspondance
-   `RIGHT JOIN` : retourne toutes les lignes de la table de droite

<!--listend-->

> [!CODE] sql
>  ```sql
>  DROP TABLE IF EXISTS commande;
>  DROP TABLE IF EXISTS utilisateur;
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
>  -- LEFT JOIN : tous les utilisateurs, même sans commande
>  SELECT u.nom, c.produit
>  FROM utilisateur AS u
>  LEFT JOIN commande AS c ON c.utilisateur_id = u.id;
> ```
> 

> [!MEMO]
> Dans une jointure, utiliser des alias (ici `u` et `c`) rend le code plus lisible.
> Toujours écrire les mots-clés SQL en majuscules : `SELECT`, `FROM`, `JOIN`, `WHERE`, etc.


## Fonctions d’agrégation {#fonctions-d-agrégation}

Les fonctions d’agrégation permettent de calculer des valeurs globales à partir de plusieurs lignes.

Fonctions principales :

-   `COUNT()` : compte le nombre d’éléments
-   `SUM()` : somme d’une colonne numérique
-   `AVG()` : moyenne
-   `MIN()` et `MAX()` : valeurs extrêmes

<!--listend-->

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
>         ("Thomas", '1990-01-01', "Paris"),
>         ("Lucie", '1995-09-12', "Lille");
>  SELECT villeNaissance,
>         COUNT(*) AS nombre_utilisateurs
>  FROM utilisateur
>  GROUP BY villeNaissance
>  ORDER BY nombre_utilisateurs DESC;
> ```
> 

> [!INFO]
> La clause `GROUP BY` permet de regrouper les lignes selon une colonne, pour appliquer des fonctions d’agrégation sur chaque groupe.
