/* ScentVault Phase 1.3 | Classroom-only front-end access.
   The sample credentials are visible in source code; this is NOT real authentication.
   No localStorage, sessionStorage, cookies, or database are used. */
(() => {
  const email = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');
  const form = document.getElementById('loginForm');
  const error = document.getElementById('authToast');

  // Pre-filled credentials for a frictionless lecturer walkthrough.
  email.value = 'demo@scentvault.com';
  password.value = 'demo123';

  document.getElementById('togglePassword').addEventListener('click', () => {
    const visible = password.type === 'text';
    password.type = visible ? 'password' : 'text';
    document.getElementById('togglePassword').textContent = visible ? 'Show' : 'Hide';
    document.getElementById('togglePassword').setAttribute('aria-pressed', String(!visible));
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (email.value.trim().toLowerCase() === 'demo@scentvault.com' && password.value === 'demo123') {
      error.classList.add('d-none');
      window.location.assign('dashboard.html');
    } else {
      error.textContent = 'Incorrect email or password. Use the pre-filled credentials to continue.';
      error.classList.remove('d-none');
      email.focus();
    }
  });
})();
