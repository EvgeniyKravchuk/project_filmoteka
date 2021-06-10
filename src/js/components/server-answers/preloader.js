import { Spinner } from 'spin.js';
import 'spin.js/spin.css';
import * as basicLightbox from 'basiclightbox';

const spinnerOptions = {
  lines: 15, // The number of lines to draw
  length: 38, // The length of each line
  width: 17, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: 'black', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '100%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

export const spinner = basicLightbox.create(`
        <h1>Dynamic Content</h1>
        <p>You can set the content of the lightbox with JS.</p>
  <div id="spinner-root"></div>
`);
const spinnerRoot = spinner.element().querySelector('#spinner-root');
new Spinner(spinnerOptions).spin(spinnerRoot);


