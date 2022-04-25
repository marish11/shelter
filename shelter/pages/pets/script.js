import data from '../../pets.json' assert { type: "json" };
const petsData = data;
console.log(petsData)
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