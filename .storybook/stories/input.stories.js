import React, {Fragment} from 'react';
import { storiesOf } from '@storybook/react';
import {Input, InputGroup} from '../../src/@components';
import '../styles/global.css';

storiesOf('Input Text', module)
    // settings
    .addParameters({ options: { panelPosition: 'bottom' } })

    .add('with placeholder', () => (
        <Input placeholder="Input your name" />
    ))
    .add('with property align', () => (
        <Input align="right" value="Domz Garcia" />
    ))
    .add('with custom class', () => (
        <Input className="red bordered" align="center" value="Domz Garcia" />
    ))
    .add('with property block', () => (
        <Input block value="Domz Garcia" />
    ))

storiesOf('InputGroup', module)
    .addDecorator(children => <InputGroup compact>{children()}</InputGroup>)
    .add('with property compact', () => {
        return (
        <div>
            <Input value="Domz Garcia" />
            <Input value="Domz Garcia" />
        </div>)
    })
    .add('with property compact 3 elements', () => {
        return (
        <div>
            <Input value="Domz Garcia" />
            <Input value="Domz Garcia" />
            <Input value="Domz Garcia" />
        </div>)
    })