'use strict';

const carouselWrapper = document.querySelector('.carousel__cards');
const carouselButtonLeft = document.querySelector('.button-arrow_left');
const carouselButtonRight = document.querySelector('.button-arrow_right');
let carouselPos = 0; //pointer to the first displayed element in the whole array of items (can be between 0 to length-1)
let baseCarouselShift;

const getVisibledCardsCount = () => {
  const width = document.body.clientWidth;
  if (width > 1100) {
    return 3;
  } else if (width > 750) {
    return 2;
  }
  return 1;
}

const switchControls = (state) => {
  if (state) {
    carouselButtonLeft.removeAttribute('disabled');
  }
}

const getCarouselShift = () => {
  return Number.parseInt(getComputedStyle(carouselWrapper.children[0]).width) +
    Number.parseInt(getComputedStyle(carouselWrapper).columnGap);
}

const getPetsAmount = () => pets.length;

const fillCard = (card, position) => {
  card.dataset.id = pets[position].id;
  card.querySelector('.card__image').setAttribute('src', pets[position].img);
  card.querySelector('.card__image').setAttribute('alt', `${pets[position].name}'s photo`);
  card.querySelector('.card__title').innerHTML = pets[position].name;
}

const fillCarousel = (position) => {
  const totalPets = getPetsAmount();
  for (const card of carouselWrapper.children) {
    if (position - 1 < 0) {
      position = totalPets - 1;
    } else if (position >= totalPets) {
      position = 0;
    }
    fillCard(card, position++);
  }
}

const initCarousel = (carouselWrapper) => {
  fillCarousel(carouselPos);
  baseCarouselShift = -getCarouselShift();
  carouselWrapper.style.transform = `translateX(${baseCarouselShift}px)`;
}

const carouselMoveLeft = () => {
  carouselButtonLeft.setAttribute('disabled', 'true');
  const times = getVisibledCardsCount();

  const shift = baseCarouselShift + getCarouselShift();
  carouselWrapper.style.transform = `translateX(${shift}px)`;
  carouselWrapper.style.transition = 'transform .3s ease';
  if (--carouselPos < 0) {
    carouselPos = getPetsAmount() - 1;
  }

  setTimeout(() => {
    carouselWrapper.style.transition = '';
    const card = carouselWrapper.children[0].cloneNode(true);
    const prevIndex = (carouselPos == 0) ? getPetsAmount() - 1 : carouselPos - 1;

    fillCard(card, prevIndex);
    carouselWrapper.prepend(card);
    carouselWrapper.style.transform = `translateX(${baseCarouselShift}px)`;
    carouselWrapper.lastElementChild.remove();
    carouselButtonLeft.removeAttribute('disabled');
  }, 300);
}

const carouselMoveRight = () => {
  carouselButtonRight.setAttribute('disabled', 'true');

  const shift = baseCarouselShift - getCarouselShift();
  carouselWrapper.style.transform = `translateX(${shift}px)`;
  carouselWrapper.style.transition = 'transform .3s ease';
  const totalPets = getPetsAmount();
  if (++carouselPos > totalPets - 1) {
    carouselPos = 0;
  }

  setTimeout(() => {
    carouselWrapper.style.transition = '';

    const card = carouselWrapper.children[0].cloneNode(true);
    const nextIndex = (carouselPos >= totalPets - 3) ? (carouselPos - totalPets + 3) : carouselPos + 3;

    fillCard(card, nextIndex);
    carouselWrapper.append(card);
    carouselWrapper.style.transform = `translateX(${baseCarouselShift}px)`;
    carouselWrapper.firstElementChild.remove();
    carouselButtonRight.removeAttribute('disabled');
  }, 300);
}

const correctCarouselShift = () => {
  baseCarouselShift = -getCarouselShift();
  carouselWrapper.style.transform = `translateX(${baseCarouselShift}px)`;
}

const shuffle = (elementNumber) => {
  const arr = new Array(elementNumber).fill(0).map((item, index) => index);
  for(let i = arr.length - 1; i > 0; i--){
  	const j = Math.floor(Math.random()*(i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}

carouselButtonLeft.addEventListener('click', carouselMoveLeft);
carouselButtonRight.addEventListener('click', carouselMoveRight);
window.addEventListener('resize', correctCarouselShift);

initCarousel(carouselWrapper);


///тест
const testButton = document.querySelector('.test');
testButton.addEventListener('click', () => {
  const card = carouselWrapper.children[0].cloneNode(true);
  carouselWrapper.prepend(card);
});


