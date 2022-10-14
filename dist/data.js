(function (root) {
  'use strict';
  const data = {
    crops: {
      greens: { fr: 'Jeunes pousses', zh: '青菜', seconds: 8, yield: 3, price: 3, icon: 'greens' },
      tomato: { fr: 'Tomates du jardin', zh: '番茄', seconds: 12, yield: 3, price: 4, icon: 'tomato' },
      flour: { fr: 'Blé tendre', zh: '小麦', seconds: 15, yield: 3, price: 4, icon: 'wheat' }
    },
    ingredients: {
      greens: { fr: 'Pousses', zh: '青菜', icon: 'greens' },
      tomato: { fr: 'Tomates', zh: '番茄', icon: 'tomato' },
      egg: { fr: 'Œufs', zh: '鸡蛋', icon: 'egg', price: 5 },
      flour: { fr: 'Farine', zh: '面粉', icon: 'wheat' },
      pork: { fr: 'Porc', zh: '猪肉', icon: 'pork', price: 8 }
    },
    recipes: [
      { id: 'greens', fr: 'Pousses sautées', zh: '清炒青菜', subFr: 'Le jardin dans l’assiette', subZh: '从菜园到餐桌', ingredients: { greens: 2 }, skill: 1, seconds: 4, coins: 12, impact: 2, category: 'vegetal', art: 'greens', tipFr: 'Un rinçage dans une bassine permet de réutiliser l’eau pour le jardin.', tipZh: '用盆接水洗菜，洗菜水可以再次利用。' },
      { id: 'tomatoegg', fr: 'Tomates & œufs', zh: '番茄炒蛋', subFr: 'Un classique tout en couleurs', subZh: '熟悉的家常味道', ingredients: { tomato: 2, egg: 1 }, skill: 2, seconds: 5, coins: 19, impact: 4, category: 'maison', art: 'tomatoegg', tipFr: 'Essuyer les ustensiles gras avant de les laver limite les résidus dans l’évier.', tipZh: '先擦去锅具上的余油，再进行清洗。' },
      { id: 'noodles', fr: 'Nouilles du potager', zh: '阳春面', subFr: 'Un bol simple, un vrai plaisir', subZh: '一碗面，也有讲究', ingredients: { flour: 2, greens: 1 }, skill: 2, seconds: 5, coins: 17, impact: 3, category: 'vegetal', art: 'noodles', tipFr: 'Adapter la quantité d’eau à la casserole évite de chauffer plus que nécessaire.', tipZh: '根据锅具和食材控制用水量，避免加热多余的水。' },
      { id: 'pancake', fr: 'Galette du jardin', zh: '葱香鸡蛋饼', subFr: 'Dorée, moelleuse, à partager', subZh: '金黄松软，适合分享', ingredients: { flour: 2, egg: 1, greens: 1 }, skill: 3, seconds: 6, coins: 24, impact: 4, category: 'maison', art: 'pancake', tipFr: 'Préparer la juste portion réduit les restes. Gardez les ingrédients inutilisés.', tipZh: '按需准备份量，保留未使用的食材，减少剩余。' },
      { id: 'pork', fr: 'Porc rôti aux herbes', zh: '香烤猪颈肉', subFr: 'La recette du dimanche', subZh: '周末的拿手菜', ingredients: { pork: 2, greens: 1 }, skill: 4, seconds: 7, coins: 29, impact: 7, category: 'maison', art: 'pork', tipFr: 'Le tri des restes et des graisses fait partie du service, dès la préparation.', tipZh: '从备菜开始，分类处理厨余和油脂也是厨房工作的一部分。' },
      { id: 'tomatosalad', fr: 'Tomates à partager', zh: '凉拌番茄', subFr: 'La fraîcheur sans cuisson', subZh: '无需开火的清新选择', ingredients: { tomato: 2 }, skill: 1, seconds: 3, coins: 11, impact: 1, category: 'vegetal', art: 'salad', tipFr: 'Une recette sans cuisson permet de varier le menu avec une autre préparation.', tipZh: '不用开火的菜谱，为菜单增加一种不同的制作方式。' }
    ],
    chefs: [
      { id: 'lin', fr: 'Lin', zh: '小林', roleFr: 'La main sûre', roleZh: '稳稳掌勺', skill: 4, speed: 1, color: '#d8956d', price: 0 },
      { id: 'mei', fr: 'Mei', zh: '小梅', roleFr: 'L’esprit du potager', roleZh: '菜园好手', skill: 3, speed: 0.85, color: '#799579', price: 0 },
      { id: 'bao', fr: 'Bao', zh: '阿包', roleFr: 'Le coup de feu', roleZh: '出菜飞快', skill: 5, speed: 0.65, color: '#d1af57', price: 45 }
    ],
    quests: [
      { id: 'harvest', fr: 'Du jardin à la cuisine', zh: '从菜园到厨房', detailFr: 'Récolter 3 ingrédients', detailZh: '收获 3 份食材', goal: 3, reward: 15 },
      { id: 'greens', fr: 'Le vert à l’honneur', zh: '青菜登场', detailFr: 'Servir 2 pousses sautées', detailZh: '完成 2 份清炒青菜', goal: 2, reward: 25 },
      { id: 'tomatoegg', fr: 'Le goût de la maison', zh: '家的味道', detailFr: 'Servir 1 tomates & œufs', detailZh: '完成 1 份番茄炒蛋', goal: 1, reward: 20 },
      { id: 'eco', fr: 'Les petits gestes comptent', zh: '小行动，也重要', detailFr: 'Cuisiner 3 fois en mode attentif', detailZh: '使用节约模式完成 3 次烹饪', goal: 3, reward: 30 }
    ]
  };
  root.VegetalData = data;
  if (typeof module !== 'undefined' && module.exports) module.exports = data;
})(globalThis);
