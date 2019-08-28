import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getOffset, generateId, blurElem} from './helpers';
import './select.scss';

// global variable not included on states.
let _isSelectTagMounted = false;
let _last_known_scroll_position = 0;
let _collisionY = 100;
let _elemOffset = null;

class Select extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            currLabel: 'Select',
            currValue: '',
            // size
            size: 6,
            hasSelection: false,
            data: [],
            selectTagId: '',
            placeholder: '',
        };
        this.addWindowEvents    = this.addWindowEvents.bind(this);
        this.removeWindowEvents = this.removeWindowEvents.bind(this);
        this.handleSelectOpener = this.handleSelectOpener.bind(this);
        this.propsModifications = this.propsModifications.bind(this);
    }

    componentDidMount(){
        _isSelectTagMounted = true;

        this.setState({
            selectTagId: generateId(),
        },
        () => {
            const elem = document.querySelector(`#nw-select-tag-${this.state.selectTagId}`);
            _elemOffset = getOffset(elem);
            /* 
            |---------------------
            | Init Events
            |---------------------
            */
            const blurElemName = `#blur-control-${this.state.selectTagId}`;
            blurElem(blurElemName, (isInside) => {
                if( ! isInside) this.setState({isOpen: false});
            });
            this.addWindowEvents();
            /* 
            |---------------------
            | Props Modifications
            |---------------------
            */
            this.propsModifications();
        });
    }
    
    propsModifications(){
        const size = this.props.size || this.state.size;
        const elem = document.querySelector('.select-wrap .nw-option');
        elem.style.maxHeight = (+size * 30) + 'px';
        const data = this.props.data;
        const placeholder = this.props.placeholder;
        if(data) this.setState({data: data});
        if(placeholder) this.setState({currLabel: placeholder,});
    }

    componentWillUnmount(){
        _isSelectTagMounted = false;
        this.removeWindowEvents();
    }

    removeWindowEvents(){
        window.removeEventListener('resize', this.onWindowResize);
        window.removeEventListener('scroll', this.onWindowScroll);
    }

    addWindowEvents(){
        window.addEventListener('resize', this.onWindowResize);
        window.addEventListener('scroll', this.onWindowScroll);
    }

    onWindowScroll(evt){
        if( ! _isSelectTagMounted) return 0;
        // console.log('scroll', evt);
    }

    onWindowResize(evt){
        if( ! _isSelectTagMounted) return 0;
        // console.log('resize', evt);
    }
    
    handleSelectOpener(e){
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    renderAdvanceOption(data){
        return data.map((opt, idx) => {
            return (
                <li key={idx}
                data-value={opt.value}
                className={((this.state.currValue===opt.value)?'-active':'')} 
                onClick={(e)=> {
                    const value = e.target.dataset.value;
                    const label = e.target.innerText;
                    this.setState({
                        currLabel: label,
                        currValue: value,
                    });
                }} >{opt.label}</li>
            )
        });
    }

    renderNormalOption(data){
        return data.map((opt, idx) => {
            return (<option key={idx} value={opt.value}>{opt.label}</option>)
        })
    }
    
    render(){
        const {isOpen, currLabel, data, currValue, selectTagId} = this.state;
        return (
            <div id={`blur-control-${selectTagId}`} className="select-wrap -switched"
                onClick={this.handleSelectOpener}
                >
                <input className="select-input -prevent-pointer no-selection" 
                placeholder={currLabel} 
                alt={currLabel}
                />
                
                <select id={`nw-select-tag-${selectTagId}`} 
                className="select-tag no-selection" 
                value={currValue}
                >
                    {this.renderNormalOption(data)}
                </select>
                {/* 
                    Mocks Select Options Tag 
                    ------------------------
                    TODO: Option
                    TODO: OptionGroup
                    TODO: Normal select
                    TODO: Like Tag
                */}
                <ul className={`nw-option no-selection -down ${(
                    (isOpen) ? '' : '-hidden-opts'
                )}`}>
                    {this.renderAdvanceOption(data)}
                </ul>
                
                {/* SVG file from antDesign Icon */}
                <svg viewBox="64 64 896 896" 
                focusable="false" 
                className={`ant-arrow ${(
                    (isOpen) ? '-rotate' : ''
                )}`}
                data-icon="down" 
                width="1em" 
                height="1em" 
                fill="#d9d9d9" 
                aria-hidden="true">
                    <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
            </div>
        )
    }
}

Select.propTypes = {
  disabled: PropTypes.bool,
  size: PropTypes.string,
  placeholder: PropTypes.string,
}

export default Select;
