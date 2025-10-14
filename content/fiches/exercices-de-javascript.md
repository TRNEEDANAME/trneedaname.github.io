+++
title = "Exercices de Javascript"
author = ["TRNEEDANAME"]
date = 2025-10-10
layout = "page"
tags = ["fiches", "javascript", "français"]
draft = false
+++

## Retour au cours {#retour-au-cours}

Le cours peut se trouver ici : [ Cours ]({{< relref "Javascript" >}})


## Fichier CSS {#fichier-css}

Les styles appliqués aux fichiers HTML/JS.

> [!CODE] css
>  ```css
>  /* ===================== Body ===================== */
>  body {
>      margin: 0;
>      font-family: Arial, sans-serif;
>  }
>  /* ===================== Title ===================== */
>  h1 {
>      text-align: center;
>      margin: 20px 0;
>  }
>  /* ===================== Lists ===================== */
>  li {
>      list-style: upper-roman;
>  }
>  /* ===================== Text styles ===================== */
>  .type {
>      color: red;
>      font-weight: bold;
>  }
>  .name {
>      color: green;
>      font-weight: bold;
>  }
>  /* ===================== Navigation ===================== */
>  nav {
>      display: flex;
>      background-color: #333;
>      padding: 10px;
>  }
>  nav a {
>      flex: 1;
>      display: flex;
>      justify-content: center;
>      align-items: center;
>      text-decoration: none;
>      color: white;
>      font-weight: bold;
>      padding: 15px 0;
>  }
>  nav a:hover {
>      color: #ffcc00;
>  }
>  /* ===================== Output ===================== */
>  #output {
>      margin-top: 20px;
>  }
> ```


## Fichiers JS {#fichiers-js}


### Exercice 1 – Prompt utilisateur {#exercice-1-prompt-utilisateur}

> [!CODE] js
>  ```js
>  // Récupère le paragraphe
>  let pa = document.getElementById("name");
>  // Demande le nom de l'utilisateur
>  let name = prompt("User name : ");
>  // Affiche le nom dans le paragraphe
>  pa.textContent += name;
> ```


### Exercice 2 – Types de variables {#exercice-2-types-de-variables}

> [!CODE] js
>  ```js
>  // Déclaration des variables
>  let num = 15;
>  let num2 = 3.14;
>  let txt = "letiable";
>  let bool = false;
>  let no_init;
>  let nulle = null;
>  // Regroupe dans un objet pour itérer
>  let variables = { num, num2, txt, bool, no_init, nulle };
>  // Récupère la zone de sortie
>  let output = document.getElementById("output");
>  // Fonction pour afficher chaque type
>  for (let name in variables) {
>      let type = (variables[name] === null) ? "null" : typeof variables[name];
>      let p = document.createElement("p");
>      p.innerHTML = `La variable <span class='name'>${name}</span> est de type <span class='type'>${type}</span>`;
>      output.appendChild(p);
>  }
> ```


#### Question n°1 {#question-n-1}

Les types principaux : number, string, boolean


#### Question n°2 {#question-n-2}

Les variables non initialisées sont `undefined`.


### Exercice 3 – Addition / concaténation {#exercice-3-addition-concaténation}

> [!CODE] js
>  ```js
>  // Variables
>  let nb = 15;
>  let nb_txt = "10";
>  let nb_parse = parseInt(nb_txt);
>  // Calcul avant conversion
>  let somme = nb + nb_txt;
>  // Récupère la zone de sortie
>  let output = document.getElementById("output");
>  // Helper pour ajouter une ligne
>  function addLine(text) {
>      let p = document.createElement("p");
>      p.innerHTML = text;
>      output.appendChild(p);
>  }
>  // Affichage étape par étape
>  addLine(`Premier nombre : <span class='type'>${nb}</span>`);
>  addLine(`Deuxième nombre (string) : <span class='type'>${nb_txt}</span>`);
>  addLine(`Après parsing : <span class='type'>${nb_parse}</span>`);
>  addLine(`Résultat avant conversion : <span class='type'>${somme}</span>`);
>  // Conversion et nouvelle addition
>  somme = nb + nb_parse;
>  addLine(`Résultat après conversion : <span class='type'>${somme}</span>`);
> ```


#### Question n°1 {#question-n-1}

Résultats : 1510 avant conversion, 25 après conversion


#### Question n°2 {#question-n-2}

Explication : avec un string, c'est une concaténation ; sinon, c'est une addition.


## Fichiers HTML {#fichiers-html}


### Index TP {#index-tp}

> [!CODE] html
>  ```html
>  <!doctype html>
>  <html lang="fr">
>  <head>
>      <meta charset="UTF-8"/>
>      <link href="style.css" rel="stylesheet"/>
>      <title>TP JavaScript</title>
>  </head>
>  <body>
>  <h1>TP JavaScript</h1>
>  <nav>
>      <a href="tpJS_ex1.html">Ex 1</a>
>      <a href="tpJS_ex2.html">Ex 2</a>
>      <a href="tpJS_ex3.html">Ex 3</a>
>  </nav>
>  </body>
>  </html>
> ```


### Exercice 1 HTML {#exercice-1-html}

> [!CODE] html
>  ```html
>  <!doctype html>
>  <html lang="fr">
>  <head>
>      <meta charset="UTF-8"/>
>      <link href="style.css" rel="stylesheet"/>
>      <title>Ex 1</title>
>  </head>
>  <body>
>  <h1>Ex 1</h1>
>  <p id="name">Your name is : </p>
>  <a href="tpJS_index.html">Retour à l'index</a>
>  <script src="ex1.js"></script>
>  </body>
>  </html>
> ```


### Exercice 2 HTML {#exercice-2-html}

> [!CODE] html
>  ```html
>  <!doctype html>
>  <html lang="fr">
>  <head>
>      <meta charset="UTF-8"/>
>      <link href="style.css" rel="stylesheet"/>
>      <title>Ex 2</title>
>  </head>
>  <body>
>  <h1>Ex 2</h1>
>  <a href="tpJS_index.html">Retour à l'index</a>
>  <br><br>
>  <div id="output"></div>
>  <script src="ex2.js"></script>
>  </body>
>  </html>
> ```


### Exercice 3 HTML {#exercice-3-html}

> [!CODE] html
>  ```html
>  <!doctype html>
>  <html lang="fr">
>  <head>
>      <meta charset="UTF-8"/>
>      <link href="style.css" rel="stylesheet"/>
>      <title>Ex 3</title>
>  </head>
>  <body>
>  <h1>Ex 3</h1>
>  <a href="tpJS_index.html">Retour à l'index</a>
>  <br>
>  <div id="output"></div>
>  <script src="ex3.js"></script>
>  </body>
>  </html>
> ```
