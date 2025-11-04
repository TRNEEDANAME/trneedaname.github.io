+++
title = "Javascript"
author = ["TRNEEDANAME"]
date = 2025-10-10
layout = "page"
tags = ["fiches", "javascript", "web"]
draft = false
+++

Le javascript est utilisé dans le web.

<!--more-->


## Aller au exercices {#aller-au-exercices}

Les exercices peuvent se trouver ici : [ Exercices ]({{< relref "Exercices de Javascript" >}})


## Le JavaScript, c'est quoi ? {#le-javascript-c-est-quoi}

Le langage `JavaScript` est interprété, ce qui veut dire que chaque instruction est exécutée au moment de l’exécution dans le navigateur.
Il peut manipuler des variables, des fonctions, le DOM, et plus encore.

> [!MEMO] Convention
> Le Javascript utilise le [Camel Case](https://fr.wikipedia.org/wiki/Camel_case) pour nommer les variables et fonctions, par exemple on écrira `maVariable`, les opération on toujours un espace
> 
>> [!CODE] javascript
>>  ```javascript
>>  console.log(2 + 1);
>> ```
> 
>> [!IDEA] Accolades
>> JS est sensible à la syntaxe mais utilise des accolades `{}` pour définir les blocs, contrairement à Python qui utilise l'indentation.
>> 
> Toutes les conventions sont disponibles sur [W3School](https://www.w3schools.com/js/js_conventions.asp).


## Les types et variables {#les-types-et-variables}


### Différences de `var` et `let` {#différences-de-var-et-let}

> [!TIP] Utilisation de var et let
> 
> 
> `var` à plusieurs problèmes :
> 
> -   Portée : fonction (ou globale si déclarée en dehors d’une fonction).
> -   Remontée : la déclaration est remontée en haut de la portée, mais l’initialisation ne l’est pas.
> -   Peut être redéclarée dans la même portée sans erreur.
> 
> <!--listend-->
> 
>> [!CODE] javascript
>>  ```javascript
>>  var x = 10;
>>  if (true) {
>>      var x = 20; // même variable que ci-dessus
>>      console.log(x); // 20
>>  }
>>  console.log(x); // 20 (toujours la même variable)
>> ```
>> 
> `let` est moderne et ne présente pas ces problèmes.
> 
>> [!CODE] javascript
>>  ```javascript
>>  let y = 10;
>>  if (true) {
>>      let y = 20; // variable différente, limitée au bloc
>>      console.log(y); // 20
>>  }
>>  console.log(y); // 10 (variable extérieure inchangée)
>> ```


### Les variables {#les-variables}

> [!CODE] javascript
>  ```javascript
>  let age = 20;
>  let nom = "Tom";
>  let etudiant = true;
>  let animaux = ["chien","chat","poisson","chameau"];
>  console.log(age);
>  console.log(nom);
>  console.log(animaux[0]);
>  console.log(`Le type de 'age' est ${typeof age} et celui de 'nom' est ${typeof nom}`);
> ```

Comme montré, le Javascript n'a pas de `types` prédéfinis comme d'autres langages (Java, C++, C, ...). Les types sont définis par l'interpréteur.
Cela permet de redéfinir les types à la volée.


### Redéfinitions des types {#redéfinitions-des-types}

> [!NOTE] Les types
> 
>> [!CODE] javascript
>>  ```javascript
>>  let age = 20;
>>  console.log(typeof age === "string");
>>  console.log("Changement de la variable 'age' en string");
>>  age = "tomate";
>>  console.log(age);
>>  console.log(typeof age === "string");
>> ```

> [!TIP] A savoir
> Même si utiliser `==` semble être bon il est recommandé de ne pas l'utiliser.
> Privilégiez `===` pour la vérification de types


## Entrées / sorties {#entrées-sorties}


### Les entrées {#les-entrées}

Demander une entrée utilisateur avec `prompt()`.

> [!CODE] javascript
>  ```javascript
>  let nom = prompt("Quel est votre nom ?");
>  console.log(`Bonjour ${nom} !`);
> ```


### Les sorties {#les-sorties}


#### Version console {#version-console}

> [!CODE] javascript
>  ```javascript
>  console.log("Hello World !");
> ```


#### Version site {#version-site}

> [!CODE] html
>  ```html
>  <!doctype html>
>  <html lang="en">
>    <head>
>      <meta charset="UTF-8"/>
>      <link href="style.css" rel="stylesheet"/>
>      <title>Ex 1</title>
>    </head>
>    <body>
>      <h1>Ex 1</h1>
>      <p id="texte_a_changer"></p>
>    </body>
>         <script>
>           let texte = document.getElementById("texte_a_changer")
>           texte.textContent = "Hello World !"
>         </script>
>  </html>
> ```
> 

> [!NOTE] Décomposition
> -   `let texte` : crée un variable `texte`
> -   `document.getElementById("texte_a_changer")` : `document` désigne simplement la page web, `getElementById` selectionne l'élément avec l'id `texte_a_changer` (ici un `<p>`)
> -   `texte.textContent` : redéfini le contenu de la variable (donc ici le contenue de l'HTML)


## Les fonctions {#les-fonctions}

> [!CODE] javascript
>  ```javascript
>  function maFonction(age) {
>    age = parseInt(age);
>    age = age + 1;
>    console.log(`Vous avez ${age} ans`);
>  }
>  maFonction(prompt("Quel est votre age ?"));
> ```


## Les conditions {#les-conditions}

Les conditions permettent de vérifier si une valeur est vrai ou fausse

> [!CODE] javascript
>  ```javascript
>  let age = prompt("Age ?");
>  if (age < 18) {
>    console.log("Tu es mineur");
>  } else {
>    console.log("Tu n'es pas mineur");
>  }
> ```


## Boucles {#boucles}


### Boucle for {#boucle-for}

> [!CODE] javascript
>  ```javascript
>  for (let i = 0; i < 7; i++) {
>    console.log(i);
>  }
> ```


### Boucle while {#boucle-while}

> [!CODE] javascript
>  ```javascript
>  let i = 0;
>  while (i < 5) {
>    console.log(i);
>    i++;
>  }
> ```


### Switch {#switch}

En JavaScript, le `switch` permet de comparer une expression à plusieurs valeurs possibles.

> [!CODE] javascript
>  ```javascript
>  let t = prompt("Saisir un caractère :");
>  switch(t) {
>      case "a":
>      case "e":
>      case "i":
>      case "o":
>      case "u":
>      case "y":
>          alert("C'est une voyelle");
>          break;
>      default:
>          alert("Pas une voyelle");
>          break;
>  }
> ```
> 

> [!NOTE] Décomposition
> -   `switch(expression)` évalue l'`expression`.
> -   Chaque `case` compare la valeur de l'expression.
> -   `break` empêche l'exécution des cases suivantes.
> -   `default` est exécuté si aucune valeur ne correspond.
