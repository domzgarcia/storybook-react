import React from 'react';
import { storiesOf } from '@storybook/react';
import {Input} from '../../src/@components';
import '../styles/global.css';

storiesOf('Input Text', module)
  .add('with placeholder', () => (
      <Input placeholder="Input your name" />
  ))
  .add('with alignment setting', () => (
      <Input align="right" value="Domz Awesome" />
  ))
  .add('with custom class', () => (
  		<Input className="red bordered" align="center" value="Domz Awesome" />
  ));
