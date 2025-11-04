+++
title = "css"
author = ["TRNEEDANAME"]
date = 2025-11-03
layout = "page"
tags = ["fiches", "web"]
draft = false
+++

## Le CSS, c'est quoi ? {#le-css-c-est-quoi}

Le `CSS`[^fn:1] est utilisé pour styliser les pages web.
Il peut utiliser des variables et conditions.

> [!CODE] css
>  ```css
>  element {
>      attribut: valeur;
>  }
> ```


## Ordre d'applications {#ordre-d-applications}

Les attributs utilise un ordre, par exemple `font-family`, `font-style`...

Le `Cascading` explique comment le CSS est appliqué.


### Cascade {#cascade}

> [!CODE] css
>  ```css
>  /* Je sélectionne l'élément paragraphe */
>  p {
>      color: red; /* Les couleurs peuvent être écrites en RGB / Hex ou utilisant des noms pour les plus communs */
>  }
>  /* Je redéfinie la couleur */
>  p {
>      color: green;
>  }
> ```


### ID et class {#id-et-class}

Les `id` et `class` sont utilisés pour différenciés des élements spécifique.

> [!CODE] css
>  ```css
>  p#souligne {
>      text-decoration: underline;
>  }
>  p.important {
>      color: red;
>      font-weight: bolder;
>  }
> ```
> 

> [!IMPORTANT]
> La `class` et le `id` sont différents !
> 
> L'`id` doit être unique dans la page (barre de navigation, titre du site, footer...) alors qu'une `class` peut être utilisé plusieurs fois.

[^fn:1]: Cascading Style Sheet
