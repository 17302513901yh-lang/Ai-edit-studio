// Deployment gate for the buildless project site: check local assets and fragment destinations.
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=fileURLToPath(new URL('../docs/site/',import.meta.url));
const html=await fs.readFile(path.join(root,'index.html'),'utf8');
const ids=new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
let checked=0;
async function check(ref,base=root){
  if(!ref || /^(?:https?:|data:|mailto:)/.test(ref))return;
  if(ref.startsWith('#')){if(!ids.has(ref.slice(1)))throw Error(`Missing fragment ${ref}`);return;}
  const file=path.resolve(base,ref.split(/[?#]/)[0]);
  if(file!==root.slice(0,-1)&&!file.startsWith(root))throw Error(`Asset outside site: ${ref}`);
  await fs.access(file);checked++;
}
for(const [,ref] of html.matchAll(/(?:href|src)="([^"]+)"/g))await check(ref);
const css=await fs.readFile(path.join(root,'style.css'),'utf8');
for(const [,ref] of css.matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g))await check(ref);
const png=await fs.readFile(path.join(root,'assets/social-card.png'));
if(png.subarray(1,4).toString()!=='PNG')throw Error('Sharing image is not PNG');
if(png.readUInt32BE(16)!==1200||png.readUInt32BE(20)!==630)throw Error('Sharing image must be 1200 × 630');
const editorIcon=await fs.readFile(new URL('../public/brand/icon.png',import.meta.url));
if(!editorIcon.equals(await fs.readFile(path.join(root,'assets/icon.png'))))throw Error('Editor and website icons differ');
const {agentTools}=await import('../src/agent-tools.mjs');
if(!html.includes(`<strong>${agentTools.length}</strong>`))throw Error('Website tool count is out of date');
console.log(`Website OK: ${checked} local references, fragment links, social image, shared icon, ${agentTools.length} tools.`);
