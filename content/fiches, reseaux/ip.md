+++
title = "IP"
author = ["TRNEEDANAME"]
date = 2025-11-24
layout = "page"
tags = ["fiches"]
draft = false
+++

## Les IP, c'est quoi ? {#les-ip-c-est-quoi}

Une IP c'est une adresse qui permet de référencer une machine connecté à Internet.

Il y a deux types d'adresses, `IP v4` et `IP v6`

Les `IP v4` sont écrites en décimales sur `4` octets, les `IP v6` sont en hexadécimales sur `6` octets.


## IP v4 {#ip-v4}

> [!MEMO] Les ID
> Les adresses IP v4 sont découpés en 2 parties :
> 
> -   ID réseau
> -   ID hôte
> 
> L'id de réseau permet de connaître le réseau auquel la machine est connecté, l'id d'hôte permet de connaître la machine
> 
>> [!IMPORTANT]
>> Sans le masque il est impossible de savoir ou l'adresse réseau finit !

> [!TIP] A savoir
> Il y a 2 adresses qui ne peuvent être attribués, `0` et `255`
> 
> -   `0` est l'adresse de réseau
> -   `255` est l'adresse de broadcast
> 
> Le nombre d'adresse total est donc `2^n - 1` ou `n` est le masque en notation bits (aussi appelé CIDR)


### Le masque {#le-masque}

Le masque est sur 4 octets et s'écrit en décimal ou bits
Il permet de savoir ou l'id de réseaux finit (tout les bits à 1 sur le masque sont le réseau)

> [!NOTE] Exemple
> `143.177.222.11/16` définit le masque comme faisant 16 bits, donc 2 octets.
> 
> On peut aussi écrire le masque comme faisant `255.255.0.0`
> 
> L'id de réseau est donc `143.177`, l'id d'hôte est donc `222.11`


### Les sous réseaux {#les-sous-réseaux}

Pour les sous réseaux, une fiche spéciale à été faite [ Sous Séseaux ]({{< relref "sous-reseaux" >}})
