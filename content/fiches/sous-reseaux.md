+++
title = "sous-reseaux"
author = ["TRNEEDANAME"]
date = 2025-12-04
layout = "page"
tags = ["fiches", "reseaux"]
draft = false
+++

## Les sous-réseaux, c'est quoi {#les-sous-réseaux-c-est-quoi}

> [!INFO]
> Un sous-réseaux permet de découper un réseaux en plusieurs petit réseaux.

On utilise la partie **hôte** pour les calculer.

Par exemple, le réseau `192.168.13.0/24` utilisera le dernière octet pour les sous-réseaux.


## Les formules {#les-formules}


### Nombre de sous-réseaux {#nombre-de-sous-réseaux}

> [!TIP] Calcul
> `2^n` ou `n` est le nombre de bits à utiliser (si on veut 7 sous réseaux, `n` fera donc 4 car `2³=8` ce qui est trop petit)


### Nombre de bits hôte {#nombre-de-bits-hôte}

> [!TIP] Calcul
> `32 - réseaux`, si on à une adresse en 24, le nombre de bits utilisable pour l'hôte sont `32-24`, donc 8


### Nombre d'hôte utilisable {#nombre-d-hôte-utilisable}

> [!TIP] Calcul
> Le nombre d'hôte utilisable est calculr comme qui suit : `2^n-2` ou `n` est le nombre de bits de l'hôte
> Les 2 adresses à retirer sont l'adresse de réseau et celle de broadcast


## Exemple {#exemple}


### Calcul de sous-réseaux {#calcul-de-sous-réseaux}

-   adresse `221.34.32.0/24`

On veut 6 sous réseaux

1.  On trouve combien de bits on utilise

Il faut `2^3` bits car `2^3=8` (`2^2` est trop petit)
Le masque final sera donc : `24+3=27`

Donc le masque en CIDR sera : `255.255.255.224` (`24` en binaire donne `1110 0000`)


### Calcul du nombres de sous-réseaux en fonction du nombre d'hôtes {#calcul-du-nombres-de-sous-réseaux-en-fonction-du-nombre-d-hôtes}

-   adresse : `167.83.0.0/16`

On veut le nombre maximal de sous-réseaux pouvant acceuilir 1150 hôtes

1.  On décompose le nombre d'hôtes en binaire

1150 = `0100 0111 1110` (1024+64+32+16+8+4+2)
Il faut donc `11` bits pour calculer ce nombre d'hôtes

On sait que le nombre de bits disponible est de `16` (32 - 16)
`16 - 11 = 5`

Le nombre de sous réseaux maximal est donc `5`
