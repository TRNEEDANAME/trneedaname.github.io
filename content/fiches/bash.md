+++
title = "Bash"
author = ["TRNEEDANAME"]
date = 2025-11-05
layout = "page"
tags = ["fiches"]
draft = true
+++

## Le Bash, c’est quoi ? {#le-bash-c-est-quoi}

Le langage `Bash` (Bourne Again SHell) est un langage de script interprété par un terminal Unix/Linux.
Il sert principalement à automatiser des tâches système, manipuler des fichiers, exécuter des commandes, etc.

> [!MEMO] Convention
> Les scripts Bash ont généralement l’extension `~.sh~` et commencent toujours par une ligne d’en-tête (appelée **shebang**) :
> 
>> [!CODE] bash
>>  ```bash
>>  #!/bin/bash
>> ```
>> 
> Les conventions recommandent :
>
> -   d’utiliser des **minuscules** pour les noms de variables et de fonctions ;
> -   de séparer les mots par des underscores \`_\` :
>     `ma_variable`, `ma_fonction()` ;
> -   d’éviter les espaces autour des opérateurs d’affectation :
>     `x=10` (et non `x = 10`).


## Les variables {#les-variables}

> [!CODE] bash
>  ```bash
>  #!/bin/bash
>  nom="Tom"
>  age=20
>  etudiant=true
>  echo "Nom : $nom"
>  echo "Âge : $age"
>  echo "Étudiant : $etudiant"
> ```
> 

> [!TIP] À savoir
> -   Pas d’espace avant ou après `=`
> -   Pour utiliser une variable, on écrit `$nom_variable`
> -   Les variables sont toujours des chaînes de caractères, même si elles contiennent des nombres


### Les tableaux {#les-tableaux}

> [!CODE] bash
>  ```bash
>  animaux=("chien" "chat" "poisson" "chameau")
>  echo "Premier animal : ${animaux[0]}"
>  echo "Tous les animaux : ${animaux[@]}"
>  echo "Nombre d'animaux : ${#animaux[@]}"
> ```
> 

> [!TIP] À savoir
> Les indices commencent à 0.
> `[@]` permet d’afficher tous les éléments, `#` donne la taille du tableau.


## Entrées / sorties {#entrées-sorties}


### Les entrées {#les-entrées}

Lire une valeur entrée par l’utilisateur avec `read` :

> [!CODE] bash
>  ```bash
>  read -p "Quel est ton nom ? " nom
>  echo "Bonjour $nom !"
> ```


### Les sorties {#les-sorties}

Afficher un texte avec `echo` :

> [!CODE] bash
>  ```bash
>  echo "Hello World !"
> ```
> 

> [!NOTE] Options utiles
> -   `-n` : n’ajoute pas de retour à la ligne
> -   `-e` : permet d’interpréter les caractères spéciaux comme `\n` (nouvelle ligne)


## Les conditions {#les-conditions}

> [!CODE] bash
>  ```bash
>  read -p "Quel est ton âge ? " age
>  if [ "$age" -lt 18 ]; then
>    echo "Tu es mineur."
>  elif [ "$age" -eq 18 ]; then
>    echo "Tu viens d’avoir la majorité !"
>  else
>    echo "Tu es majeur."
>  fi
> ```
> 

> [!TIP] À savoir
> -   Les crochets `[` et `]` entourent les conditions (avec espaces obligatoires)
> -   Les opérateurs numériques :
> `-lt` (`<`), `-le` (`<=`), `-gt` (`>`), `-ge` (`>=`), `-eq` (`=`), `-ne` (`!=`)
> -   Les chaînes de caractères :
> `==`, `!=`, `-z` (vide), `-n` (non vide)


## Les boucles {#les-boucles}


### Boucle for {#boucle-for}

> [!CODE] bash
>  ```bash
>  for i in {1..5}; do
>    echo "Itération $i"
>  done
> ```


### Boucle while {#boucle-while}

> [!CODE] bash
>  ```bash
>  i=0
>  while [ $i -lt 5 ]; do
>    echo "Valeur : $i"
>    ((i++))
>  done
> ```


### Boucle until {#boucle-until}

> [!CODE] bash
>  ```bash
>  i=0
>  until [ $i -ge 5 ]; do
>    echo "Compteur : $i"
>    ((i++))
>  done
> ```


## Les fonctions {#les-fonctions}

> [!CODE] bash
>  ```bash
>  ma_fonction() {
>    echo "Hello depuis une fonction !"
>  }
>  ma_fonction
> ```
> 

> [!NOTE] Avec paramètres
> 
>> [!CODE] bash
>>  ```bash
>>  dire_bonjour() {
>>    nom=$1
>>    echo "Bonjour $nom !"
>>  }
>>  dire_bonjour "Alice"
>>  dire_bonjour "Bob"
>> ```


