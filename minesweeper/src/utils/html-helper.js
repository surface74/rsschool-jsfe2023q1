export default class HtmlHelper {
  static CreateElement({ tag = 'div', text = '', attr = {} } = {}) {
    const elem = document.createElement(tag);
    if (text) {
      elem.textContent = text;
    }

    const entries = Array.from(Object.entries(attr));
    for (let i = 0; i < entries.length; i += 1) {
      const [key, value] = entries[i];
      elem.setAttributeNode(document.createAttribute(key));
      elem.setAttribute(key, value);
    }
    return elem;
  }

  static ElementFromHTML(htmlString) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    return template.content.firstChild;
  }

  static getCssWidth(element) {
    const { width } = element.getBoundingClientRect();
    const { paddingLeft, paddingRight } = getComputedStyle(element);
    const { borderLeftWidth, borderRightWidth } = getComputedStyle(element);

    const cssWidth = width
      - Number.parseInt(paddingLeft, 10)
      - Number.parseInt(paddingRight, 10)
      - Number.parseFloat(borderLeftWidth)
      - Number.parseFloat(borderRightWidth);

    return cssWidth;
  }
}
