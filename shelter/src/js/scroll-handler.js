export function preventScroll(e) {
  e.preventDefault();
}

export function preventScrollByKeys(e) {
  const keys = ['ArrowUp', 'ArrowDown', 'Tab'];
  if (keys.includes(e.key)) {
    e.preventDefault();
  };
}
