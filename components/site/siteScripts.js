/* Behaviour for the Fundu marketing website, ported from the approved design.
   Runs once per page load from <SiteScripts />. Features look for their own
   elements and do nothing on pages that don't have them. Honours
   prefers-reduced-motion exactly as the design does. */
export function runSiteScripts() {
  let disposed = false;
  const controller = new AbortController();
  const timeouts = new Set();
  const intervals = new Set();
  const frames = new Set();
  const observers = new Set();
  const listen = (element, event, callback, options = {}) => {
    element?.addEventListener(event, callback, { ...options, signal: controller.signal });
  };
  const setTimeout = (callback, delay) => {
    if (disposed) return null;
    const id = window.setTimeout(() => { timeouts.delete(id); if (!disposed) callback(); }, delay);
    timeouts.add(id);
    return id;
  };
  const requestAnimationFrame = callback => {
    if (disposed) return null;
    const id = window.requestAnimationFrame(time => { frames.delete(id); if (!disposed) callback(time); });
    frames.add(id);
    return id;
  };
  const IntersectionObserver = window.IntersectionObserver ? class extends window.IntersectionObserver {
    constructor(callback, options) {
      super((entries, observer) => { if (!disposed) callback(entries, observer); }, options);
      observers.add(this);
    }
  } : null;


(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fsRoot=document.querySelector('.fundu-site'); if(fsRoot) fsRoot.classList.add('js');
  (function(){ try{
  // hero loop
  var ph=document.getElementById('hphone'), st=document.getElementById('hstage'), pb=document.getElementById('hpause'), fill=document.getElementById('hbarFill');
  if(!ph||!st||!pb||!fill) return;
  var seq=[[0,900],[1,1500],[2,1300],[3,1900],[4,2300],[5,1500],[6,1400],[7,3400]], i=0, timer=null, paused=false, visible=true;
  var CAP=['A goal gets shared in the family group','Ada posts Tobi’s Fundu link','Kemi taps the link to read more','The page explains everything in one place','Kemi copies Tobi’s account number','She sends money from her own bank app','Done. It went straight to Tobi’s account','She shares the receipt with the group'], hcall=document.getElementById('hcall'), hcN=document.getElementById('hcN'), hcT=document.getElementById('hcT');
  function caption(n){ if(hcT.textContent===CAP[n]&&+hcN.textContent===n+1) return; hcall.classList.add('swap'); setTimeout(function(){ hcN.textContent=n+1; hcT.textContent=CAP[n]; hcall.dataset.n=n; hcall.classList.remove('swap'); },220); }
  function show(n){ ph.dataset.step=n; caption(n); fill.style.setProperty('--p', n>=3&&n<=4?'42%':'0%'); st.dataset.alert=(n===7)?'on':'off'; }
  function tick(){ show(seq[i][0]); timer=setTimeout(function(){ timer=null; i=(i+1)%seq.length; if(!paused&&visible&&!document.hidden) tick(); }, seq[i][1]); }
  function resume(){ if(!timer&&!paused&&visible&&!document.hidden) tick(); }
  if(reduce){ show(4); st.dataset.alert='on'; } else {
    tick();
    listen(st, 'mouseenter', function(){ if(!pb.matches('[aria-pressed="true"]')){ paused=true; } });
    listen(st, 'mouseleave', function(){ if(pb.getAttribute('aria-pressed')!=='true'){ paused=false; resume(); } });
    listen(pb, 'click', function(){ var p=pb.getAttribute('aria-pressed')!=='true'; pb.setAttribute('aria-pressed', p); paused=p; pb.setAttribute('aria-label', p?'Play animation':'Pause animation');
      pb.innerHTML = p ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z"></path></svg>' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M9 5v14M15 5v14"></path></svg>';
      if(!p) resume(); });
    if('IntersectionObserver' in window) new IntersectionObserver(function(es){ visible=es[0].isIntersecting; resume(); }).observe(st);
    listen(document, 'visibilitychange', resume);
  }

  }catch(e){ if(process.env.NODE_ENV!=="production") console.warn("[fundu-site]", e); } })();
  
  (function(){ try{
  // fit tall scenes to the screen height (short laptop screens)
  var stg=document.getElementById('hstage'), jcol=document.querySelector('.j-col')||document.createElement('div'), navEl=document.querySelector('.nav')||document.querySelector('.topbar');
  function fit(){ if(disposed) return;
    if(!stg || !navEl) return;
    if(innerWidth<=900){ stg.style.setProperty('--hs',1); jcol.style.setProperty('--js',1); return; }
    var nh=navEl.offsetHeight, avail=innerHeight-nh-32, h=stg.offsetHeight/ (parseFloat(getComputedStyle(stg).getPropertyValue('--hs'))||1);
    stg.style.setProperty('--hs', Math.max(.68, Math.min(1, avail/h)).toFixed(3));

  }
  listen(window, 'resize', fit); fit(); if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fit);

  }catch(e){ if(process.env.NODE_ENV!=="production") console.warn("[fundu-site]", e); } })();
  
  
  (function(){ try{
  // reveals, bars, count-up
  function countUp(el){ var from=420000, to=470000, t0=null, dur=1600;
    function f(t){ if(!t0) t0=t; var k=Math.min(1,(t-t0)/dur), e=1-Math.pow(1-k,4); el.textContent='₦'+Math.round(from+(to-from)*e).toLocaleString('en-NG'); if(k<1) requestAnimationFrame(f); }
    requestAnimationFrame(f); }
  var io='IntersectionObserver' in window ? new IntersectionObserver(function(es){ es.forEach(function(e){ if(!e.isIntersecting) return; var el=e.target; el.classList.add('in'); if(el.dataset.p){ el.style.setProperty('--p', el.dataset.p); var c=document.getElementById('countUp'); if(c && !reduce) countUp(c); } io.unobserve(el); }); }, {threshold:.3}) : null;
  [].forEach.call(document.querySelectorAll('.rv, .fillme, .qstack'), function(el,k){
    if(!io||reduce){ el.classList.add('in'); if(el.dataset.p){ el.style.setProperty('--p', el.dataset.p); var counter=document.getElementById('countUp'); if(counter) counter.textContent='₦470,000'; } return; }
    if(el.classList.contains('rv')) el.style.transitionDelay=((k%3)*90)+'ms';
    io.observe(el);
  });

  }catch(e){ if(process.env.NODE_ENV!=="production") console.warn("[fundu-site]", e); } })();
  (function(){ try{
  // stats count-up
  [].forEach.call(document.querySelectorAll('.stat b[data-count]'), function(el){
    var to=+el.dataset.count, from=Math.round(to*0.9), done=false;
    function run(){ if(done) return; done=true; if(reduce) return; var t0=null; function f(t){ if(!t0) t0=t; var k=Math.min(1,(t-t0)/700), e=1-Math.pow(1-k,3); el.textContent=Math.round(from+(to-from)*e).toLocaleString('en-NG')+'+'; if(k<1) requestAnimationFrame(f); } requestAnimationFrame(f); }
    if('IntersectionObserver' in window){ var o=new IntersectionObserver(function(es){ if(es[0].isIntersecting){ run(); o.disconnect(); } },{threshold:.6}); o.observe(el); } else run();
  });

  }catch(e){ if(process.env.NODE_ENV!=="production") console.warn("[fundu-site]", e); } })();
  
  (function(){ try{
  // people strip pause control
  var pp=document.getElementById('peoplePause'), pw=document.querySelector('.people');
  if(pp){ listen(pp, 'click', function(){ var p=pp.getAttribute('aria-pressed')!=='true'; pp.setAttribute('aria-pressed',p); pw.classList.toggle('fs-paused',p); pp.setAttribute('aria-label', p?'Play moving photos':'Pause moving photos');
    pp.innerHTML = p ? '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4l13 8-13 8z"></path></svg>' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M9 5v14M15 5v14"></path></svg>'; }); }

  }catch(e){ if(process.env.NODE_ENV!=="production") console.warn("[fundu-site]", e); } })();
  (function(){ try{
  // categories
  var g=document.getElementById('goals');
  [].forEach.call(document.querySelectorAll('[data-scroll]'), function(b){ listen(b, 'click', function(){ g.scrollBy({left:(+b.dataset.scroll)*Math.min(680,g.clientWidth*.8), behavior: reduce?'auto':'smooth'}); }); });

  }catch(e){ if(process.env.NODE_ENV!=="production") console.warn("[fundu-site]", e); } })();
  (function(){ try{
  // how it works: the step nearest the middle of the screen drives the sticky stage
  var HS=document.getElementById('hiwSteps'); if(!HS) return; var hsteps=[].slice.call(HS.querySelectorAll('.fs-hiw-step')), hscenes=[].slice.call(document.querySelectorAll('.hiw-panel > .hiw-scene')),
      hnum=document.getElementById('hiwNum'), hname=document.getElementById('hiwName'), HW=document.getElementById('hiw'), hnames=['You need something', 'You make a page', 'You share one link', 'People send support', 'It lands with you'], hcur=-1;
  function setStep(k){ if(k===hcur) return; hcur=k;
    hsteps.forEach(function(t,i){ t.classList.toggle('on', i===k); t.classList.toggle('lit', i<=k); });
    hscenes.forEach(function(sc,i){ sc.classList.toggle('on', i===k); sc.classList.toggle('past', i<k); });
    hnum.textContent='0'+(k+1); hname.textContent=hnames[k]; HW.style.setProperty('--sp', ((k+1)/hsteps.length).toFixed(3)); }
  function hf(){ var mid=innerHeight*0.5, k=0;
    hsteps.forEach(function(t,i){ var r=t.getBoundingClientRect(); if(r.top < mid) k=i; });
    var r=HS.getBoundingClientRect(), first=hsteps[0].querySelector('.hiw-node').getBoundingClientRect(), last=hsteps[hsteps.length-1].querySelector('.hiw-node').getBoundingClientRect();
    var span=(last.top-first.top)||1, p=Math.max(0,Math.min(1,(mid-(first.top+first.height/2))/span));
    HS.style.setProperty('--tp', p.toFixed(4)); setStep(k); }
  // phones: each inline picture appears as it enters
  var inl=[].slice.call(document.querySelectorAll('.hiw-inline'));
  if(reduce){ inl.forEach(function(e){ e.classList.add('on'); }); }
  else if('IntersectionObserver' in window){ var iio=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('on'); iio.unobserve(e.target); } }); }, {rootMargin:'0px 0px -6% 0px'}); inl.forEach(function(e){ iio.observe(e); }); }
  else inl.forEach(function(e){ e.classList.add('on'); });
  var htk=false; listen(window, 'scroll', function(){ if(!htk){ htk=true; requestAnimationFrame(function(){ hf(); htk=false; }); } }, {passive:true});
  listen(window, 'resize', hf); hf();
  }catch(e){ if(process.env.NODE_ENV!=="production") console.warn("[fundu-site]", e); } })();

})();

