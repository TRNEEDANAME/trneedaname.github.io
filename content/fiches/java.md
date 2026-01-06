+++
title = "java"
author = ["TRNEEDANAME"]
date = 2025-12-18
layout = "page"
tags = ["fiches", "java"]
draft = false
+++

## Le Java, c'est quoi ? {#le-java-c-est-quoi}

Le langage `Java` est compilé, ce qui veut dire que le code est transformé en un code intérmediaire (dans le cas du java un `.class`) qui est ensuite interpreté en code machine.

Le Java est un langage **objet**.

> [!MEMO] Convention
> Le java utilise le [Camel Case](https://fr.wikipedia.org/wiki/Camel_case) pour nommer les variables et fonctions.
> Les fonctions et lignes longues doivent être découpés :
> 
>> [!CODE] java
>>  ```java
>>  maFonction(longExpression1,
>>             longExpression2, longExpression3,
>>             longExpression4, longExpression5);
>> ```
> 
>> [!IDEA] Accolades
>> Le Java est sensible à la syntaxe mais utilise des accolades `{}` pour définir les blocs, contrairement à Python qui utilise l'indentation.
>> 
> Toutes les conventions sont disponibles sur le [site officiel Oracle](https://www.oracle.com/docs/tech/java/codeconventions.pdf)


## Les types et variables {#les-types-et-variables}


### Les différentes variables {#les-différentes-variables}

> [!TIP] Les différents types de variables
> En java, les variables peuvent être initialisés de différentes façon.
> 
>> [!NOTE] La visibilité
>> 
>> 
>> En java, le code est divisé en `package` (la partie UI / logique...)
>> 
>> Tableau des modifiers[^fn:1]
>> 
>> | Modifier    | Classe | Paquet | Sous classe | Toutes les classes |
>> |-------------|--------|--------|-------------|--------------------|
>> | public      | Oui    | Oui    | Oui         | Oui                |
>> | protected   | Oui    | Oui    | Oui         | Non                |
>> | no modifier | Oui    | Oui    | Non         | Non                |
>> | private     | Oui    | Non    | Non         | Non                |
>> 
>>> [!CODE] java
>>>  ```java
>>>  int maVariable = 0;
>>>  int public maVariable = 0;
>>>  int protected maVariable = 0;
>>>  int private maVariable = 0;
>>> ```


### Les différents types {#les-différents-types}

Le java est un langage `typé`, ce qui veut dire que chaque variable doit indiquer son type.

> [!CODE] java
>  ```java
>  int monNombre = 0;
>  String monTexte = "texte"; // Le type String doit avoir une majuscule, comme expliqué après
>  boolean monBool = true;
>  char monCharactere = 'c';
>  float monNombreAVirgule = 0.0;
> ```

Les types ne peuvent pas être redéfini sans casting **explicite** par le developpeur


## Les objets {#les-objets}

Le Java est orienté objet, ce qui signifie qu’il est possible d’encapsuler des concepts en objets.

Le code si dessous est un objet avec les fonctions de bases

> [!CODE] java
>  ```java
>  public class Voiture {
>      /* On utilise private pour rendre les "getters" et "setters" utiles, sinon on peut accéder au élement comme tel : voiture.age
>      Ce n'est pas recommandé car les getters / setters peuvent avoir une certaine logique (pas de nombre en dessous de 1, le modèle doit avoir un certain nombre de charactères...)
>      ,*/
>      private String modele;
>      private int age;
>      private String marque;
>  // Un constructeur permet d'initialiser l'objet avec tout ou un certain nombre d'éléments
>      public Voiture(String modele, int age, String marque) {
>          // le 'this.element' référence la classe
>          // On pourrait donc mettre :
>          // this.modele = toto;
>          // Si dans le constructeur on met 'toto' au lieu de modele
>          this.modele = modele;
>          this.age = age;
>          this.marque = marque;
>      }
>      // Ici, le constructeur ne prend que 2 paramètres, l'age est initialisé automatiquement
>      public Voiture(String modele, String marque) {
>          this.modele = modele;
>          this.age = 1;
>          this.marque = marque;
>      }
>  // Renvoi l'élément de la classe
>      public String getModele() {
>          return modele;
>      }
>      public int getAge() {
>          return age;
>      }
>      public String getMarque() {
>          return marque;
>      }
>      public void setModele(String modele) {
>          this.modele = modele;
>      }
>      public void setAge(int age) {
>          this.age = age;
>      }
>      public void setMarque(String marque) {
>          this.marque = marque;
>      }
>  // Une fonction très pratique en java est le 'equals' qui vérifie si un objet est égale à une autre instance du même objet (avec des paramètres différents)
>  /* L'utilisation de '@override' permet de redéfinir une fonction déja définit.
>  Ne pas l'utiliser est possible mais l'utiliser est une bonne pratique :
>  - Le compilateur vas check si la fonction existe dans la classe de base, si non, erreur de compilation */
>  // Tout les objets descende du primitif 'Object' qui possède des fonctions 'equals' et 'toString'
>      @Override
>      public boolean equals(Object autreVoiture) {
>          if (this == autreVoiture) {
>              return true;
>          }
>          if (autreVoiture == null) {
>              return false;
>          }
>          // getClass renvoi la classe
>          if (getClass() != autreVoiture.getClass()) {
>              return false;
>          }
>          // On fait du upcast de Object (le type le plus primitif) vers notre type Voiture
>          Voiture autre = (Voiture) autreVoiture;
>          if (modele == null) {
>              if (autre.modele != null)
>                  return false;
>          }
>          else if (!modele.equals(autre.modele)) {
>              return false;
>          }
>          if (this.age != autre.age)
>              return false;
>          if (marque == null) {
>              if (autre.marque != null)
>                  return false;
>          }
>          else if (!marque.equals(autre.marque)) {
>              return false;
>          }
>          return true;
>      }
>      // Le equals() ce dessus est correct, mais en pratique on utilise plutôt ce genre de code
>      /*
>        // On import la classe Objects qui permet de caster
>        // Les imports sont TOUJOURS en haut du code (comme en python ou autre)
>        import java.util.Objects;
>        @Override
>        public boolean equals(Object objet) {
>        if (this == objet) return true;
>        if (!(objet instanceof Voiture)) return false;
>        Voiture autre = (Voiture) objet;
>        return age == autre.age &&
>        Objects.equals(modele, autre.modele) &&
>        Objects.equals(marque, autre.marque);
>        }*/
>      @Override
>      public String toString() {
>          return "La voiture " + getMarque() +
>              " à un " + getAge() +
>              " ans et est de modèle " + getModele();
>      }
>      // Le main est la classe qui est executé, comme le main en python
>      public static void main(String[] args) {
>          Voiture v1 = new Voiture("Classe A", "Mercedes");
>          Voiture v2 = new Voiture("Capture", "Renault");
>      System.out.println(v1.toString());
>      System.out.println(v2.toString());
>      System.out.println(v1.equals(v2));
>      }
>  }
> ```

Le POO permet de donner à des objets des fonctions spécifiques

> [!CODE] java
>  ```java
>  // Dans le même fichier
>  public void vieillir() {
>      age++;
>  }
>  public boolean estAncienne() {
>      return age > 10;
>  }
> ```


### L'héritage {#l-héritage}

Un objet peut hériter d'un autre

> [!CODE] java
>  ```java
>  // le extends est UNIQUE
>  // Un objet ne peut avoir q'un seul objet père
>  public class VoitureElectrique extends Voiture {
>      private int autonomie;
>      public int getAutonomie() {
>          return autonomie;
>      }
>      public void setAutonomie(int autonomie) {
>          this.autonomie = autonomie;
>      }
>      // L'utilisation du 'super' appel la fonction de la classe de base, ici, voiture
>      public VoitureElectrique(String modele, int age, String marque, int autonomie) {
>          super(modele, age, marque); // idem que faire appel au constructeur de 'voiture'
>          this.autonomie = autonomie;
>      }
>      public VoitureElectrique(String modele, String marque, int autonomie) {
>          super(modele, 1, marque);
>          this.autonomie = autonomie;
>      }
>      @Override
>      public boolean equals(Object objet) {
>          if (!super.equals(objet)) {
>              return false;
>          }
>          if (!(objet instanceof VoitureElectrique)) {
>              return false;
>          }
>          VoitureElectrique autre = (VoitureElectrique) objet;
>          return autonomie == autre.autonomie;
>      }
>      @Override
>      public void vieillir() {
>          super.vieillir();
>          autonomie -= 10; // perte de capacité batterie
>          if (autonomie < 0) {
>              autonomie = 0;
>          }
>      }
>      public void rouler(int kilometres) {
>          int consommation = kilometres / 5; // ex: 5 km = 1 km d'autonomie
>          autonomie -= consommation;
>          if (autonomie < 0) {
>              autonomie = 0;
>          }
>      }
>      public void recharger(int km) {
>          autonomie += km;
>      }
>      public boolean batterieFaible() {
>          return autonomie < 50;
>      }
>  }
> ```


## Redéfinir un type {#redéfinir-un-type}

Le java étant un langage typé, la redéfinition des types est plus compliqué qu'en python ou JS

Certain type ont des fonctions spécifique, comme `parseInt(String)` pour le type `int`

> [!WARNING] Attention
> La documentation pour cette fonction est tel :
> 
>> [!QUOTE]
>> Parses the string argument as a signed decimal integer. The characters in the string must all be decimal digits, except that the first character may be an ASCII minus sign '-' ('\u002D') to indicate a negative value or an ASCII plus sign '+' ('\u002B') to indicate a positive value. The resulting integer value is returned, exactly as if the argument and the radix 10 were given as arguments to the parseInt(java.lang.String, int) method.
>> 
>> [Lien vers la documentation Java](https://docs.oracle.com/en/java/javase/25/docs/api/java.base/java/lang/Integer.html#parseInt(java.lang.String))
>> 
> Cela veut dire que seul des nombres (le premier caractère peut être un `+` ou un `-` pour indiquer une valeur négative ou positive) peuvent être dans le string, sinon une `exception` est levé.

> [!CODE] java
>  ```java
>  class Exemple {
>      public static void main(String[] args) {
>          String s = "-20";
>          // On utilise Integer car c'est la classe primitive des int
>          int i = Integer.parseInt(s);
>          System.out.println(i);
>      }
>  }
> ```

[^fn:1]: : Ce tableau provient de la [documentation Java](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)