## Les cas (switch) {#les-cas--switch}

> [!CODE] bash
>  ```bash
>  read -p "Entre une lettre : " lettre
>  case $lettre in
>    a|e|i|o|u|y)
>      echo "C'est une voyelle"
>      ;;
>    ,*)
>      echo "Pas une voyelle"
>      ;;
>  esac
> ```
> 

> [!NOTE] Décomposition
> -   Chaque **motif** est séparé par `|`
> -   `;;` marque la fin d’un bloc
> -   `*` correspond au cas par défaut
> -   `esac` termine la structure


## Les tests de fichiers {#les-tests-de-fichiers}

> [!CODE] bash
>  ```bash
>  fichier="test.txt"
>  if [ -f "$fichier" ]; then
>    echo "Le fichier existe."
>  else
>    echo "Le fichier n'existe pas."
>  fi
> ```
> 

> [!NOTE] Options utiles
> -   `-f` : fichier régulier
> -   `-d` : dossier
> -   `-e` : existe
> -   `-r`, `-w`, `-x` : lisible, modifiable, exécutable


## Piping et redirections {#piping-et-redirections}

Les pipes (`|`) permettent d’envoyer la sortie d’une commande comme entrée d’une autre commande.
Les redirections (`>`, `>>`, `<`) permettent de manipuler les flux d’entrée/sortie.

> [!CODE] bash
>  ```bash
>  # Exemple simple : envoyer la sortie de ~ls~ à ~grep~
>  ls | grep ".sh"
>  # Rediriger la sortie vers un fichier
>  echo "Bonjour" > fichier.txt
>  # Ajouter sans écraser
>  echo "Encore une ligne" >> fichier.txt
>  # Lire depuis un fichier
>  cat < fichier.txt
> ```
> 

> [!NOTE] Décomposition
> -   `|` : enchaîne les commandes
> -   `>` : écrit dans un fichier (écrase)
> -   `>>` : ajoute à un fichier
> -   `<` : lit à partir d’un fichier


## Commandes utiles en ligne de commande {#commandes-utiles-en-ligne-de-commande}


### grep {#grep}

`grep` cherche du texte dans un fichier ou dans la sortie d’une commande.

> [!CODE] bash
>  ```bash
>  grep "chien" animaux.txt          # cherche les lignes contenant "chien"
>  ls | grep "sh"                    # filtre uniquement les fichiers .sh
>  grep -i "bonjour" fichier.txt     # ignore la casse
>  grep -r "main" ./src              # recherche récursive dans un dossier
> ```


### cut {#cut}

`cut` découpe les lignes selon un délimiteur.

> [!CODE] bash
>  ```bash
>  cat data.csv | cut -d "," -f 1    # affiche la première colonne
> ```


### sort {#sort}

Trie les lignes d’un fichier ou d’une commande.

> [!CODE] bash
>  ```bash
>  sort noms.txt             # tri alphabétique
>  sort -n notes.txt         # tri numérique
>  sort -r noms.txt          # tri inverse
> ```


### uniq {#uniq}

Supprime les doublons (souvent combiné avec `sort`).

> [!CODE] bash
>  ```bash
>  sort noms.txt | uniq
> ```


### wc {#wc}

Compte le nombre de lignes, mots, ou caractères.

> [!CODE] bash
>  ```bash
>  wc -l fichier.txt   # lignes
>  wc -w fichier.txt   # mots
>  wc -c fichier.txt   # caractères
> ```


### awk {#awk}

Permet de manipuler et formater des colonnes (langage de traitement de texte).

> [!CODE] bash
>  ```bash
>  awk '{print $1, $3}' data.txt       # affiche la 1re et 3e colonne
>  awk -F, '{print $2}' data.csv       # colonne 2 avec virgule comme séparateur
> ```


### sed {#sed}

Permet de rechercher et remplacer du texte.

> [!CODE] bash
>  ```bash
>  sed 's/chat/chien/g' animaux.txt        # remplace "chat" par "chien"
>  sed -i 's/chien/loup/g' animaux.txt     # remplace directement dans le fichier
> ```
> 

> [!TIP] Astuce
> Les combiner permet de créer de puissants pipelines de traitement de texte :
> 
>> [!CODE] bash
>>  ```bash
>>  cat log.txt | grep "ERROR" | cut -d " " -f 3 | sort | uniq -c | sort -nr
>> ```
>> 
> Ce pipeline :
>
> 1.  extrait les lignes contenant “ERROR”
> 2.  prend la 3e colonne
> 3.  trie et compte les occurrences
> 4.  affiche les plus fréquentes
