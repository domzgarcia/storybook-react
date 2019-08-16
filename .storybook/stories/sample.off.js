import React from 'react';
import { storiesOf } from '@storybook/react';
import { Button } from '@storybook/react/demo';

storiesOf('Button', module)
  .add('with text', () => (
    <Button>Hello Button</Button>
  ))
  .add('with emoji', () => (
    <Button><span role="img" aria-label="so cool">😀 😎 👍 💯</span></Button>
  ));   

  
/* Link: https://github.com/priley86/storybook-react-demo/blob/master/src/Button/Button.js
SampleButton
storiesOf('Sample Button', module)
  .add('Default', () => (
  	<div>
  		<SampleButton>Sample Button</SampleButton>
  	</div>
  ))
*/
