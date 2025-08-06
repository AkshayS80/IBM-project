function showPage(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const headerOffset = document.querySelector('header').offsetHeight;
  const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - headerOffset - 10;
  window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}

function updateNavbar() {
  const loginNavItem = document.querySelector('.navbar ul li:last-child');
  if (localStorage.getItem('loggedIn') === 'true') {
  loginNavItem.innerHTML =
    '<a href="#" id="logoutBtn" style="color:white;text-decoration:none;">Logout</a>';
  document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.setItem('loggedIn', 'false');
    updateNavbar(); // So navbar switches back to Login instantly
    window.location.href = 'index.html'; // Go to homepage after logout
  });
}
else {
    loginNavItem.innerHTML = '<a href="./login.html" target="_main">Login</a>';
  }
}

// ✅ Call this when page loads
updateNavbar();

// ✅ Protect Start links
const protectedLinks = document.querySelectorAll('a[target="_main"]');
protectedLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    if (localStorage.getItem('loggedIn') !== 'true') {
      e.preventDefault();
      window.location.href = 'login.html';
    }
  });
});

