const gallery = document.getElementById('gallery');
const nav = document.getElementById('nav');

SCREENS.forEach((screen) => {
  const btn = document.createElement('button');
  btn.textContent = screen.name;
  btn.dataset.id = screen.id;
  btn.addEventListener('click', () => {
    document.getElementById('screen-' + screen.id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    nav.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
  });
  nav.appendChild(btn);

  const wrap = document.createElement('article');
  wrap.className = 'screen-wrap';
  wrap.id = 'screen-' + screen.id;
  wrap.innerHTML =
    '<p class="screen-label">' +
    screen.name +
    '</p><div class="phone"><div class="screen">' +
    screen.html +
    '</div></div>';
  gallery.appendChild(wrap);
});

nav.querySelector('button')?.classList.add('active');