/* pricing calculator */
(function(){
  try{
  var r=document.getElementById('calcDays'); if(!r) return;
  var out=document.getElementById('calcOut'), d1=document.getElementById('coDays'), d2=document.getElementById('coDays2'), t1=document.getElementById('coTotal'), t2=document.getElementById('coTotal2'), pre=[].slice.call(document.querySelectorAll('.calc-presets button'));
  function upd(){ var d=+r.value, tot='₦'+(d*100).toLocaleString('en-NG'); out.textContent=d; d1.textContent=d; d2.textContent=d; t1.textContent=tot; t2.textContent=tot;
    r.setAttribute('aria-valuetext', d+' days, '+tot); pre.forEach(function(b){ b.setAttribute('aria-pressed', +b.dataset.d===d); }); }
  listen(r, 'input', upd); pre.forEach(function(b){ listen(b, 'click', function(){ r.value=b.dataset.d; upd(); }); }); upd();
  }catch(e){ if(process.env.NODE_ENV!=="production") console.warn("[fundu-site]", e); }
})();

/* guides: one article template + checklist */
(function(){
  try{
  // table of contents scrolls within the article without changing the route
  listen(document.getElementById('gaToc'), 'click', function(e){ var a=e.target.closest('a[data-ga]'); if(!a) return; e.preventDefault(); var t=document.getElementById(a.dataset.ga); if(t) t.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}); });
  // copy buttons for message templates
  listen(document.getElementById('gaBody'), 'click', function(e){ var b=e.target.closest('.tpl-copy'); if(!b) return; try{ navigator.clipboard && navigator.clipboard.writeText(b.dataset.t).catch(function(){}); }catch(err){} var o=b.innerHTML; b.classList.add('done'); b.innerHTML="<svg class=\"\" viewBox=\"0 0 256 256\" fill=\"currentColor\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M232,56V200a16,16,0,0,1-16,16H40a16,16,0,0,1-16-16V56A16,16,0,0,1,40,40H216A16,16,0,0,1,232,56Z\" opacity=\"0.2\"/><path d=\"M205.66,85.66l-96,96a8,8,0,0,1-11.32,0l-40-40a8,8,0,0,1,11.32-11.32L104,164.69l90.34-90.35a8,8,0,0,1,11.32,11.32Z\"/></svg>Copied"; setTimeout(function(){ b.classList.remove('done'); b.innerHTML=o; },1800); });
  // checklist progress
  var boxes=[].slice.call(document.querySelectorAll('#ckList input')), ring=document.getElementById('ckRing'), num=document.getElementById('ckNum'), msg=document.getElementById('ckMsg');
  if(!boxes.length||!ring||!num||!msg) return;
  function ck(){ var n=boxes.filter(function(b){return b.checked;}).length; num.textContent=n; ring.style.setProperty('--ck', n/boxes.length*100); msg.textContent = n===boxes.length ? 'All done. Your page is ready to publish.' : n===0 ? 'Start ticking as you go.' : (boxes.length-n)+' to go.'; }
  boxes.forEach(function(b){ listen(b, 'change', ck); }); ck();
  }catch(e){ if(process.env.NODE_ENV!=="production") console.warn("[fundu-site]", e); }
})();

/* place the callout across the bottom edge of the phone, a little wider than the phone */
(function(){ var c=document.getElementById('hcall'), d=document.querySelector('.hdev'), st=document.getElementById('hstage'); if(!c||!d||!st) return;
  function place(){ if(disposed) return; st.style.setProperty('--ct', (d.offsetTop+d.offsetHeight)+'px'); var extra=innerWidth>900?72:44; st.style.setProperty('--cw', Math.min(st.clientWidth-24, d.offsetWidth+extra)+'px'); }
  place(); listen(window, 'resize', place); if(document.fonts&&document.fonts.ready) document.fonts.ready.then(place);
})();

  return () => {
    disposed = true;
    controller.abort();
    timeouts.forEach(id => window.clearTimeout(id));
    intervals.forEach(id => window.clearInterval(id));
    frames.forEach(id => window.cancelAnimationFrame(id));
    observers.forEach(observer => observer.disconnect());
    document.querySelector('.fundu-site')?.classList.remove('js');
  };
}
