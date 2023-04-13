const buttonLeft = document.querySelector('.button-arrow_left');
const buttonRight = document.querySelector('.button-arrow_right');
const wrapper = document.querySelector('.carousel__cards');

let cardIndexes = []; //shuffled indexes for get pet's card from the pool
let pets = []; //pets' data
let prevLeftCardIDs = []; //keeps the last cards' indexes after move to the right
let prevRightCardIDs = []; //keeps the last cards' indexes after move to the right
let currentCardsOnPage;

const getVisibledCardsCount = () => {
  const width = document.body.clientWidth;
  if (width > 1100) {
    return 3;
  } else if (width > 750) {
    return 2;
  }
  return 1;
}

const removeUsedCardIndexes = (indexes, ids) => {
  return indexes.filter(item => !ids.includes(item));
}

const getCarouselShift = () => {
  return Number.parseInt(getComputedStyle(wrapper.children[0]).width) +
    Number.parseInt(getComputedStyle(wrapper).columnGap);
}

const getPetsAmount = () => pets.length;

const fillCard = (card, index) => {
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
    fillCard(card, cardIndexes[index++]);
  }
}

const getCurrentCardsId = () => {
  const cards = wrapper.querySelectorAll('.card');
  const indexes = [];
  for (const card of cards) {
    indexes.push(+card.dataset.id);
  }
  return indexes;
}

const moveLeft = () => {
  buttonLeft.setAttribute('disabled', 'true');
  wrapper.style.transition = '';
  const times = getVisibledCardsCount();
  prevRightCardIDs = getCurrentCardsId();
  cardIndexes = removeUsedCardIndexes(cardIndexes, prevRightCardIDs);

  for (let i = 0; i < times; i++) {
    const card = wrapper.children[0].cloneNode(true);
    card.style.display = 'none';
    const newCardIndex = (prevLeftCardIDs.length)
      ? prevLeftCardIDs[prevLeftCardIDs.length - i - 1]
      : cardIndexes[i];

    fillCard(card, newCardIndex);
    wrapper.prepend(card);
  }
  prevLeftCardIDs = [];

  const shift = times * getCarouselShift();
  wrapper.style.transform = `translateX(-${shift}px)`;
  for (const child of wrapper.children) {
    child.removeAttribute('style');
  }

  setTimeout(() => {
    wrapper.style.transition = 'transform .3s ease';
    wrapper.style.transform = 'translateX(0)';
    for (let i = 0; i < times; i++) {
      wrapper.children[wrapper.children.length - 1].remove();
    }
    cardIndexes = shuffle(getPetsAmount());
    buttonLeft.removeAttribute('disabled');
  }, 300);
}

const moveRight = () => {
  buttonRight.setAttribute('disabled', 'true');
  const times = getVisibledCardsCount();
  prevLeftCardIDs = getCurrentCardsId();
  cardIndexes = removeUsedCardIndexes(cardIndexes, prevLeftCardIDs);

  for (let i = 0; i < times; i++) {
    const card = wrapper.children[0].cloneNode(true);
    let newCardIndex = (prevRightCardIDs.length)
      ? prevRightCardIDs[i] : cardIndexes[i];

    fillCard(card, newCardIndex);
    wrapper.append(card);
  }
  prevRightCardIDs = [];

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
    buttonRight.removeAttribute('disabled');
  }, 300);
}

function correctCardsCount(neededCardsCount) {
  const cards = wrapper.querySelectorAll('.card');

  if (neededCardsCount < cards.length) {
    for (let i = cards.length; i > neededCardsCount; i--) {
      cards[i - 1].remove();
    }
  } else if (neededCardsCount > cards.length) {
    for (let i = cards.length; i < neededCardsCount; i++) {
      cards[0].parentElement.append(cards[0].cloneNode(true));
    }
  }
}

export const init = (petsData) => {
  pets = petsData;
  currentCardsOnPage = getVisibledCardsCount();
  correctCardsCount(currentCardsOnPage);

  cardIndexes = shuffle(getPetsAmount());
  fillCarousel();
}

buttonLeft.addEventListener('click', moveLeft);
buttonRight.addEventListener('click', moveRight);
window.addEventListener('resize', () => {
  if (currentCardsOnPage != getVisibledCardsCount()) {
    init(pets);
  }
});
