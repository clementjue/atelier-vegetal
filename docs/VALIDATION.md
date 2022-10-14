# Validation du 3 novembre 2026

## Contrôles automatiques exécutés

- `npm run check` : syntaxe des trois fichiers JavaScript, présence des fichiers référencés par la page d’entrée, traductions et références d’ingrédients des recettes. Réussi.
- `npm test` : 15 tests, 15 réussites, aucun échec. Les cas couvrent les stocks, les cultures, les prérequis de chef, la concurrence, les récompenses, les achats, le recrutement, la sauvegarde et la reprise.
- Les six recettes ont été préparées dans le moteur lors d’un scénario automatique. La partie obtenue reste valide après sérialisation JSON.

## Parcours vérifié dans le navigateur

Essai dans un navigateur Chromium, avec interaction réelle sur les contrôles :

1. Récolter la première parcelle : le stock de pousses passe de 5 à 8.
2. Semer de nouvelles pousses : 3 pièces sont déduites, la parcelle affiche son temps de croissance.
3. Choisir tomates & œufs, affecter Mei et lancer la préparation en mode attentif.
4. Recharger pendant la préparation : l’affectation et le temps restant sont conservés. Le plat est ensuite servi avec une seule attribution de 19 pièces et 3 feuilles.
5. Recevoir le défi de récolte et le panier quotidien. Le défi passe à l’état accompli et le panier quotidien devient indisponible.
6. Recevoir le défi tomates & œufs, puis recruter Bao. Le solde passe de 146 à 101 pièces et Bao devient disponible.
7. Passer au chinois, recharger, consulter le carnet : la langue, les stocks, les récompenses et le recrutement sont conservés.
8. Ouvrir une recette sur téléphone et fermer son dialogue avec la touche Échap.
9. Demander une nouvelle partie, confirmer : le panier initial de 80 pièces et les compteurs à zéro sont rétablis.

Les journaux du navigateur ne signalaient aucune erreur ni aucun avertissement au point de contrôle après le premier service.

## Mise en page

- Vue de bureau : 1440 × 1050, capture de la page complète inspectée.
- Vue mobile : 390 × 844, brigade et dialogue de recette inspectés.
- Vue étroite : 320 × 760, carnet en chinois et potager en français inspectés. Aucun débordement horizontal détecté par comparaison de la largeur du document et de la fenêtre.
- Révision visuelle : correction d’un remplissage de dessin de nouilles et du chevauchement entre l’illustration et le texte de présentation sur mobile. Révision linguistique : lien d’évitement traduit et notification temporaire masquée lors d’un changement de langue.

## Limites des contrôles

Il ne s’agit pas d’un audit WCAG complet, d’un essai multi-navigateurs ou d’une mesure d’effet pédagogique. La corruption de sauvegarde est testée au niveau du moteur ; le refus du stockage par différentes politiques de navigateur n’a pas été simulé dans le navigateur de contrôle. La nouvelle implémentation ne permet pas de vérifier le comportement du programme historique perdu.

## Édition publique

La page publiée a été ouverte sans connexion préalable. Le premier plat a été préparé, une préparation a été reprise après rechargement et les deux langues ont été vérifiées. Des requêtes HTTP anonymes sur la page, le script, la feuille de style et l’illustration renvoient 200, sans redirection. La navigation et le bandeau de présentation ont été adaptés aux fenêtres compactes pour préserver la lisibilité.
