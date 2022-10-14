'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname,'../dist');
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
for(const file of ['data.js','engine.js','app.js']) new vm.Script(fs.readFileSync(path.join(root,file),'utf8'),{filename:file});
for(const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
  const ref = match[1]; if(ref.startsWith('#')||/^https?:/.test(ref))continue;
  if(!fs.existsSync(path.join(root,ref)))throw new Error('Missing asset: '+ref);
}
const D = require('../dist/data.js');
for(const r of D.recipes){
  if(!r.fr||!r.zh||!r.tipFr||!r.tipZh)throw new Error('Incomplete recipe translation: '+r.id);
  for(const i of Object.keys(r.ingredients))if(!D.ingredients[i])throw new Error('Unknown ingredient: '+i);
}
console.log('JavaScript syntax, entry-point assets and recipe references: OK');
