import React from 'react';
import { storiesOf } from '@storybook/react';
import {Checkbox} from '../../src/@components';
import '../styles/mini-grid-system.css';

storiesOf('Input checkbox', module)
    .add('default', () => (
        <Checkbox>Default unset color</Checkbox>
    ))
    .add('with all colors', () => (
        <div className="container -story-frame">
        <div className="row">
            <div className="col"><Checkbox type="primary">Chicken</Checkbox></div>
            <div className="col"><Checkbox type="warning">Pork</Checkbox></div>
            <div className="col"><Checkbox type="success">Vegetable</Checkbox></div>
            <div className="col"><Checkbox type="danger">Water</Checkbox></div>
        </div>
        </div>
    ))