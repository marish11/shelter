import data from '../../pets.json' assert { type: "json" };
const petsData = data;
const burgerMenu = document.querySelector('.burger-menu');
const navContainer = document.querySelector('.nav-container');
const wrapper = document.querySelector('.wrapper');
const overlay = document.querySelector('.overlay');
const modal = document.querySelector('.modal');
const cardsContainer = document.querySelector('.cards-container');
const modalOverlay = document.querySelector('.modal-overlay');
const closeBtn = document.querySelector('.modal-close-btn');
const modalContent = document.querySelector('.modal-content');

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

const getPetData = (name) => {
  for (let i = 0; i < petsData.length; i++) {
    if (petsData[i].name === name) {
      return petsData[i];
    }
  }
}

function openModal(e) {
  if (e.target.closest('.pet-card')) {
    const top = window.pageYOffset;
    modal.style.top = top + 'px';
    modal.classList.add('opened');
    document.body.classList.add('active');
    modalOverlay.classList.add('active');
    // change to dataset
    const name = e.target.closest('.pet-card').getElementsByTagName('img')[0].getAttribute('alt');
    const pet = getPetData(name);
    modalContent.appendChild(createModal(pet));
  }
}

function closeModal() {
  document.body.classList.remove('modal-overlay');
  modal.classList.remove('opened');
  document.body.classList.remove('active');
  modalContent.innerHTML = '';
}

const createModal = (pet) => {
  const modalContent = document.createDocumentFragment();
  const imgBlock = document.createElement('div');
  imgBlock.classList.add('modal-content-img');
  const img = document.createElement('img');
  img.setAttribute('src', `${pet.img}`);
  imgBlock.appendChild(img);
  const petInfo = document.createElement('div');
  petInfo.classList.add('modal-content-info');
  const name = document.createElement('div');
  name.classList.add('modal-content-name');
  name.innerHTML = pet.name;
  const type = document.createElement('div');
  type.classList.add('modal-content-type');
  type.innerHTML = `${pet.type} - ${pet.breed}`;
  const description = document.createElement('div');
  description.classList.add('modal-content-description');
  description.innerHTML = pet.description;
  const data = document.createElement('div');
  data.classList.add('modal-content-data');
  data.innerHTML = `
  <ul>
    <li><b>Age: </b>${pet.age}</li>
    <li><b>Inoculations: </b>${[...pet.inoculations]}</li>
    <li><b>Diseases: </b>${[...pet.diseases]}</li>
    <li><b>Parasites: </b>${[...pet.parasites]}</li>
  </ul>
  `
  petInfo.appendChild(name);
  petInfo.appendChild(type);
  petInfo.appendChild(description);
  petInfo.appendChild(data);
  modalContent.appendChild(imgBlock);
  modalContent.appendChild(petInfo);

  return modalContent;
}

cardsContainer.addEventListener('click', openModal);
modalOverlay.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);

const btnStart = document.querySelector('.to-first-page-button');
const btnEnd = document.querySelector('.to-last-page-button');
const btnPrev = document.querySelector('.prev-button');
const btnNext = document.querySelector('.next-button');
const centralItem = document.querySelector('.central-item');
const documentWidth = document.documentElement.clientWidth;

function getRandomArr(petsNum) {
  let arr = [];
  let randomNum;
  for (let i = 0; i < petsNum; i++) {
    while (arr.length < petsNum) {
      randomNum = Math.floor(Math.random() * petsNum);
      if (!arr.includes(randomNum)) {
        arr.push(randomNum);
      }
    }
  }
  return arr;
}

let baseTemplate = [];
let template;
let activePage = 0;

if (documentWidth >= 1280) {
  for (let i = 0; i < 6; i++) {
    let arr = getRandomArr(8);
    baseTemplate.push(arr);
  }
} else if (documentWidth < 1280 && documentWidth >= 768) {
  for (let i = 0; i < 8; i++) {
    let arr = getRandomArr(8);
    baseTemplate.push(arr.splice(0, 6));
  }
} else {
  for (let i = 0; i < 16; i++) {
    let arr = getRandomArr(8);
    baseTemplate.push(arr.splice(0, 3));
  }
}

