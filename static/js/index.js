$.noConflict();
jQuery(document).ready(function($) {
  // Mobile navbar burger toggle
  $(".navbar-burger").toggleClass("is-active");
  // Burger click
  $(".navbar-burger").unbind('click').click(function() {
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  // Smooth scroll
  $('a[href^="#p�], a[href^="#a"], a[href^="#s"], a[href^="#v"], a[href^="#r"], a[href^="#c"]').click(function(e) {
    var target = $($(this).attr('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top - 70
      }, 500);
    }
  });

  // Copy BibTeX - robust with jQuery + vanilla fallback
  function initCopyBibtex() {
    var btn = document.getElementById('copy-bibtex-btn');
    if (!btn) return;
    btn.addEventListener('click', function() {
      var el = document.getElementById('bibtex-content');
      var text = el ? (el.textContent || el.innerText) : '';
      var origHTML = btn.innerHTML;
      function showCopied() {
        btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        btn.style.backgroundColor = '#C66000';
        // tooltip near button
        var tip = document.createElement('span');
        tip.textContent = 'Copied to clipboard!';
        tip.style.cssText = 'position:absolute;top:-32px;right:0;background:#333;color:#fff;padding:4px 8px;border-radius:4px;font-size:12px;white-space:nowrap;opacity:0;transition:opacity 0.2s;';
        btn.style.position = 'relative';
        btn.appendChild(tip);
        requestAnimationFrame(function(){ tip.style.opacity = '1'; });
        setTimeout(function() { btn.innerHTML = origHTML; btn.style.backgroundColor = ''; }, 2000);
        setTimeout(function(){ if(tip.parentNode) tip.remove(); }, 2200);
      }
      function fallbackCopy(t) {
        var ta = document.createElement('textarea');
        ta.value = t;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.top = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, 99999);
        var ok = false;
        try { ok = document.execCommand('copy'); } catch(e) { ok = false; }
        document.body.removeChild(ta);
        if (ok) showCopied(); else { window.prompt('Copy BibTeX manually (Ctrl+C):', t); }
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(showCopied).catch(function(){ fallbackCopy(text); });
      } else {
        fallbackCopy(text);
      }
    });
  }
  initCopyBibtex();
});
