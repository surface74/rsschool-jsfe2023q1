'use strict';

const carouselWrapper = document.querySelector('.carousel__cards');
const carouselCards = carouselWrapper.querySelectorAll('.card');
const carouselButtonLeft = document.querySelector('.button-arrow_left');
const carouselButtonRight = document.querySelector('.button-arrow_right');
let carouselPos = 0; //pointer to the first displayed element in the whole array of items (can be between 0 to length-1)
let baseCarouselShift;

const getCarouselShift = () => {
  return Number.parseInt(getComputedStyle(carouselCards[0]).width) +
    Number.parseInt(getComputedStyle(carouselWrapper).columnGap);
}

const getPetsAmount = () => pets.length;

const fillCard = (card, position) => {
  card.dataset.id = pets[position].id;
  card.querySelector('.card__image').setAttribute('src', pets[position].img);
  card.querySelector('.card__image').setAttribute('alt', `${pets[position].name}'s photo`);
  card.querySelector('.card__title').innerHTML = pets[position].name;
}

const fillCarousel = (cards, position) => {
  const totalPets = getPetsAmount();
  for (const card of cards) {
    if (position - 1 < 0) {
      position = totalPets - 1;
    } else if (position >= totalPets) {
      position = 0;
    }

    fillCard(card, position++);
  }
}

const initCarousel = (carouselWrapper) => {
  fillCarousel(carouselCards, carouselPos);
  baseCarouselShift = -getCarouselShift();
  carouselWrapper.style.transform = `translateX(${baseCarouselShift}px)`;
}

const carouselMoveLeft = () => {
  const shift = baseCarouselShift + getCarouselShift();
  carouselWrapper.style.transform = `translateX(${shift}px)`;
  carouselWrapper.style.transition = 'transform .3s ease';
  if (--carouselPos < 0) {
    carouselPos = getPetsAmount() - 1;
  }
  setTimeout( () => {
    carouselWrapper.style.transition = '';
  }, 300);
  console.log('carouselPos: ', carouselPos);
}

const carouselMoveRight = () => {
  const shift = baseCarouselShift - getCarouselShift();
  carouselWrapper.style.transition = 'transform .3s ease';
  const test = `translateX(-${shift}px)`;
  carouselWrapper.style.transform = `translateX(${shift}px)`;
  const totalPets = getPetsAmount();
  if (++carouselPos > totalPets - 1) {
    carouselPos = 0;
  }
  setTimeout( () => {
    carouselWrapper.style.transition = '';
  }, 300);
  console.log('test: ', test);
}

const correctCarouselShift = () => {
  baseCarouselShift = -getCarouselShift();
  carouselWrapper.style.transform = `translateX(${baseCarouselShift}px)`;
}


carouselButtonLeft.addEventListener('click', carouselMoveLeft);
carouselButtonRight.addEventListener('click', carouselMoveRight);
window.addEventListener('resize', correctCarouselShift);

initCarousel(carouselWrapper);


