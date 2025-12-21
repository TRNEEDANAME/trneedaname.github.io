+++
title = "java"
author = ["TRNEEDANAME"]
date = 2025-12-18
layout = "page"
tags = ["fiches"]
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

> [!TIP] Les différents types de variables
> En java, les variables peuvent être initialisés de différentes façon.
> 
>> [!NOTE] La visibilité
>> 
>> 
>> En java, le code est divisé en `package` (la partie `UI` /)
>> 
>> | Modifier    | Class | Package | Subclass | World |
>> |-------------|-------|---------|----------|-------|
>> | public      | Y     | Y       | Y        | Y     |
>> | protected   | Y     | Y       | Y        | N     |
>> | no modifier | Y     | Y       | N        | N     |
>> | private     | Y     | N       | N        | N     |
>> 
>>> [!CODE] java
>>>  ```java
>>>  int maVariable = 0;
>>>  int public maVariable = 0;
>>>  int protected maVariable = 0;
>>> ```
