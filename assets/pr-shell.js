/* Paranoid Reading shared shell: sidebar, search box, theme toggle and footer.
   Loaded as the first thing in <body> on every page. Edit the sidebar here, once. */
(function () {
  var root = document.documentElement;
  try { if (localStorage.getItem('pr-theme') === 'light') root.setAttribute('data-theme', 'light'); } catch (e) {}

  window.prData = window.prData || function () {
    return window._prd || (window._prd = fetch('/data/catalogue.json').then(function (r) {
      if (!r.ok) throw new Error('data ' + r.status);
      return r.json();
    }));
  };

  // [label, href, pattern that marks the link as current]
  var GROUPS = [
    ['Browse', [
      ['Fiction', '/novels/', '^/novels'],
      ['Film and TV', '/film-tv/', '^/film-tv'],
      ['Non-Fiction', '/nonfiction/', '^/nonfiction'],
      ['Articles and Journals', '/articles/', '^/articles'],
      ['The Index, by topic', '/topics/', '^/topics']]],
    ['Lists', [
      ['Podcast & Author Lists', '/#podcast-lists', '^$never'],
      ['Pre-Made Curriculums', '/curriculums/', '^/curriculums'],
      ['Gladio Dossier', '/dossiers/gladio/', '^/dossiers'],
      ['Current Academic Work', '/current/', '^/current']]],
    ['Tools', [
      ['Build a Curriculum', '/library/', '^/library'],
      ['Random Pick', '/random/', '^/random'],
      ['The Wheel', '/wheel/', '^/wheel']]]
  ];
  var path = location.pathname;
  function link(a) {
    return '<a href="' + a[1] + '"' + (new RegExp(a[2]).test(path) ? ' class="on" aria-current="page"' : '') + '>' + a[0] + '</a>';
  }
  var SIGIL = '<svg class="pr-sigil" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g stroke="#d7263d" stroke-width="3" fill="none" opacity="0.9"><circle cx="100" cy="100" r="88"/><circle cx="100" cy="100" r="58"/><polygon points="100,20 145,120 55,72 155,72 65,120"/></g></svg>';
  var ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor"/></svg>';

  var html = '<a class="pr-skip" href="#pr-main">Skip to content</a>' +
    '<aside class="pr-side" aria-label="Site navigation">' +
    '<a class="pr-sigilrow" href="/" title="Home">' + SIGIL + '<span class="pr-brand">Paranoid Reading</span></a>' +
    '<div class="pr-social top">' +
    '<a href="https://www.youtube.com/@ParanoidReading" target="_blank" rel="noopener">Watch on YouTube</a>' +
    '<a href="https://pagebound.co/users/stevenanteau" target="_blank" rel="noopener">Follow on Pagebound</a>' +
    '<button type="button" class="pr-theme-btn" id="prTheme" aria-label="Switch to light mode">' + ICON + '<span>Light mode</span></button>' +
    '</div>' +
    '<div class="pr-search" role="search"><label class="pr-label" for="prQ">Search the files</label>' +
    '<input id="prQ" type="search" placeholder="Title, author, keyword" autocomplete="off" spellcheck="false" aria-controls="prRes" aria-expanded="false"><kbd class="pr-kbd" title="Press / to search">/</kbd></div>' +
    '<div id="prRes" class="pr-res" hidden role="listbox" aria-label="Search results"></div>' +
    GROUPS.map(function (g) {
      return '<p class="pr-label">' + g[0] + '</p><nav aria-label="' + g[0] + '">' + g[1].map(link).join('') + '</nav>';
    }).join('') +
    '<nav class="pr-about" aria-label="About">' + link(['About', '/about/', '^/about']) + '</nav>' +
    '</aside>';
  document.body.insertAdjacentHTML('afterbegin', html);

  // theme toggle; pages that draw their own graphics can listen for the "pr-theme" event
  var btn = document.getElementById('prTheme');
  function set(light) {
    if (light) root.setAttribute('data-theme', 'light'); else root.removeAttribute('data-theme');
    btn.querySelector('span').textContent = light ? 'Dark mode' : 'Light mode';
    btn.setAttribute('aria-label', light ? 'Switch to dark mode' : 'Switch to light mode');
  }
  set(root.getAttribute('data-theme') === 'light');
  btn.addEventListener('click', function () {
    var light = root.getAttribute('data-theme') !== 'light';
    set(light);
    try { localStorage.setItem('pr-theme', light ? 'light' : 'dark'); } catch (e) {}
    document.dispatchEvent(new CustomEvent('pr-theme', { detail: { light: light } }));
  });

  // search
  var s = document.createElement('script');
  s.src = '/assets/pr-search.js';
  document.head.appendChild(s);

  // footer and skip target, once the page has been parsed
  document.addEventListener('DOMContentLoaded', function () {
    var main = document.querySelector('main') || document.querySelector('.wrap');
    if (main && !document.getElementById('pr-main')) { main.id = main.id || 'pr-main'; if (main.id !== 'pr-main') document.querySelector('.pr-skip').setAttribute('href', '#' + main.id); main.setAttribute('tabindex', '-1'); }
    var own = document.querySelector('footer');
    var f = document.createElement('footer');
    f.className = 'pr-foot' + (own ? ' joined' : '');
    f.innerHTML = '<p><a href="/about/">About Paranoid Reading</a> &nbsp;&middot;&nbsp; <a href="/topics/">The Index</a> &nbsp;&middot;&nbsp; ' +
      '<a href="https://www.youtube.com/@ParanoidReading" target="_blank" rel="noopener">YouTube</a> &nbsp;&middot;&nbsp; ' +
      '<a href="https://pagebound.co/users/stevenanteau" target="_blank" rel="noopener">Pagebound</a></p>' +
      '<p>Read marks, saved curricula and wheel items stay in this browser. Nothing is uploaded.</p>';
    document.body.appendChild(f);
  });
})();
