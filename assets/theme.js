(function () {
  const KEY = 'rt-dark';
  function setMode(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem(KEY, isDark ? '1' : '0');
  }
  // Apply saved preference immediately
  setMode(localStorage.getItem(KEY) === '1');

  // Expose toggle function for button
  window.toggleTheme = () => {
    setMode(!document.documentElement.classList.contains('dark'));
  };
})();

(function () {
  const KEY = 'rt-dark';

  function getCookie(name) {
    return document.cookie
      .split('; ')
      .find(row => row.startsWith(name + '='))
      ?.split('=')[1];
  }

  function setCookie(name, value, days = 365) {
    const maxAge = days * 24 * 60 * 60;
    // If your site is served over HTTPS (GitHub Pages is), Secure is appropriate.
    document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax; Secure`;
  }

  function apply(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
  }

  // Order of precedence: cookie → localStorage → OS preference
  let pref = getCookie(KEY) ?? localStorage.getItem(KEY);
  if (pref == null) {
    pref = window.matchMedia('(prefers-color-scheme: dark)').matches ? '1' : '0';
  }
  apply(pref === '1');

  // Expose toggle
  window.toggleTheme = () => {
    const next = !document.documentElement.classList.contains('dark');
    apply(next);
    // Persist in BOTH places so it works even if cookies are blocked
    setCookie(KEY, next ? '1' : '0');
    localStorage.setItem(KEY, next ? '1' : '0');
  };
})();
