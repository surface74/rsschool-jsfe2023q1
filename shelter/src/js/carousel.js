'use strict';

const carouselWrapper = document.querySelector('.carousel__cards');
const carouselButtonLeft = document.querySelector('.button-arrow_left');
const carouselButtonRight = document.querySelector('.button-arrow_right');
let carouselPos = 0; //pointer to the first displayed element in the whole array of items (can be between 0 to length-1)
let baseCarouselShift;
let cardIndexes = []; //shuffled indexes for get pet's card from the pool

const getVisibledCardsCount = () => {
  const width = document.body.clientWidth;
  if (width > 1100) {
    return 3;
  } else if (width > 750) {
    return 2;
  }
  return 1;
}

const removeUsedCards = (arr, number) => {
  return arr.slice(0, -number);
}

const getCarouselShift = () => {
  return Number.parseInt(getComputedStyle(carouselWrapper.children[0]).width) +
    Number.parseInt(getComputedStyle(carouselWrapper).columnGap);
}

const getPetsAmount = () => pets.length;

const fillCard = (card, position) => {
  const index = cardIndexes[position];
  card.dataset.id = pets[index].id;
  card.querySelector('.card__image').setAttribute('src', pets[index].img);
  card.querySelector('.card__image').setAttribute('alt', `${pets[index].name}'s photo`);
  card.querySelector('.card__title').innerHTML = pets[index].name;
}

const fillCarousel = () => {
  let index = 0;
  for (const card of carouselWrapper.children) {
    fillCard(card, index++);
  }
}

const initCarousel = () => {
  cardIndexes = shuffle(getPetsAmount());
  fillCarousel();
}

const carouselMoveLeft = () => {
  carouselButtonLeft.setAttribute('disabled', 'true');
  carouselWrapper.style.transition = '';
  const times = getVisibledCardsCount();

  for (let i = 0; i < times; i++) {
    const card = carouselWrapper.children[0].cloneNode(true);
    card.style.display = 'none';
    fillCard(card, cardIndexes.length - 1 - i);
    carouselWrapper.prepend(card);
  }

  const shift = times * getCarouselShift();
  carouselWrapper.style.transform = `translateX(-${shift}px)`;
  for (let i = 0; i < times; i++) {
    carouselWrapper.children[i].removeAttribute('style');
  }

  setTimeout(() => {
    carouselWrapper.style.transition = 'transform .3s ease';
    carouselWrapper.style.transform = 'translateX(0)';
    for (let i = 0; i < times; i++) {
      carouselWrapper.children[carouselWrapper.children.length - 1].remove();
    }
    cardIndexes = shuffle(getPetsAmount());
    cardIndexes = removeUsedCards(cardIndexes, times);
    carouselButtonLeft.removeAttribute('disabled');
  }, 300);
}

const carouselMoveRight = () => {
  carouselButtonRight.setAttribute('disabled', 'true');
  const times = getVisibledCardsCount();

  for (let i = 0; i < times; i++) {
    const card = carouselWrapper.children[0].cloneNode(true);
    fillCard(card, cardIndexes.length - 1 - i);
    carouselWrapper.append(card);
  }

  const shift = times * getCarouselShift();
  carouselWrapper.style.transition = 'transform .3s ease';
  carouselWrapper.style.transform = `translateX(-${shift}px)`;

  setTimeout(() => {
    carouselWrapper.style.transition = '';
    carouselWrapper.style.transform = 'translateX(0)';
    for (let i = 0; i < times; i++) {
      carouselWrapper.children[0].remove();
    }

    cardIndexes = shuffle(getPetsAmount());
    cardIndexes = removeUsedCards(cardIndexes, times);
    carouselButtonRight.removeAttribute('disabled');
  }, 300);
}

const shuffle = (elementNumber) => {
  const arr = new Array(elementNumber).fill(0).map((item, index) => index);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}

carouselButtonLeft.addEventListener('click', carouselMoveLeft);
carouselButtonRight.addEventListener('click', carouselMoveRight);

initCarousel(carouselWrapper);


