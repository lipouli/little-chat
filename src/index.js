import { render } from 'react-dom';
import React from 'react';

import App from './components/App';

const targetNode = document.getElementById('root');

document.addEventListener('DOMContentLoaded',() => {
  render(<App />, targetNode);
});
