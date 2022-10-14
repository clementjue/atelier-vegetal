# Intentions et décisions produit

## Problème

Les documents de 2023 proposent d’intégrer des contenus sur l’alimentation et les rejets de cuisine au fil d’un jeu. Afficher une information sur une fiche suffit à la rendre visible, sans garantir que le joueur la comprend ou modifie ses choix.

## Hypothèse à explorer

Une petite boucle de jeu, dans laquelle un choix de préparation produit un retour visible, pourrait faciliter la compréhension de ces arbitrages. Ce prototype permet d’essayer cette hypothèse ; il n’a pas encore démontré d’effet pédagogique.

## Première version jouable

Le joueur peut récolter, semer, gérer son stock, choisir parmi six recettes, affecter un chef disponible et comparer deux modes de préparation. Le jeu applique les prérequis, attend la préparation puis verse les récompenses. Les défis donnent un premier parcours et le carnet conserve les découvertes.

Deux chefs sont disponibles au départ. Un troisième peut être recruté. Le marché évite de bloquer la partie par manque d’œufs ou de porc. Le démarrage fournit assez d’ingrédients pour tester la boucle sans attendre une longue culture.

## Décisions et compromis

| Décision | Raison | Limite |
| --- | --- | --- |
| Durées de quelques secondes | Une démonstration en entretien doit permettre de voir une conséquence complète. | Ne permet pas d’évaluer la rétention à long terme. |
| Préparation attentive : une seconde de plus, jusqu’à deux points de pression en moins | Rend visible un compromis simple entre cadence et score. | Le paramétrage est fictif et ne constitue pas une mesure environnementale. |
| Une préparation par chef | Rend l’affectation et la disponibilité compréhensibles. | Simplifie fortement une vraie cuisine. |
| Stock réservé au démarrage | Évite de lancer plusieurs plats avec les mêmes ingrédients. | Il n’y a pas d’annulation de préparation dans cette version. |
| Attribution des récompenses à la fin | Relie la récompense à un plat réellement terminé dans le jeu. | Le moteur local n’est pas adapté à une économie multijoueur. |
| Sauvegarde dans le navigateur | Permet une démo sans compte, sans clé et sans envoi de données. | Pas de continuité entre appareils ni de sauvegarde cloud. |
| Illustrations nouvelles | Donne une identité propre au prototype et permet de le montrer sans embarquer les captures de référence. | Ne reproduit pas à l’identique les écrans historiques. |

## Critères d’acceptation

- Une récolte précoce et une répétition de récolte ne créent aucun stock supplémentaire.
- Une recette sans les ingrédients nécessaires ne consomme rien et ne démarre pas.
- Un chef occupé ou de compétence insuffisante ne peut pas être affecté.
- Une préparation terminée, y compris après fermeture et retour, produit exactement une récompense.
- Un défi et un panier quotidien ne se réclament pas deux fois pour la même condition.
- La partie continue après changement de langue et rechargement.
- La version mobile permet de parcourir les cinq sections et d’utiliser les dialogues.

## Ce qu’il faudrait apprendre ensuite

Faire essayer le premier service à quelques personnes et observer si elles trouvent la récolte, comprennent la disponibilité des chefs et peuvent expliquer l’effet du mode attentif. Consigner les tâches réussies, les hésitations et les corrections apportées. Aucun chiffre d’usage ou de gain n’est revendiqué à ce stade.
