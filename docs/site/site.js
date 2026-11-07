const workflows = {
  shorts: {kicker:'MAKE THE FIRST SECONDS COUNT',title:'The best moments.\nMade to travel.',description:'Find sentence-aligned highlights, cut the dead air, add captions from your transcript and reframe for the feed.',items:['Director mode for Shorts, Reels and TikTok','Animated captions that follow your cuts','Vertical, square and portrait exports'],caption:['TAKE THE','SCENIC ROUTE.']},
  talks: {kicker:'GIVE EVERY WORD ITS SPACE',title:'A good conversation.\nA tighter cut.',description:'Work from the transcript. Remove filler words and long pauses, assemble your best passages and let the captions follow.',items:['Import SRT/VTT or use optional local transcription','Paper edits and sentence-aligned clips','Audio sync, multicam and dialogue repair'],caption:['LESS DEAD AIR.','MORE STORY.']},
  trailers: {kicker:'BUILD UP TO THE BIG MOMENT',title:'Find the hook.\nLand the reveal.',description:'Bring your gameplay footage. Choose the opening, cut to the beat and build a trailer with your own titles, sound and brand.',items:['Game-trailer recipes and reusable brand kits','Local music composition and beat sync','Preview, check and export your final cut'],caption:['SET THE SCENE.','MAKE THE CUT.']}
};
const tabs = [...document.querySelectorAll('[data-workflow]')];
function selectWorkflow(tab) {
  const w = workflows[tab.dataset.workflow];
  for (const t of tabs) { t.setAttribute('aria-selected', String(t === tab)); t.tabIndex = t === tab ? 0 : -1; }
  document.querySelector('#workflow-panel').setAttribute('aria-labelledby', tab.id);
  document.querySelector('#workflow-kicker').textContent = w.kicker;
  const title = document.querySelector('#workflow-title'); title.replaceChildren();
  w.title.split('\n').forEach((s,i) => { if(i) title.append(document.createElement('br')); title.append(document.createTextNode(s)); });
  document.querySelector('#workflow-description').textContent = w.description;
  document.querySelector('#workflow-list').replaceChildren(...w.items.map(text => {const li=document.createElement('li');li.textContent=text;return li;}));
  const caption=document.querySelector('#workflow-caption'), mark=document.createElement('mark');mark.textContent=w.caption[1];caption.replaceChildren(document.createTextNode(w.caption[0]),document.createElement('br'),mark);
}
for (const tab of tabs) {
  tab.addEventListener('click', () => selectWorkflow(tab));
  tab.addEventListener('keydown', event => {let index=tabs.indexOf(tab);if(event.key==='ArrowRight') index=(index+1)%tabs.length;else if(event.key==='ArrowLeft') index=(index+tabs.length-1)%tabs.length;else if(event.key==='Home') index=0;else if(event.key==='End') index=tabs.length-1;else return;event.preventDefault();tabs[index].focus();selectWorkflow(tabs[index]);});
}
const copyButton=document.querySelector('#copy-install'), status=document.querySelector('#copy-status');
copyButton.addEventListener('click',async()=>{
  const text=document.querySelector('#install-code').textContent;
  try { await navigator.clipboard.writeText(text);copyButton.textContent='Copied ✓';status.textContent='Installation commands copied. Run them in your terminal.'; }
  catch { const range=document.createRange();range.selectNodeContents(document.querySelector('#install-code'));const selection=window.getSelection();selection.removeAllRanges();selection.addRange(range);status.textContent='Commands selected. Press Ctrl+C (or Command+C) to copy.'; }
});
const play=document.querySelector('#demo-play'), editor=document.querySelector('.editor'), head=document.querySelector('#playhead'), clock=document.querySelector('#demo-time');
let running=false, start=0, elapsed=0, raf;
function frame(now){if(!running)return;elapsed=(now-start)%16000;head.style.left=`${8+elapsed/16000*87}%`;clock.textContent=`00:00:${String(Math.floor(elapsed/1000)).padStart(2,'0')}`;raf=requestAnimationFrame(frame);}
function pause(){running=false;cancelAnimationFrame(raf);editor.classList.remove('is-playing');play.setAttribute('aria-pressed','false');play.setAttribute('aria-label','Play timeline illustration');play.replaceChildren(Object.assign(document.createElement('span'),{className:'play-symbol'}));}
play.addEventListener('click',()=>{if(running){pause();return;}running=true;start=performance.now()-elapsed;editor.classList.add('is-playing');play.setAttribute('aria-pressed','true');play.setAttribute('aria-label','Pause timeline illustration');play.replaceChildren(Object.assign(document.createElement('span'),{className:'pause-symbol'}));raf=requestAnimationFrame(frame);});
document.addEventListener('visibilitychange',()=>{if(document.hidden)pause();});
