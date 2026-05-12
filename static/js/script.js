// BanglaBox demo page — minimal interactivity (no framework, no build step)

// 1. Copy BibTeX button
const copyBtn = document.getElementById('copy-bibtex');
if (copyBtn) {
  copyBtn.addEventListener('click', async () => {
    const code = document.querySelector('#bibtex pre code')?.innerText || '';
    try {
      await navigator.clipboard.writeText(code);
      const old = copyBtn.textContent;
      copyBtn.textContent = '✓ Copied!';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyBtn.textContent = old;
        copyBtn.classList.remove('copied');
      }, 1800);
    } catch (e) {
      // Fallback for browsers without clipboard API
      const ta = document.createElement('textarea');
      ta.value = code;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (_) {}
      document.body.removeChild(ta);
      copyBtn.textContent = '✓ Copied!';
      setTimeout(() => { copyBtn.textContent = 'Copy BibTeX'; }, 1800);
    }
  });
}

// 2. Pause other audio when one starts playing (single-audio policy)
document.addEventListener('play', (e) => {
  if (e.target.tagName !== 'AUDIO') return;
  document.querySelectorAll('audio').forEach((a) => {
    if (a !== e.target && !a.paused) a.pause();
  });
}, true);

// 3. Highlight current TOC section while scrolling
const tocLinks = document.querySelectorAll('.toc-bar a[href^="#"]');
const sections = Array.from(tocLinks)
  .map((a) => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window && sections.length > 0) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        tocLinks.forEach((a) => {
          a.style.color = a.getAttribute('href') === '#' + id ? 'var(--primary-dark)' : '';
          a.style.background = a.getAttribute('href') === '#' + id ? 'var(--primary-light)' : '';
        });
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  sections.forEach((s) => obs.observe(s));
}