baseTemplate = baseTemplate.flat();

const pets = petsData.map((item, index) => createCard(item, index));
baseTemplate = baseTemplate.map(item => pets[item]);

if (documentWidth >= 1280) template = createTemplate(8);
else if (documentWidth < 1280 && documentWidth >= 768) template = createTemplate(6);
else template = createTemplate(3);

addCards(...template[activePage]);

btnNext.addEventListener('click', toNext);
btnEnd.addEventListener('click', toEnd);

function addCards() {
  cardsContainer.append(...template[activePage]);
  cardsContainer.style.opacity = '1';
}

function removeCards() {
  cardsContainer.style.opacity = '0';
  cardsContainer.innerHTML = '';
}

function createCard(item, index) {
  const card = createElement('div', 'pet-card', item, index);
  const image = createElement('img', 'pet-card-image', item, index);
  const header = createElement('h4', 'pet-card-header', item, index);
  const button = createElement('button', 'learn-more-button', item, index);
  card.append(image, header, button);
  return card;
}

function createElement(tag, className, item, index) {
  const element = document.createElement(tag);
  element.className = className;
  switch (className) {
    case 'pet-card':
      element.dataset.id = index;
      break;
    case 'pet-card-image':
      element.alt = item.name;
      element.src = item.img;
      break;
    case 'pet-card-header':
      element.innerHTML = item.name;
      break;
    case 'learn-more-button':
      element.innerHTML = 'Learn more';
      break;
    default:
      return null;
  }
  return element;
}

function createTemplate(cardsNum) {
  let temp = [];
  for (let i = 0; i < baseTemplate.length; i += cardsNum) {
    temp.push(baseTemplate.slice(i, i + cardsNum));
  }
  return temp;
}

function toStart() {
  activePage = 0;
  removeCards();
  addCards();
  centralItem.textContent = `${activePage + 1}`;
  [btnStart, btnPrev].forEach(item => item.classList.remove('button-active'));
  [btnNext, btnEnd].forEach(item => item.classList.add('button-active'));
  btnStart.removeEventListener('click', toStart);
  btnPrev.removeEventListener('click', toPrev);
  btnEnd.addEventListener('click', toEnd);
  btnNext.addEventListener('click', toNext);
}

function toPrev() {
  if (activePage > 0) activePage -= 1;
  removeCards();
  addCards();
  centralItem.textContent = `${activePage + 1}`;
  if (activePage == template.length - 2) {
    [btnNext, btnEnd].forEach(item => item.classList.add('button-active'));
    btnEnd.addEventListener('click', toEnd);
    btnNext.addEventListener('click', toNext);
  } else if (activePage == 0) {
    [btnStart, btnPrev].forEach(item => item.classList.remove('button-active'));
    btnStart.removeEventListener('click', toStart);
    btnPrev.removeEventListener('click', toPrev);
  }
}

function toNext() {
  activePage += 1;
  removeCards();
  addCards();
  centralItem.textContent = `${activePage + 1}`
  if (activePage == template.length - 1) {
    [btnStart, btnPrev].forEach(item => item.classList.add('button-active'));
    [btnNext, btnEnd].forEach(item => item.classList.remove('button-active'));
    btnEnd.removeEventListener('click', toEnd);
    btnNext.removeEventListener('click', toNext);
  } else if (activePage == 1) {
    [btnStart, btnPrev].forEach(item => item.classList.add('button-active'));
    btnStart.addEventListener('click', toStart);
    btnPrev.addEventListener('click', toPrev);
  }
}

function toEnd() {
  activePage = template.length - 1;
  removeCards();
  addCards();
  centralItem.textContent = `${activePage + 1}`;
  [btnStart, btnPrev].forEach(item => item.classList.add('button-active'));
  [btnNext, btnEnd].forEach(item => item.classList.remove('button-active'));
  btnEnd.removeEventListener('click', toEnd);
  btnNext.removeEventListener('click', toNext);
  btnStart.addEventListener('click', toStart);
  btnPrev.addEventListener('click', toPrev);
}