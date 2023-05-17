import HtmlHelper from '../utils/html-helper.js';

const iconsHTML = [
  '<link rel="apple-touch-icon" sizes="180x180" href="favicon-180x180.ico">',
  '<link rel="icon" sizes="32x32" href="favicon-32x32.ico">',
  '<link rel="icon" sizes="64x64" href="favicon-64x64.ico">',
  '<link rel="icon" sizes="128x128" href="favicon-128x128.ico">',
  '<link rel="icon" href="favicon.ico"></link>',
];

const icons = iconsHTML.map((icon) => HtmlHelper.ElementFromHTML(icon));

export default icons;
