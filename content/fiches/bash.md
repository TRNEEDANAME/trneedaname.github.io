+++
title = "Bash"
author = ["TRNEEDANAME"]
date = 2025-11-05
layout = "page"
tags = ["fiches", "bash"]
draft = false
+++

## Le Bash, c’est quoi ? {#le-bash-c-est-quoi}

Le langage `Bash` (Bourne Again SHell) est un langage de script interprété par un terminal Unix/Linux.
Il sert principalement à automatiser des tâches système, manipuler des fichiers, exécuter des commandes, etc.

Le Bash est un language de programmation, mais en tant que tel il n'est pas très utile, il est principalement utilisé en conjonction avec des commandes qui permettent d'interagir avec le système.

Ces commandes (ainsi que le Shell) sont installé par défaut sur la plupart des distribution Linux.

> [!INFO] Le manuel
> Si vous utilisez une distribution Linux (ou WSL sur windows / une VM), la commande `man` va être très utile, `man commande` vous donne le manuel de la commande en question, ce qui est pratique (surtout pour les différents flags et autre fonctions)
> 
>> [!TIP] info
>> La commande `info` est aussi utile mais plus complète (je recommande de lire les `info` sur emacs mais cela prend du temps à comprendre), elle est utilisé par plusieurs programme (`tar`, `bash`, `emacs` ainsi que de nombreuses commandes du standard `GNU` l'utilise en complément de `man`)

> [!MEMO] Convention
> Les scripts Bash ont généralement l’extension `.sh` et commencent toujours par une ligne d’en-tête (appelée **shebang**) :
> 
>> [!ABSTRACT] Pour executer le code
>> Vous pouvez utiliser tout le Bash en ligne de commande (ligne par ligne), mais pour faire un fichier il faut utiliser la commande `chmod +x mon_fichier.sh`
>> La commande chmod est expliqué [ici](#chmod)
> 
>> [!CODE] bash
>>  ```bash
>>  #!/bin/bash
>> ```
>> 
> Les conventions recommandent :
>
> -   d’utiliser des **minuscules** pour les noms de variables et de fonctions
> -   de séparer les mots par des underscores `_` :
>     `ma_variable`, `ma_fonction()`
> -   Pas d'espaces entre les affectations :
>     `x=10` (et non `x = 10`).
> 
>> [!WARNING] Attention
>> Mettre des espaces entre les affectations casse le système d'affectation !


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
> -   Pour utiliser une variable, on écrit `$nom_variable`
> -   Les variables sont toujours des chaînes de caractères en Bash, même si elles contiennent des nombres


### Les tableaux {#les-tableaux}

> [!CODE] bash
>  ```bash
>  animaux=("chien" "chat" "poisson" "chameau")
>  echo "Premier animal : ${animaux[0]}"
>  echo "Tous les animaux : ${animaux[@]}"
>  echo "Taille du tableau : ${#animaux}"
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
>  read -p "Quel est ton nom: " nom
>  echo "Bonjour $nom !"
> ```
> 

> [!NOTE] Options utiles
> -   `-p` : n’ajoute pas de retour à la ligne
> -   `-i` : permet d'entrer une liste
> -   `-d` : continue jusqu'à ce que la lettre delimitante est lue (`-d "i"` par exemple)


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
> 

> [!TIP] Info
> Les boucles utilise `..` pour donner un début et une fin
> 
> `1..5` va de `1` à `5` (inclut)


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
> 

> [!TIP] La différence entre while et until
> [Page info de Bash sur les boucles](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Looping-Constructs)
> 
> Et oui, tout les manuels / pages info sont en anglais (à moins de changer le `locale`)<https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html#Looping-Constructs>


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
>  # Exemple simple : envoyer la sortie de `ls` à `grep`
>  # ls permet de lister tout les fichiers d'un dossier
>  ls | grep ".sh"
>  # Rediriger la sortie vers un fichier (écrase le contenue)
>  echo "Bonjour" > fichier.txt
>  # Ajouter sans écraser
>  echo "Encore une ligne" >> fichier.txt
>  # Lire depuis un fichier, équivalent à ~cat fichier.txt~
>  cat < fichier.txt
> ```
> 

> [!NOTE] Décomposition
> -   `|` : utilise la sortie d'une commande comme l'entrée d'une autre
> -   `>` : écrit dans un fichier (écrase)
> -   `>>` : ajoute à un fichier
> -   `<` : lit à partir d’un fichier


## Commandes utiles en ligne de commande {#commandes-utiles-en-ligne-de-commande}


### grep {#grep}

`grep` cherche du texte dans un fichier ou dans la sortie d’une commande.

> [!CODE] bash
>  ```bash
>  grep "chien" animaux.txt          # cherche les lignes contenant "chien"
>  ls | grep ".sh"                    # filtre uniquement les fichiers .sh
>  grep -i "bonjour" fichier.txt     # ignore la casse
>  grep -r "maFonction" ./src              # recherche récursive dans un dossier
> ```
> 

> [!CAUTION] Attention
> La fonction `grep` permet d'utiliser des patternes Regex.
> 
>> [!NOTE] Les bases du Regex
>> 
>>> [!ABSTRACT]- Les classes de caractère
>>> 
>>> 
>>> -   `[abc]` : un caractère, soit `a` soit `b` soit `c`
>>> -   `[^abc]` : un caractère, sauf `a`, `b` ou `c`
>>> -   `[a-c]` : un caractère de `a` à `c`
>>> -   `[^a-c]` : un caractère, sauf de `a` à `c`
>>> -   `[0-9` : un nombre (aussi possible d'utiliser `\d`)
>>> -   `[a-cA-C]` : un caractère de `a` à `c` ou `A` à `C`
>>> 
>>> Il y a aussi les classes de caractères UNIX
>>> 
>>> -   `[[:alnum:]]`: tout les caractères (équivalent à `[0-9A-Za-z]`)
>>> -   `[[:alpha]]` : tout les caractères (équivalent à `[A-Za-z`)
>>> -   `[[:digit:]]` : tout les nombres (équivalent à `[0-9]`)
>>> -   `[[:lower:]] & [[:upper:]]` tout les caractères en minuscules et majuscules
>> 
>>> [!ABSTRACT]- Quantité
>>> **Tout les quantificateurs supportent les classes de caractère**
>>> 
>>> -   `a?` : zero ou un `a`
>>> -   `a*` : zero ou plusieurs `a`
>>> -   `a+` : un ou plusieurs `a`
>>> -   `a{4}` : exactement 4 `a`
>>> -   `a{4,}` : 4 ou plus de `a`
>>> -   `a{1,4}` : entre 1 et 4 `a`
>> 
>>> [!ABSTRACT]- Séquences spéciales
>>> Ces séquences permettent de définir des concepts et caractères non commun
>>> 
>>> -   `.` : n'importe quel caractère unique
>>> -   `\s` : les espaces
>>> -   `\S` : les non espaces
>>> -   `\d` : les nombres
>>> -   `\D` : les non nombres
>>> -   `R` : les retour à la lignes
>
> Pour plus d'info, allez sur [quickref : Regex](https:quickref.me/regex)


### tr {#tr}

Change ou modifie les caractères (supporte les classes de caractères UNIX `[:alpha]` / `[:alnum:]`...).

> [!CODE] bash
>  ```bash
>  echo "toto" | tr o 8 # renvoi t8t8
> ```

Il est possible d'utiliser une partie des classes UNIX

> [!CODE] shell
>  ```shell
>  echo "La commande tr permet de changer du texte" | tr [:lower:] [:upper:] # renvoi "lA COMMANDE TR PERMET DE CHANGER DU TEXTE"
> ```


### cut {#cut}

`cut` découpe les lignes selon un délimiteur.

> [!CODE] bash
>  ```bash
>  cat data.csv | cut -d "," -f 1    # affiche la première colonne
> ```
> 

> [!NOTE] Décomposition
> -   `-d` : donne le délimiteur à utiliser
> -   `-f` : quel field(s) à renvoyer (peut être une liste)


#### Exemple {#exemple}

> [!CODE] bash
>  ```bash
>  echo "ceci,est,un,fichier,csv" > file.csv
>  cat file.csv | cut -d "," -f 1,2,3
> ```
> 

> [!CONCLUSION]- Résultat
> ceci,est,un


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


### tails {#tails}

Renvoi les dernière ligne(s) d'un fichier

> [!CODE] bash
>  ```bash
>  tail -n 1 fichier.txt # lignes
> ```


### head {#head}

Renvoi les première ligne(s) d'un fichier

> [!CODE] bash
>  ```bash
>  head -n 1 fichier.txt
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
La commande `sed` supporte aussi le Regex.

> [!CODE] bash
>  ```bash
>  sed 's/chat/chien/g' animaux.txt        # remplace "chat" par "chien"
>  sed -i 's/chien/loup/g' animaux.txt     # remplace directement dans le fichier
> ```


### chmod {#chmod}

La commande chmod permet de modifier les droits des fichiers, la syntaxe est comme tel

> [!CODE] bash
>  ```bash
>  chmod [GROUPE][OPERATEUR][PERMISSIONS] [FICHIER]
> ```


#### Operateurs {#operateurs}

Les opérateurs sont `+`, `-`, `=`

-   `+` : donne des permissions
-   `-` : retire des permissions
-   `=` : attribut des permissions différentes


#### Groupes {#groupes}

Les groupes sont : `u`, `g`, `o`, `a`

-   `u` : l'utilisateur
-   `g` : le groupe auquel l'utilisateur appartient
-   `o` : les autres (pas dans le groupes)
-   `a` : tout le monde

**Un seul groupe peut est `owner` du fichier**


### Permissions {#permissions}

Les permissions sont : `r`, `w`, `x` (on peut aussi utiliser l'octal, voir `man chmod`)

-   `r` : lire le fichier
-   `w` : écrire dans le fichier
-   `x` : éxecute un fichier ou traverse un dossier

<!--listend-->

> [!CODE] bash
>  ```bash
>  chmod u+r mon_fichier.txt
> ```

Ommetre le groupe assume l'utilisateur

> [!CODE] bash
>  ```bash
>  chmod +r mon_fichier.txt
> ```
