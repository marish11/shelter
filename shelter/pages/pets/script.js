const burgerMenu = document.querySelector('.burger-menu');
const navContainer = document.querySelector('.nav-container');
const wrapper = document.querySelector('.wrapper');
const overlay = document.querySelector('.overlay');

function toggleMenu() {
  burgerMenu.classList.toggle('open');
  navContainer.classList.toggle('open');
  overlay.classList.toggle('active');
  wrapper.classList.toggle('active');
}

function closeMenu(e) {
  if (e.target.classList.contains('nav-link')) {
    burgerMenu.classList.remove('open');
    navContainer.classList.remove('open');
    overlay.classList.remove('active');
    wrapper.classList.remove('active');
  }
}

burgerMenu.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
navContainer.addEventListener('click', closeMenu);