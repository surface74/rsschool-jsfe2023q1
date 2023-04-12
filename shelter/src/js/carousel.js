const buttonLeft = document.querySelector('.button-arrow_left');
const buttonRight = document.querySelector('.button-arrow_right');
const wrapper = document.querySelector('.carousel__cards');

let cardIndexes = []; //shuffled indexes for get pet's card from the pool
let pets = []; //pets' data

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
  return Number.parseInt(getComputedStyle(wrapper.children[0]).width) +
    Number.parseInt(getComputedStyle(wrapper).columnGap);
}

const getPetsAmount = () => pets.length;

const fillCard = (card, position) => {
  const index = cardIndexes[position];
  card.dataset.id = pets[index].id;
  card.querySelector('.card__image').setAttribute('src', pets[index].img);
  card.querySelector('.card__image').setAttribute('alt', `${pets[index].name}'s photo`);
  card.querySelector('.card__title').innerHTML = pets[index].name;
}

const shuffle = (elementNumber) => {
  const arr = new Array(elementNumber).fill(0).map((item, index) => index);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}

const fillCarousel = () => {
  let index = 0;
  for (const card of wrapper.children) {
    fillCard(card, index++);
  }
}

const moveLeft = () => {
  buttonLeft.setAttribute('disabled', 'true');
  wrapper.style.transition = '';
  const times = getVisibledCardsCount();

  for (let i = 0; i < times; i++) {
    const card = wrapper.children[0].cloneNode(true);
    card.style.display = 'none';
    fillCard(card, cardIndexes.length - 1 - i);
    wrapper.prepend(card);
  }

  const shift = times * getCarouselShift();
  wrapper.style.transform = `translateX(-${shift}px)`;
  for (let i = 0; i < times; i++) {
    wrapper.children[i].removeAttribute('style');
  }

  setTimeout(() => {
    wrapper.style.transition = 'transform .3s ease';
    wrapper.style.transform = 'translateX(0)';
    for (let i = 0; i < times; i++) {
      wrapper.children[wrapper.children.length - 1].remove();
    }
    cardIndexes = shuffle(getPetsAmount());
    cardIndexes = removeUsedCards(cardIndexes, times);
    buttonLeft.removeAttribute('disabled');
  }, 300);
}

const moveRight = () => {
  buttonRight.setAttribute('disabled', 'true');
  const times = getVisibledCardsCount();

  for (let i = 0; i < times; i++) {
    const card = wrapper.children[0].cloneNode(true);
    fillCard(card, cardIndexes.length - 1 - i);
    wrapper.append(card);
  }

  const shift = times * getCarouselShift();
  wrapper.style.transition = 'transform .3s ease';
  wrapper.style.transform = `translateX(-${shift}px)`;

  setTimeout(() => {
    wrapper.style.transition = '';
    wrapper.style.transform = 'translateX(0)';
    for (let i = 0; i < times; i++) {
      wrapper.children[0].remove();
    }

    cardIndexes = shuffle(getPetsAmount());
    cardIndexes = removeUsedCards(cardIndexes, times);
    buttonRight.removeAttribute('disabled');
  }, 300);
}

export const init = (petsData) => {
  pets = petsData;
  cardIndexes = shuffle(getPetsAmount());
  fillCarousel();
}

buttonLeft.addEventListener('click', moveLeft);
buttonRight.addEventListener('click', moveRight);

