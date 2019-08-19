import React, {Fragment} from 'react';
import { storiesOf } from '@storybook/react';
import {Input, InputGroup} from '../../src/@components';
import '../styles/global.css';
import '../styles/mini-grid-system.css';
import '../styles/custom.css';

storiesOf('Input Text', module)
    // settings
    .addParameters({ options: { panelPosition: 'bottom' } })

    .add('with placeholder', () => (
        <Input placeholder="Input your name" />
    ))
    .add('with property align', () => (
        <Input align="right" defaultValue="Domz Garcia" />
    ))
    .add('with custom class', () => (
        <Input className="red bordered" align="center" defaultValue="Domz Garcia" />
    ))
    .add('with property block', () => (
        <Input block defaultValue="Domz Garcia" />
    ))
    .add('with label', () => (
        <div className="container -story-frame">
            <div className="row">
                <div className="col">
                    <label className="nw-label">Hello</label>
                </div>
                <div className="col">
                    <Input block defaultValue="Domz Garcia" />
                </div>
            </div>
        </div>
    ), {info: "[NOTICE] Use any Grid system you like to align label and input. The example provided above use Bootstrap Grid." })

storiesOf('Addon', module)
    .add('with addon before', () => (
        <Input placeholder="Email address"
            addOnBefore={<div role="img">
                <span >😊</span>
            </div>}
        />
    ))
    .add('with addon after', () => (
        <Input placeholder="Email address"
            addOnAfter={<div>
                <span role="img">😊</span>
            </div>}
        />
    ))
    .add('with addon before, after and block', () => (
        <div>
            <Input placeholder="First Name" block
                addOnBefore={<div>
                    <span role="img">😊</span>
                </div>}
            />
            <br />
            <Input placeholder="Family Name" block
                addOnAfter={<div role="img">
                    <span>😊</span>
                </div>}
            />
        </div>
    ))

storiesOf('InputGroup', module)
    // .addDecorator(children => <InputGroup compact>{children()}</InputGroup>)
    .add('none compact', () => {
        return (
        <div>
            <Input defaultValue="Domz Garcia" />&nbsp;&nbsp;
            <Input defaultValue="Domz Garcia" />
        </div>)
    })
    .add('with property compact', () => {
        return (
            <InputGroup compact>  
                <Input defaultValue="Domz Garcia" />
                <Input defaultValue="Domz Garcia" />
            </InputGroup>
        )
    })
    .add('with property compact on more than 2 elements', () => {
        return (
        <InputGroup compact>
            <Input defaultValue="John " />
            <Input defaultValue="Dello" />
            <Input defaultValue="Smith" />
            <Input defaultValue="Bella" />
            <Input defaultValue="Chou" />
        </InputGroup>)
    })