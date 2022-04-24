import data from '../../pets.json' assert { type: "json" };
const petsData = data;
const burgerMenu = document.querySelector('.burger-menu');
const navContainer = document.querySelector('.nav-container');
const wrapper = document.querySelector('.wrapper');
const overlay = document.querySelector('.overlay');
const cards = document.querySelectorAll('.card');
const btnPrev = document.querySelector('.prev');
const btnNext = document.querySelector('.next');
const itemPrev = document.querySelector('#item-prev');
const itemNext = document.querySelector('#item-next');
const slider = document.querySelector('.slider');

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

function getRandom(n) {
  let arr = [];
  let randomNum;
  for (let i = 0; i < n; i++) {
    while (arr.length < n) {
      randomNum = Math.floor(Math.random() * 8);
      if (!arr.includes(randomNum)) {
        arr.push(randomNum);
      }
    }
  }
  return arr;
}

const randomArr = getRandom(8);
let j = 0;
const createCard = () => {
  const card = document.createElement('div');
  card.className = 'pet-card';
  card.innerHTML = `
  <img src="${petsData[randomArr[j]].img}" alt="${petsData[randomArr[j]].name}" width="270" height="270">
  <h4>${petsData[randomArr[j]].name}</h4>
  <button class="learn-more-button">Learn more</button>
  `;
  if (j === petsData.length - 1) {
    j = 0;
  } else {
    j++;
  }
  return card;
}

cards.forEach(el => {
  const card = createCard();
  el.append(card);
});

const moveLeft = () => {
  slider.classList.add('transition-left');
  btnPrev.removeEventListener('click', moveLeft);
  btnNext.removeEventListener('click', moveRight);
};

const moveRight = () => {
  slider.classList.add('transition-right');
  btnPrev.removeEventListener('click', moveLeft);
  btnNext.removeEventListener('click', moveRight);
};

btnPrev.addEventListener('click', moveLeft);
btnNext.addEventListener('click', moveRight);

slider.addEventListener('animationend', (animationEvent) => {
  let changedItem;
  if (animationEvent.animationName === 'move-left') {
    slider.classList.remove('transition-left');
    changedItem = itemPrev;
    document.querySelector('#item-active').innerHTML = itemPrev.innerHTML;
  } else {
    slider.classList.remove('transition-right');
    changedItem = itemNext;
    document.querySelector('#item-active').innerHTML = itemNext.innerHTML;
  }

  const cardsContainerWidth = document.querySelector('.cards-container').clientWidth;
  let n;
  if (cardsContainerWidth === 990) {
    n = 3;
  } else if (cardsContainerWidth === 580) {
    n = 2;
  } else {
    n = 1;
  }

  changedItem.innerHTML = '';
  for (let i = 0; i < n; i++) {
    const card = createCard();
    changedItem.appendChild(card);
  }

  btnPrev.addEventListener('click', moveLeft);
  btnNext.addEventListener('click', moveRight);
})