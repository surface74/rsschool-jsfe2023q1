import hljs from 'highlight.js/lib/core';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('xml', xml);
import css from 'highlight.js/lib/languages/css';
hljs.registerLanguage('css', css);
import 'highlight.js/styles/vs2015.css';

export default hljs;
