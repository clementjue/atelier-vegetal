(function (root, factory) {
  'use strict';
  const data = typeof module !== 'undefined' && module.exports ? require('./data.js') : root.VegetalData;
  const api = factory(data);
  root.VegetalEngine = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(globalThis, function (D) {
  'use strict';
  const day = now => { const d = new Date(now); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; };
  const initial = (now = Date.now()) => ({
    version: 1, coins: 80, leaves: 0, inventory: { greens: 5, tomato: 4, egg: 3, flour: 5, pork: 2 },
    plots: [{ crop: 'greens', planted: now - 9000, ready: now - 1000 }, { crop: 'tomato', planted: now - 7000, ready: now + 5000 }, null],
    hired: ['lin', 'mei'], jobs: [], nextJob: 1, claimed: [], daily: '',
    stats: { cooked: 0, harvested: 0, eco: 0, impact: 0, avoided: 0, recipes: {} },
    log: [{ event: 'welcome', time: now }]
  });
  const integer = n => Number.isSafeInteger(n) && n >= 0 && n <= 100000000;
  function valid(s) {
    if (!s || s.version !== 1 || !integer(s.coins) || !integer(s.leaves) || !integer(s.nextJob) || typeof s.daily !== 'string') return false;
    if (!s.inventory || Object.keys(D.ingredients).some(k => !integer(s.inventory[k]))) return false;
    if (!Array.isArray(s.plots) || s.plots.length !== 3 || s.plots.some(p => p && (!D.crops[p.crop] || !Number.isFinite(p.planted) || !Number.isFinite(p.ready) || p.ready < p.planted))) return false;
    if (!Array.isArray(s.hired) || s.hired.length < 2 || new Set(s.hired).size !== s.hired.length || !['lin','mei'].every(id => s.hired.includes(id)) || s.hired.some(id => !D.chefs.some(c => c.id === id))) return false;
    if (!Array.isArray(s.jobs) || s.jobs.length > 3 || new Set(s.jobs.map(j => j.chef)).size !== s.jobs.length || s.jobs.some(j => !integer(j.id) || !D.recipes.some(r => r.id === j.recipe) || !s.hired.includes(j.chef) || !Number.isFinite(j.start) || !Number.isFinite(j.end) || j.end <= j.start || typeof j.eco !== 'boolean')) return false;
    if (!s.stats || !['cooked','harvested','eco','impact','avoided'].every(k => integer(s.stats[k])) || !s.stats.recipes || Object.entries(s.stats.recipes).some(([k,v]) => !D.recipes.some(r=>r.id===k) || !integer(v))) return false;
    if (!Array.isArray(s.claimed) || new Set(s.claimed).size !== s.claimed.length || s.claimed.some(id => !D.quests.some(q => q.id === id))) return false;
    if (!Array.isArray(s.log) || s.log.length > 40 || s.log.some(l => !l || !Number.isFinite(l.time) || typeof l.event !== 'string')) return false;
    return true;
  }
  function load(value, now = Date.now()) { return valid(value) ? structuredClone(value) : initial(now); }
  function log(s, event, time, info = {}) { s.log.unshift({ event, time, ...info }); s.log = s.log.slice(0, 30); }
  function progress(s, id) {
    if (id === 'harvest') return s.stats.harvested;
    if (id === 'eco') return s.stats.eco;
    return s.stats.recipes[id] || 0;
  }
  function advance(input, now = Date.now()) {
    const s = structuredClone(input), finished = [];
    s.jobs = s.jobs.filter(j => {
      if (j.end > now) return true;
      const r = D.recipes.find(r => r.id === j.recipe), saved = j.eco ? Math.min(2, r.impact) : 0;
      s.coins += r.coins; s.leaves += j.eco ? 3 : 1;
      s.stats.cooked++; s.stats.recipes[r.id] = (s.stats.recipes[r.id] || 0) + 1;
      s.stats.impact += r.impact - saved; s.stats.avoided += saved;
      if (j.eco) s.stats.eco++;
      log(s, 'served', j.end, { recipe: r.id, eco: j.eco }); finished.push(r.id);
      return false;
    });
    return { state: s, finished };
  }
  function act(input, action, now = Date.now()) {
    const { state: s } = advance(input, now);
    const fail = error => ({ state: s, error });
    if (action.type === 'plant') {
      const c = D.crops[action.crop], index = action.plot;
      if (!Number.isInteger(index) || index < 0 || index > 2 || !c || s.plots[index]) return fail('invalid');
      if (s.coins < c.price) return fail('coins');
      s.coins -= c.price; s.plots[index] = { crop: action.crop, planted: now, ready: now + c.seconds * 1000 };
      log(s, 'planted', now, { crop: action.crop });
    } else if (action.type === 'harvest') {
      const p = s.plots[action.plot];
      if (!Number.isInteger(action.plot) || action.plot < 0 || action.plot > 2 || !p || p.ready > now) return fail('notready');
      const c = D.crops[p.crop]; s.inventory[p.crop] += c.yield; s.stats.harvested += c.yield;
      log(s, 'harvested', now, { crop: p.crop, amount: c.yield }); s.plots[action.plot] = null;
    } else if (action.type === 'cook') {
      const r = D.recipes.find(r => r.id === action.recipe), c = D.chefs.find(c => c.id === action.chef);
      if (!r || !c || !s.hired.includes(c.id)) return fail('invalid');
      if (c.skill < r.skill) return fail('skill');
      if (s.jobs.some(j => j.chef === c.id)) return fail('busy');
      if (Object.entries(r.ingredients).some(([k,n]) => s.inventory[k] < n)) return fail('ingredients');
      Object.entries(r.ingredients).forEach(([k,n]) => s.inventory[k] -= n);
      const eco = action.eco === true, seconds = Math.max(2, Math.ceil(r.seconds * c.speed) + (eco ? 1 : 0));
      s.jobs.push({ id: s.nextJob++, recipe: r.id, chef: c.id, start: now, end: now + seconds * 1000, eco });
      log(s, 'cooking', now, { recipe: r.id });
    } else if (action.type === 'buy') {
      const i = D.ingredients[action.ingredient];
      if (!i || !i.price) return fail('invalid');
      if (s.coins < i.price) return fail('coins');
      s.coins -= i.price; s.inventory[action.ingredient] += 3;
      log(s, 'bought', now, { ingredient: action.ingredient });
    } else if (action.type === 'hire') {
      const c = D.chefs.find(c=>c.id===action.chef);
      if (!c || s.hired.includes(c.id)) return fail('invalid');
      if (s.coins < c.price) return fail('coins');
      s.coins -= c.price; s.hired.push(c.id); log(s,'hired',now,{chef:c.id});
    } else if (action.type === 'claim') {
      const q = D.quests.find(q=>q.id===action.quest);
      if (!q || s.claimed.includes(q.id) || progress(s,q.id) < q.goal) return fail('notready');
      s.claimed.push(q.id); s.coins += q.reward; log(s,'quest',now,{quest:q.id});
    } else if (action.type === 'daily') {
      if (s.daily === day(now)) return fail('claimed');
      s.daily = day(now); s.coins += 15; s.inventory.egg += 2; log(s,'daily',now);
    } else return fail('invalid');
    return { state: s, error: null };
  }
  return { initial, valid, load, advance, act, progress, day };
});
