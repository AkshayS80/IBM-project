
document.querySelectorAll('.start-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const card = e.target.closest('[data-target]');
    const target = card?.getAttribute('data-target');
    if (!target) return;
    document.querySelectorAll('.subject-section').forEach(s => s.classList.remove('active'));
    const section = document.getElementById(target);
    section?.classList.add('active');
    section?.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('[data-back]').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('.subject-section').forEach(s => s.classList.remove('active'));
    document.getElementById('subjects').scrollIntoView({ behavior: 'smooth' });
  });
});
