+++
title = "Python"
author = ["TRNEEDANAME"]
date = 2025-10-08
layout = "page"
tags = ["fiches", "python", "français"]
draft = false
+++

## Le Python, c'est quoi ? {#le-python-c-est-quoi}

> [!INFO]
> Le langage `Python` est un langage dit `interprété`, ce qui veut dire que chaque instruction est lue ligne par ligne, de haut en bas.
> Le code est compilé au moment de l’exécution.
> 

> [!MEMO] Convention
> Le python utilise le [Snake Case](https://fr.wikipedia.org/wiki/Snake_case) pour nommer les variables, par exemple, une variable serait donc `ma_variable`.
> 
> Il est important d'être explicite, par exemple :
> 
>> [!CODE] python
>>  ```python
>>  def func(valeur):
>>      return (valeur % 4 == 0) and (valeur % 100 != 0 or valeur % 400 == 0)
>>  val = int(input("Quelle année voulez vous tester"))
>>  res = func(val)
>>  if (res):
>>      print(f"L'année {val} est bien bissextile !")
>>  else:
>>      print(f"L'année {val} n'est pas bissextile !")
>> ```
>> 
> Même si cela compile et exécute, il est bien mieux d'écrire
> 
>> [!CODE] python
>>  ```python
>>  def est_anne_bissextile(annee):
>>      # Les années bissextiles sont toutes des multiples de 4
>>      if annee % 4 != 0:
>>          return False
>>      # Les années séculaires ne sont pas bissextiles, hormis 1600, 2000, 2400, etc.
>>      if annee % 100 == 0:
>>          return annee % 400 == 0
>>      # Tous les autres résultats sont vrais.
>>      return True
>>  annee = int(input("Quelle année voulez vous tester"))
>>  resultat = est_anne_bissextile(annee)
>>  if (resultat):
>>      print(f"L'année {annee} est bien bissextile !")
>>  else:
>>      print(f"L'année {annee} n'est pas bissextile !")
>> ```
>> 
> Ce code paraît plus "verbeux" mais il est bien plus lisible !
> 
>> [!IMPORTANT] L'indentation
>> Python utilise l'indentation pour marquer si du code appartient à une condition, une boucle, une fonction ou une classe.
>> 
> Toutes les conventions sont disponibles sur [W3School](https://www.w3schools.com/python/python_syntax.asp) et [Python Style Guide](https://peps.python.org/pep-0008/).


## Les types et variables {#les-types-et-variables}

> [!CODE] python
>  ```python
>  age = 20
>  nom = "Tom"
>  etudiant = True
>  animaux = ["chien", "chat", "poisson", "chameau"]
>  print(age)
>  print(nom)
>  print(f"Le type de la variable 'age' est {type(age)} alors que le type de 'nom' est {type(nom)}")
> ```

Comme montré, Python n'a pas de `types` prédéfinis comme d'autres langages (Java, C++, C, ...). Les types sont définis par l'interpréteur.
Cela permet de redéfinir les types à la volée.


### Redéfinitions des types {#redéfinitions-des-types}

> [!TIP] Les types
> 
>> [!CODE] python
>>  ```python
>>  age = 20
>>  print(type(age) == str)
>>  print("Changement de la variable 'age' en string")
>>  age = "tomate"
>>  print(age)
>>  print(type(age) == str)
>> ```

> [!TIP] Booléens
> Pour les vérifications booléennes (`True` ou `False`), utiliser `==` peut être remplacé par `is` pour plus de lisibilité.
> Les vérifications fausses sont donc `is not`.
> 

> [!WARNING] Attention
> Avec des `int` cela renvoie une `SyntaxWarning`, ce n'est pas une erreur en soit mais à éviter.
> 
> `SyntaxWarning: "is" with 'int' literal. Did you mean "=="?`

Comme vous pouvez le voir, le résultat est le même.

> [!CODE] python
>  ```python
>  nom = "Tom"
>  print(type(nom) == str)
>  print(type(nom) == bool)
>  print("Utilisation de 'is' et 'is not'")
>  print(type(nom) is str)
>  print(type(nom) is bool)
> ```

**Utiliser `is` fonctionne quant même.**

> [!CODE] python
>  ```python
>  print(type(4) is str)
> ```


## Les entrées / sorties {#les-entrées-sorties}


### L'entrée {#l-entrée}

Dans tout les language l'`I/O` (input / output) est très commun, le python rend cela très simple :

> [!CODE] python
>  ```python
>  nom = input("Quel est votre nom ? ")
>  print(f"Bonjour {nom} !")
> ```
> 

> [!TIP]- String & f-string
> La fonction `print()` peut paraître un peu différente.
> J'utilise des `f-strings` qui permettent d'insérer des variables directement dans les chaînes de caractères avec `{}`.

Pour demander un nombre il faut mettre le `input()` dans un `int()` ou autre.

> [!CODE] python
>  ```python
>  age = input("Quel est votre age ? ")
>  age = age + 1
>  print(age)
>  print(type(age))
> ```
> 

> [!ERROR] Erreur
> Comme vous le voyez en exécutant le code, l'interpréteur de Python renvoie
> 
> `TypeError: can only concatenate str (not "int") to str`


### La sortie {#la-sortie}

> [!CODE] python
>  ```python
>  print("Hello World !")
> ```

Le python supporte la concaténation des string.
Avec le `input()` transformé :

> [!CODE] python
>  ```python
>  age = int(input("Quel est votre age ? "))
>  age = age + 1
>  print("Votre age est donc " + str(age))
> ```
> 

> [!TIP]- A voir
> La variable `age` à du être entouré dans une autre fonction `str()`, elle transforme le `int` en `string`


## Les fonctions {#les-fonctions}

Les fonctions sont des blocs de code réutilisables.

> [!CODE] python
>  ```python
>  def ma_fonction(age):
>      age = age + 1
>      print(f"Vous avez {age} ans")
>  ma_fonction(int(input("Quel est votre âge ?")))
> ```
> 

> [!NOTE] Décomposition
> -   `def` définit le début d'une fonction.
> -   `ma_fonction` est le nom de la fonction.
> -   `(age)` est un paramètre. Dans cet exemple, on prend l'âge en paramètre et on lui ajoute `1`.
> 

> [!IDEA] Tabulations
> Comme dit plus haut le Python utilise l'indentation : tout ce qui est indenté après le `def` est considéré comme faisant partie de la fonction.
> 

> [!CODE] python
>  ```python
>  def ma_fonction(age):
>      print(f"J'avais {age} ans")
>      age = age + 1
>      print(f"J'ai {age} ans")
>  mon_age = 20
>  ma_fonction(mon_age)
> ```

On peut créer des fonctions avec un nombre illimité de paramètres, par exemple :

> [!CODE] python
>  ```python
>  def ma_super_longue_fonction(age, nom, formation, lycee):
>      print(f"Je m'appelle {nom}, j'ai {age} ans et je suis en {formation} à {lycee}")
>  age = 20
>  nom = "Tom"
>  formation = "BTS SIO"
>  lycee = "Gaston Berger"
>  ma_super_longue_fonction(age, nom, formation, lycee)
> ```


## Les conditions {#les-conditions}

Une condition vérifie si ce que vous demandez est `vrai` (`True`) ou `faux` (`False`).

> [!CODE] python
>  ```python
>  age = 20
>  if age < 18:
>      print("Tu es mineur")
>  else:
>      print("Tu n'es pas mineur")
> ```

Si la condition n'est pas vraie mais que l'on veut tester d'autres conditions, on utilise `elif`.

> [!CODE] python
>  ```python
>  nombre = 42
>  if nombre == 42:
>      print("Le nombre est bien la vie")
>  elif nombre < 42:
>      print("Le nombre est inférieur")
>  elif nombre > 42:
>      print("Le nombre est supérieur")
>  elif nombre <= 42:
>      print("Le nombre est strictement inférieur")
>  elif nombre >= 42:
>      print("Le nombre est strictement positif")
>  else:
>      print("Autre")
> ```


### Chainage de condition {#chainage-de-condition}

Les conditions peuvent être enchaînées.

-   `and` signifie "et"
-   `or` signifie "ou"

<!--listend-->

> [!CODE] python
>  ```python
>  age = 20
>  if age > 18 and age < 25:
>      print("L'âge est compris entre 18 et 25")
>  elif age > 18 or age < 25:
>      print("L'âge est supérieur à 18 ou inférieur à 25")
> ```


## Les boucles {#les-boucles}


### Boucle for {#boucle-for}

Boucle qui itère sur une séquence.

Tant que le tableau a des valeurs, on affiche chaque élément

> [!EXPERIMENT] Exemple n°1
> 
>> [!CODE] python
>>  ```python
>>  tableau = [0, 1, 2, 3, 4, 5, 6]
>>  for i in tableau:
>>      print(i)
>> ```
> 
>> [!NOTE] Décomposition
>> -   `for` : boucle qui itère sur chaque élément d'une séquence.
>> -   `i` : variable représentant l'élément courant.
>> -   `in` : définit sur quelle séquence la boucle s'exécute.
>> 
>> Tant que nous sommes dans la plage [0;10], on affiche la valeur.

> [!EXPERIMENT] Exemple n°2
> 
>> [!CODE] python
>>  ```python
>>  for i in range(0, 10):
>>      print(i)
>> ```
> 
>> [!NOTE] Décomposition
>> -   `range` : fonction qui renvoie une séquence entre deux valeurs
>> 
>> A savoir que `range()` n'inclut pas la valeur de fin


### Boucle while {#boucle-while}

Boucle qui s'exécute tant que la condition est vraie.

> [!EXPERIMENT] Exemple n°1
> Tant que la valeur est inférieure à 5, on l'affiche et on l'incrémente
> 
>> [!CODE] python
>>  ```python
>>  i = 0
>>  while i < 5:
>>      print(i)
>>      i += 1
>> ```
> 
>> [!NOTE] Décomposition
>> -   `while` : boucle qui continue tant que la condition est vraie
>> -   `i < 5` : condition d'arrêt
>> -   `i += 1` : incrémente la variable pour éviter boucle infinie

> [!EXPERIMENT] Exemple n°2
> Tant que la liste n'est pas vide, on retire et affiche le premier élément
> 
>> [!CODE] python
>>  ```python
>>  liste = [10, 20, 30, 40]
>>  while liste:
>>      print(liste.pop(0))
>> ```
> 
>> [!NOTE] Décomposition
>> -   `liste` : la séquence sur laquelle on travaille
>> -   `while liste` : boucle continue tant que la liste n'est pas vide
>> -   `pop(0)` : retire le premier élément et le retourne
