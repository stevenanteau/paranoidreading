/* Covers and grid view for the section pages. Loads /data/covers.json ({id: "file.jpg"}); entries with no cover get a typographic placeholder. */
(function () {
  var MAP = {}, E = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  window.prCover = function (e) {
    var f = MAP[e.id];
    if (f) return '<div class="x-cv"><img loading="lazy" decoding="async" src="/img/covers/' + E(f) + '" alt="Cover of ' + E(e.t) + '"></div>';
    return '<div class="x-cv x-ph" aria-hidden="true"><b>' + E(e.t) + '</b><i>' + E(String(e.by || '').replace(/^(Dir\.|Created by)\s*/, '')) + '</i></div>';
  };
  var css = '.x-head{position:relative}.x-view{position:absolute;right:0;top:6px;display:flex;border:1px solid #d7263d}.x-view button{font:700 14px/1 "Inter Tight",Helvetica,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;background:transparent;color:#ececec;border:0;padding:14px 26px;cursor:pointer}.x-view button+button{border-left:1px solid #d7263d}.x-view button[aria-pressed=true]{background:#d7263d;color:#0a0a0a}.x-view button:not([aria-pressed=true]):hover{background:#1c1c1c}.x-view button:focus-visible{outline:2px solid #ececec;outline-offset:2px}' +
    '.x-cv{width:112px;aspect-ratio:2/3;float:right;margin:0 0 10px 16px;background:#141414;border:1px solid #2e2e2e;overflow:hidden;flex:0 0 auto}' +
    '.x-cv img{width:100%;height:100%;object-fit:cover;display:block}' +
    '.x-ph{display:flex;flex-direction:column;justify-content:center;gap:6px;padding:8px;text-align:center;font-family:"Inter Tight",Helvetica,Arial,sans-serif;overflow:hidden}' +
    '.x-ph b{font-size:11px;line-height:1.2;color:#ececec;text-transform:uppercase;letter-spacing:.02em;font-weight:800}.x-ph i{font-size:9.5px;font-style:normal;color:#9a9a9a;line-height:1.2}' +
    '.x-list.x-grid{grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:24px 20px}' +
    '.x-grid .x-entry{padding:0;border:0;gap:0;cursor:pointer}.x-grid .x-entry>*:not(.x-cv){display:none}' +
    '.x-grid .x-cv{float:none;width:100%;margin:0;transition:border-color .15s,transform .15s}.x-grid .x-entry:hover .x-cv{border-color:#d7263d;transform:translateY(-2px)}' +
    '.x-ph-big b{font-size:15px}.x-ph-big i{font-size:12px}' +
    '.x-grid .x-ph b{font-size:17px}.x-grid .x-ph i{font-size:13px}' +
    '#pr-dlg{position:fixed;inset:0;background:rgba(0,0,0,.78);z-index:200;display:none;align-items:center;justify-content:center;padding:24px}#pr-dlg.on{display:flex}' +
    '#pr-dlg .in{background:#0a0a0a;border:1px solid #2e2e2e;max-width:560px;max-height:86vh;overflow:auto;padding:18px 20px;display:flex;flex-direction:column;gap:8px;position:relative}' +
    '#pr-dlg .in .x-cv{width:170px}#pr-dlg .in button{pointer-events:none}#pr-dlg .x{position:sticky;top:0;align-self:flex-end;background:#0a0a0a;color:#ececec;border:1px solid #2e2e2e;padding:3px 10px;font:600 12px "Inter Tight",sans-serif;cursor:pointer;pointer-events:auto!important}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  fetch('/data/covers.json').then(function (r) { return r.json(); }).then(function (m) { MAP = m; if (window.prRerender) window.prRerender(); }).catch(function () {});
  function init() {
    var list = document.getElementById('list'), reset = document.getElementById('reset');
    if (!list || !reset) return;
    var on = false; try { on = localStorage.getItem('pr-grid') === '1'; } catch (x) {}
    var head = document.querySelector('.x-head') || reset.parentNode, bar = document.createElement('div'); bar.className = 'x-view'; bar.setAttribute('role', 'group'); bar.setAttribute('aria-label', 'View');
    var bg = document.createElement('button'), bl = document.createElement('button'); bg.type = bl.type = 'button'; bg.textContent = 'Cover grid'; bl.textContent = 'List view'; bar.appendChild(bg); bar.appendChild(bl); head.appendChild(bar);
    function apply() { list.classList.toggle('x-grid', on); bg.setAttribute('aria-pressed', on); bl.setAttribute('aria-pressed', !on); try { localStorage.setItem('pr-grid', on ? '1' : '0'); } catch (x) {} }
    bg.onclick = function () { on = true; apply(); }; bl.onclick = function () { on = false; apply(); }; apply();
    new MutationObserver(function () { list.classList.toggle('x-grid', on); }).observe(list, {childList: true});
    var d = document.createElement('div'); d.id = 'pr-dlg'; d.innerHTML = '<div class="in"></div>'; document.body.appendChild(d);
    d.onclick = function (ev) { if (ev.target === d || ev.target.className === 'x') d.classList.remove('on'); };
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape') d.classList.remove('on'); });
    list.addEventListener('click', function (ev) { if (!on) return; var a = ev.target.closest('.x-entry'); if (!a) return; d.firstChild.innerHTML = '<button class="x" type="button">Close</button>' + a.innerHTML; d.classList.add('on'); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
