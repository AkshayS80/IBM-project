document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value.trim();
  const pass = document.getElementById('login-password').value;
  const errBox = document.getElementById('login-error');

  errBox.style.display = 'none';

  if (!email || !pass) {
    errBox.textContent = 'Please fill in both email and password.';
    errBox.style.display = 'block';
    return;
  }

  const savedEmail = localStorage.getItem('userEmail');
  const savedPass = localStorage.getItem('userPass');

  if (email === savedEmail && pass === savedPass) {
  localStorage.setItem('loggedIn', 'true');

  // 🔥 This line is what you're missing
  localStorage.setItem('userEmail', email);

  // Optional: for debug logging
  console.log("✅ Logged in as:", email);

  window.location.href = 'index.html';
}

});
