'use strict';

const sliderCards = document.querySelector('.carousel__cards') ||
document.querySelector('.slider__cards');
// const buttonPrev = document.querySelector('.button-arrow_left');
// const buttonNext = document.querySelector('.button-arrow_right');
const popup = document.querySelector('.pet-popup');
const popupCloseButton = document.querySelector('.popup__close-button');

const fillPetCard = (id) => {
  popup.querySelector('.name').innerHTML = pets[id].name;
  popup.querySelector('.type-bread').innerHTML = `${pets[id].type} - ${pets[id].breed}`;
  popup.querySelector('.description').innerHTML = pets[id].description;
  popup.querySelector('.age').innerHTML = pets[id].age;
  popup.querySelector('.inoculations').innerHTML = pets[id].inoculations;
  popup.querySelector('.diseases').innerHTML = pets[id].diseases;
  popup.querySelector('.parasites').innerHTML = pets[id].parasites;
  popup.querySelector('.popup__image').setAttribute('src', pets[id].img);

}
// const preventedKeys = ['ArrowUp', 'ArrowDown', 'Tab'];

// const preventScroll = (e) => { e.preventDefault(); }

// const preventScrollByKeys = (e) => {
//   if (preventedKeys.includes(e.key)) {
//     e.preventDefault();
//   };
// }

const closePopup = (e) => {
  document.body.removeEventListener('keydown', preventScrollByKeys);
  navbar.removeEventListener('wheel', preventScroll);
  document.body.style.overflowY = '';

  popup.classList.remove('popup_open');
}

const openPopup = (e) => {
  const target = e.target.closest('.card');
  if (!target || target.dataset.id == undefined) {
    return;
  }

  window.addEventListener('resize', closePopup, { once: true })
  document.body.addEventListener('keydown', preventScrollByKeys);
  navbar.addEventListener('wheel', preventScroll);
  document.body.style.overflowY = 'hidden';


  fillPetCard(target.dataset.id);
  popup.classList.add('popup_open');
}

sliderCards.addEventListener('click', openPopup);

popup.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('popup_open') ||
    target.classList.contains('popup__close-button')) {
    closePopup();
  }
});


