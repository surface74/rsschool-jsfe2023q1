const preventedKeys = ['ArrowUp', 'ArrowDown', 'Tab'];

const preventScroll = (e) => { e.preventDefault(); }

const preventScrollByKeys = (e) => {
  if (preventedKeys.includes(e.key)) {
    e.preventDefault();
  };
}