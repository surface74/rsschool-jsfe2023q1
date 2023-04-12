const wrapper = document.querySelector('.pagination__cards');
const buttonFastLeft = document.querySelector('.button-paginator_fast-left');
const buttonLeft = document.querySelector('.button-paginator_left');
const buttonRight = document.querySelector('.button-paginator_right');
const buttonFastRight = document.querySelector('.button-paginator_fast-right');
const buttonPage = document.querySelector('.button-paginator_page');

let currentPage = 0;
let currentCardsOnPage;
let pets;
const cardsPull = [];

const getCardsPerPage = () => {
  const width = document.body.clientWidth;
  if (width > 1200) {
    return 8;
  } else if (width > 740) {
    return 6;
  }
  return 3;
}

const getTotalPages = () => Math.ceil(cardsPull.length / getCardsPerPage());


const fillCard = (card, position) => {
  const index = cardsPull[position];
  card.dataset.id = pets[index].id;
  card.querySelector('.card__image').setAttribute('src', pets[index].img);
  card.querySelector('.card__image').setAttribute('alt', `${pets[index].name}'s photo`);
  card.querySelector('.card__title').innerHTML = pets[index].name;
}

const fillPagination = (page) => {
  const cardsPerPage = getCardsPerPage();
  for (let i = 0; i < cardsPerPage; i++) {
    const index = (page - 1) * cardsPerPage + i;
    fillCard(wrapper.children[i], index);
  }
}

const refreshPagButton = () => {
  buttonFastLeft.classList.add('disabled');
  buttonLeft.classList.add('disabled');
  buttonRight.classList.add('disabled');
  buttonFastRight.classList.add('disabled');

  if (currentPage > 1) {
    buttonFastLeft.classList.remove('disabled');
    buttonLeft.classList.remove('disabled');
  }
  if (currentPage != getTotalPages()) {
    buttonFastRight.classList.remove('disabled');
    buttonRight.classList.remove('disabled');
  }
  buttonPage.textContent = currentPage;
}

export const init = (petsData) => {
  pets = petsData;
  const PETS_AMOUNT = pets.length;
  cardsPull.splice(0, 0, ...[...shuffle(PETS_AMOUNT), ...shuffle(PETS_AMOUNT),
  ...shuffle(PETS_AMOUNT), ...shuffle(PETS_AMOUNT),
  ...shuffle(PETS_AMOUNT), ...shuffle(PETS_AMOUNT)]);
  currentCardsOnPage = getCardsPerPage();
  moveToPage(1);
}

const moveToPage = (pageNumber) => {
  currentPage = pageNumber;
  refreshPagButton();
  fillPagination(currentPage);
}

function shuffle(elementNumber) {
  const arr = new Array(elementNumber).fill(0).map((item, index) => index);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[j], arr[i]] = [arr[i], arr[j]];
  }
  return arr;
}

buttonFastLeft.addEventListener('click', () => moveToPage(1));
buttonLeft.addEventListener('click', () => moveToPage(currentPage - 1));
buttonRight.addEventListener('click', () => moveToPage(currentPage + 1));
buttonFastRight.addEventListener('click', () => moveToPage(getTotalPages()));

window.addEventListener('resize', () => {
  if (currentCardsOnPage != getCardsPerPage()) {
    moveToPage(1);
  }
});



