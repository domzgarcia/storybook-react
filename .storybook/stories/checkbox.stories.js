import React from 'react';
import { storiesOf } from '@storybook/react';
import {Checkbox} from '../../src/@components';
import '../styles/mini-grid-system.css';

storiesOf('Input checkbox', module)
    .add('No text', () => (
        <Checkbox />
    ))
    .add('default color', () => (
        <Checkbox>Default color</Checkbox>
    ))
    .add('with attribute disabled', () => (
        <Checkbox disabled>Default color</Checkbox>
    ))
    .add('with attribute checked', () => (
        <div>
            <Checkbox checked type="primary">Eat your meal</Checkbox>
            <Checkbox type="primary">Learn to code</Checkbox>
        </div>
    ))
    .add('with attribute name', () => (
        <Checkbox name="fullName">Domz Garcia</Checkbox>
    ))
    .add('with all colors', () => (
        <div className="container -story-frame">
        <div className="row">
            <div className="col"><Checkbox checked type="primary">Chicken</Checkbox></div>
            <div className="col"><Checkbox checked type="warning">Pork</Checkbox></div>
            <div className="col"><Checkbox checked type="success">Vegetable</Checkbox></div>
            <div className="col"><Checkbox checked type="danger">Water</Checkbox></div>
        </div>
        </div>
    ))
    .add('with attribute onChange, alert value', () => (
        <Checkbox name="fullName"
            onChange={(value)=>{
                alert('[value]\n' + JSON.stringify(value, null, 4) );
            }}
        >Domz Garcia</Checkbox>
    ))