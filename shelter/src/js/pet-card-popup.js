import { preventScroll, preventScrollByKeys } from './scroll-handler.js';

const popup = document.querySelector('.pet-popup');
const navbar = document.querySelector('.aside-navbar');

export const fillPetCard = (id, pets) => {
  popup.querySelector('.name').innerHTML = pets[id].name;
  popup.querySelector('.type-bread').innerHTML = `${pets[id].type} - ${pets[id].breed}`;
  popup.querySelector('.description').innerHTML = pets[id].description;
  popup.querySelector('.age').innerHTML = pets[id].age;
  popup.querySelector('.inoculations').innerHTML = pets[id].inoculations;
  popup.querySelector('.diseases').innerHTML = pets[id].diseases;
  popup.querySelector('.parasites').innerHTML = pets[id].parasites;
  popup.querySelector('.popup__image').setAttribute('src', pets[id].img);
}

export const closePopup = (e) => {
  document.body.removeEventListener('keydown', preventScrollByKeys);
  navbar.removeEventListener('wheel', preventScroll);
  document.body.style.overflowY = '';

  popup.classList.remove('popup_open');
}

export const openPopup = (id, pets) => {
  window.addEventListener('resize', closePopup, { once: true })
  document.body.addEventListener('keydown', preventScrollByKeys);
  navbar.addEventListener('wheel', preventScroll);
  document.body.style.overflowY = 'hidden';

  fillPetCard(id, pets);
  popup.classList.add('popup_open');
}



