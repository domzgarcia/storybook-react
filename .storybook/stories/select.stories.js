import React from 'react';
import { storiesOf } from '@storybook/react';
import { Select } from '../../src/@components';
import '../styles/global.css';

storiesOf('Select', module)
  .add('with placeholder', () => {
    return <Select placeholder={"Select Characters"}/>
  })
  .add('with nullable', () => {
    const data = [
      {value: 2, label: 'I should be a second choice.'},
    ];
    return <Select nullable data={data} />
  })
  .add('with block', () => {
    const data = [
      {value: 'block', label: 'This is a block content.'},
    ];
    return <Select block data={data} />
  })
  .add('with data', () => {
    let data = [
      {value: 'Domz Garcia', label: 'Domz Garcia'},
      {value: 'Ervinne Sodusta', label: 'Ervinne Sodusta'},
      {value: 'Mark Rowi Dizon', label: 'Mark Rowi Dizon'},
      {value: 'Jeffrey Claude', label: 'Jeffrey Claude'},
      {value: 'Napoleon Nap', label: 'Napoleon Nap'},
    ];
    return (<Select data={data} placeholder="Select user" />)
  })
  .add('with attribute size', () => {
    let data = [
      {value: 'Domz Garcia', label: 'Domz Garcia'},
      {value: 'Ervinne Sodusta', label: 'Ervinne Sodusta'},
      {value: 'Napoleon Nap', label: 'Napoleon Nap'},
      {value: 'Philippines', label: 'Philippines'},
      {value: 'Australia', label: 'Australia'},
      {value: 'Singapore', label: 'Singapore'},
    ];
    return (<Select data={data} size="4" />)
  })
  .add('with long text', () => {
    let data = [
      {value: 'Domz Garcia', label: 'Domz Garcia'},
      {value: 'Ervinne Sodusta', label: 'Ervinne Sodusta'},
      {value: 'Napoleon Nap', label: 'Napoleon Nap'},
      {value: 'longText', label: 'With very long text, might be 2 or 3 lines, this is to test if UI is able to comply with this example.'},
    ];
    return (<Select data={data} />)
  })
  .add('with multiple instance', () => {
    let data1 = [
      {value: 'Domz Garcia', label: 'Domz Garcia'},
    ];
    let data2 = [
      {value: 'Jeffrey Mabazza', label: 'Jeffrey Mabazza'},
    ];
    let data3 = [
      {value: 'Ervinne Sodusta', label: 'Ervinne Sodusta'},
    ];
    return (
      <div>
        <Select data={data1} />
        <br /><br />
        <Select data={data2} />
        <br /><br />
        <Select data={data3} />
      </div>
    )
  })
  .add('with auto detect up/down list.', () => {
    let data = [
      {value: 'Domz Garcia', label: 'Domz Garcia'},
      {value: 'Ervinne Sodusta', label: 'Ervinne Sodusta'},
      {value: 'Mark Rowi Dizon', label: 'Mark Rowi Dizon'},
      {value: 'Jeffrey Claude', label: 'Jeffrey Claude'},
      {value: 'Napoleon Nap', label: 'Napoleon Nap'},
      {value: 'Philippines', label: 'Philippines'},
      {value: 'Singapore', label: 'Singapore'},
      {value: 'Australia', label: 'Australia'},
    ];
    return (
      <div style={{marginTop:'500px'}}>
        <Select data={data} />
      </div>
    )
  }, {info: "To check, open your inspect element debugger change windows height to mock the scrolling knob."})
  .add('with attribute onChange, see alert value', () => {
    const data = [{value: "Domz Garcia", label: 'The creator'},];
    return (<Select 
      nullable 
      placeholder="Select user" 
      data={data}
      onChange={(value)=> {
        alert('[value]\n' + JSON.stringify(value, null, 4) );
      }} 
    />)
  })
  .add('with attribute style object', () => {
    let data = [
      {value: 'Domz Garcia', label: 'Domz Garcia'},
      {value: 'Ervinne Sodusta', label: 'Ervinne Sodusta'},
      {value: 'Napoleon Nap', label: 'Napoleon Nap'},
      {value: 'longText', label: 'With very long text, might be 2 or 3 lines, this is to test if UI is able to comply with this example.'},
    ];
    return (<Select style={{boxShadow: 'inset 3px 3px 5px 6px #eee'}} data={data} />)
  })
  /*
  .add('with className [TODO: Not working]', () => {
    let data = [
      {value: 'Domz Garcia', label: 'Domz Garcia'},
      {value: 'Ervinne Sodusta', label: 'Ervinne Sodusta'},
      {value: 'Napoleon Nap', label: 'Napoleon Nap'},
      {value: 'longText', label: 'With very long text, might be 2 or 3 lines, this is to test if UI is able to comply with this example.'},
    ];
    return (<Select className={"red bordered"} data={data} 
    onChange={(value)=> {
      alert('[value]\n' + JSON.stringify(value, null, 4) );
    }} 
    />)
  })*/
  