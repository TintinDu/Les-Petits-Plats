# Les-Petits-Plats

Projet n°7 OpenClassrooms :

Développez un algorithme de recherche en JavaScript

Scénario nominal

1. Le cas d’utilisation commence lorsque l’utilisateur entre au moins 3 caractères dans la barre de recherche principale. ✅
2. Le système recherche des recettes correspondant à l’entrée utilisateur dans: le titre de la recette, la liste des ingrédients de la recette,la description de la recette. ✅
3. L’interface est actualisée avec les résultats de recherche ✅
4. Les champs de recherche avancées ont actualisés avec les informations ingrédients, ustensiles, appareil des différentes recettes restantes ✅
5. L’utilisateur précise sa recherche grâce à l’un des champs: ingrédients, ustensiles, appareil. ✅
6. Au fur et à mesure du remplissage, les mots-clés ne correspondant pas à la frappe dans le champ disparaissent. Par exemple, si l’utilisateur entre “coco” dans la liste d’ingrédients, seuls vont rester “noix de coco” et “lait de coco”. ✅
7. L’utilisateur choisit un mot-clé dans le champ. ✅
8. Le mot-clé apparaît sous forme de tags sous la recherche principale. ✅
9. Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les champs de recherche avancée. ✅
10. L’utilisateur sélectionne une recette. ✅

Cas d’utilisation

Scénario alternatif A1
Aucune recette correspondante à la recherche
L'enchaînement A1 commence au point 3 du scénario nominal 3.

1. L’interface affiche «Aucune recette ne contient ‘XXX’, vous pouvez chercher « tarte aux pommes », « poisson », etc. (le XXX correspond à ce que l’utilisateur a écrit dans la recherche). ✅

Scénario alternatif A2
L’utilisateur commence sa recherche par un tag
L'enchaînement A2 commence au point 1 du scénario nominal et reprend au point 9 du scénario nominal.

1. L’utilisateur commence la recherche par un tag. ✅
2. Les résultats de recherche sont actualisés ✅ , ainsi que les éléments disponibles dans les champs de recherche avancée (9 du cas principal) ✅

Scénario alternatif A3
L’utilisateur ajoute d’autres tags pour la recherche avancée
L'enchaînement A3 commence au point 9 du scénario nominal. Cet enchaînement peut se répéter autant que nécessaire

1. L’utilisateur précise sa recherche grâce à l’un des champs : ingrédients, ustensiles,appareil. ✅
2. Au fur et à mesure du remplissage les mots clés ne correspondant pas à la frappe dans le champ disparaissent ✅
3. L’utilisateur choisit un mot clé dans le champ ✅
4. Le mot clé apparaît sous forme de tag sous la recherche principale ✅
5. Les résultats de recherche sont actualisés, ainsi que les éléments disponibles dans les champs de recherche avancée ✅

Règles de gestion
Ces points doivent absolument être respectés durant le développement:

1. La recherche doit pouvoir se faire via le champ principal ou via les tags (ingrédients, ustensiles ou appareil). ✅
2. La recherche principale se lance à partir de 3 caractères entrés par l’utilisateur dans la barre de recherche. ✅
3. La recherche s’actualise pour chaque nouveau caractère entré. ✅
4. La recherche principale affiche les premiers résultats le plus rapidement possible. ✅
5. Les champs ingrédients, ustensiles et appareil de la recherche avancée proposent seulement les éléments restant dans les recettes présentes sur la page. ✅
6. Les retours de recherche doivent être une intersection des résultats. Si l’on ajoute les tags “coco” et “chocolat” dans les ingrédients, on doit récupérer les recettes qui ont à la fois de la coco et du chocolat. ✅
7. Comme pour le reste du site, le code HTML et CSS pour l’interface devra passer avec succès le validateur W3C. ??
8. Aucune librairie ne sera utilisée pour le JavaScript du moteur de recherche. ✅

TODO: Garder les filtres quand le champ recherche est réinitialisé ❌
TODO: Maintenir le background color jaune et la petite croix de l'item sélectionné dans la liste ❌
TODO: Parfois quand on retire un filtre, il n'est pas prix en compte ❌
