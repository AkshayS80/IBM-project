document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('signup-name').value.trim();
  const email = document.getElementById('signup-email').value.trim();
  const pass = document.getElementById('signup-password').value;
  const errBox = document.getElementById('signup-error');
  const successBox = document.getElementById('signup-success');

  errBox.style.display = 'none';
  successBox.style.display = 'none';

  if (!name || !email || !pass) {
    errBox.textContent = 'All fields are required to sign up.';
    errBox.style.display = 'block';
    return;
  }
  if (pass.length < 6) {
    errBox.textContent = 'Password must be at least 6 characters long.';
    errBox.style.display = 'block';
    return;
  }

  // Save credentials
  localStorage.setItem('userName', name);
  localStorage.setItem('userEmail', email);
  localStorage.setItem('userPass', pass);

  successBox.textContent = 'Account created successfully! You can now login.';
  successBox.style.display = 'block';

  setTimeout(() => {
    window.location.href = 'login.html';
  }, 1500);
});
