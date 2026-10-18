(function(){
var q=document.getElementById('prQ'),box=document.getElementById('prRes');if(!q||!box)return;
var D=null,S={},hits=[],sel=0,t;
function norm(s){return String(s==null?'':s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function yr(y){return y==null?'n.d.':(y<0?(-y)+' BCE':y);}
function load(){return prData().then(function(J){if(D)return;S=J.sections;D=J.entries.map(function(e){return{e:e,t:norm(e.t),b:norm(e.by),h:norm([e.s,(e.kw||[]).join(' '),(e.pl||[]).map(function(p){return p.n;}).join(' '),e.k,e.src,e.c].join(' '))};});});}
function find(v){var n=norm(v).trim(),k=n.split(/\s+/).filter(Boolean),out=[];if(!k.length)return out;
 D.forEach(function(d){var sc=0;for(var i=0;i<k.length;i++){var w=k[i],p=d.t.indexOf(w);
  var bs=d.b.indexOf(w)===0||d.b.indexOf(' '+w)>=0?7:(d.b.indexOf(w)>=0?3:0);
  if(p===0)sc+=6;else if(p>0)sc+=(d.t.indexOf(' '+w)>=0?5:3);else if(!bs&&d.h.indexOf(w)>=0)sc+=1;else if(!bs)return;sc+=bs;}
  if(d.t===n||d.t.replace(/^(the|a|an) /,'')===n)sc+=20;else if(d.t.indexOf(n)===0)sc+=8;
  out.push([sc,d]);});
 out.sort(function(a,b){return b[0]-a[0]||a[1].t.localeCompare(b[1].t);});return out.map(function(x){return x[1].e;});}
function href(e,v){return '/'+S[e.x].path+'/#q='+encodeURIComponent(v);}
function place(){var r=q.getBoundingClientRect();box.style.top=Math.max(12,Math.min(r.top,window.innerHeight-300))+'px';}
function open(o){box.hidden=!o;q.setAttribute('aria-expanded',o?'true':'false');if(o)place();}
function draw(){var v=q.value.trim();if(!v){open(false);return;}
 if(!D){box.innerHTML='<div class="pr-none">Opening the files…</div>';open(true);load().then(draw).catch(function(){box.innerHTML='<div class="pr-none">The files could not be loaded. Try again in a moment.</div>';});return;}
 hits=find(v);sel=0;var by={};hits.forEach(function(e){by[e.x]=(by[e.x]||0)+1;});
 if(!hits.length){box.innerHTML='<div class="pr-none">Nothing in the files matches <b>'+esc(v)+'</b>. Try fewer words or an author’s surname.</div>';open(true);return;}
 var h='<div class="pr-rh"><span><b>'+hits.length+'</b> '+(hits.length===1?'entry':'entries')+'</span>'+Object.keys(S).filter(function(x){return by[x];}).map(function(x){return '<a href="/'+S[x].path+'/#q='+encodeURIComponent(v)+'">'+esc(S[x].label)+' '+by[x]+'</a>';}).join('')+'</div>';
 h+=hits.slice(0,12).map(function(e,i){return '<a class="pr-hit'+(i===0?' on':'')+'" role="option" href="'+href(e,e.t.split(':')[0])+'"><div class="pr-ht">'+esc(e.t)+'</div><div class="pr-hm"><i>'+esc(S[e.x].label)+'</i>'+esc(e.k)+' · '+yr(e.y)+(e.by?' · '+esc(e.by):'')+'</div>'+(e.pending?'':'<div class="pr-hs">'+esc(e.s)+'</div>')+'</a>';}).join('');
 h+='<div class="pr-rf">'+(hits.length>12?'Showing 12 of '+hits.length+'. Open a format above for the rest. ':'')+'Arrows to move, Enter to open, Esc to close.</div>';
 box.innerHTML=h;open(true);}
function mark(){var a=box.querySelectorAll('.pr-hit');a.forEach(function(x,i){x.classList.toggle('on',i===sel);});if(a[sel])a[sel].scrollIntoView({block:'nearest'});}
q.addEventListener('focus',function(){load().catch(function(){});if(q.value.trim())draw();});
q.addEventListener('input',function(){clearTimeout(t);t=setTimeout(draw,90);});
q.addEventListener('keydown',function(ev){var a=box.querySelectorAll('.pr-hit');
 if(ev.key==='ArrowDown'){ev.preventDefault();if(a.length){sel=Math.min(sel+1,a.length-1);mark();}}
 else if(ev.key==='ArrowUp'){ev.preventDefault();if(a.length){sel=Math.max(sel-1,0);mark();}}
 else if(ev.key==='Enter'){ev.preventDefault();if(a[sel]){var u=a[sel].getAttribute('href');open(false);location.href=u;if(location.pathname===u.split('#')[0])location.reload();}}
 else if(ev.key==='Escape'){open(false);q.blur();}});
box.addEventListener('click',function(ev){var a=ev.target.closest('a');if(!a)return;var u=a.getAttribute('href');open(false);if(location.pathname===u.split('#')[0]){ev.preventDefault();location.href=u;location.reload();}});
document.addEventListener('mousedown',function(ev){if(!box.hidden&&!box.contains(ev.target)&&ev.target!==q)open(false);});
document.addEventListener('keydown',function(ev){if(ev.key==='/'&&!/^(INPUT|TEXTAREA|SELECT)$/.test((document.activeElement||{}).tagName||'')){ev.preventDefault();q.focus();q.select();}});
window.addEventListener('resize',function(){if(!box.hidden)place();});
})();