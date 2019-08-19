import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

function loadStories() {
  const req = require.context('./stories', true, /\.stories\.js$/);
  req.keys().forEach(filename => req(filename));
}

addDecorator((withInfo({
  inline: true,
  header: false,
  source: true,
})));

configure(loadStories, module);