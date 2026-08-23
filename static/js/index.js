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

  // Copy BibTeX
  $('#copy-bibtex-btn').click(function() {
    var text = $('#bibtex-content').text();
    var $btn = $('#copy-bibtex-btn');
    var origHTML = $btn.html();
    function showCopied() {
      $btn.html('<i class=\"fas fa-check\"></i> Copied!');
      $btn.css('background-color', '#C66000');
      setTimeout(function() {
        $btn.html(origHTML);
        $btn.css('background-color', '');
      }, 2000);
    }
    function fallbackCopy(t) {
      var ta = document.createElement('textarea');
      ta.value = t;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); showCopied(); } catch(e) { alert('Copy failed, please select manually.'); }
      document.body.removeChild(ta);
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(showCopied).catch(function(){ fallbackCopy(text); });
    } else {
      fallbackCopy(text);
    }
  });
});
