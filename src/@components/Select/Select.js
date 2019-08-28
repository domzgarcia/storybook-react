import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getOffset, generateId, blurElem, clearElemListeners} from './helpers';
import './select.scss';

// global variable not included on states.
let _isSelectTagMounted = false;
let _last_known_scroll_position = 0;
let _overPixels = 120;
let _elemOffset = null;
let _selectIsDown = true;

class Select extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            currLabel: 'Select',
            currValue: '',
            size: 6, // default size
            hasSelection: false,
            data: [],
            selectTagId: '',
            placeholder: '',
            isBlock: false,
            isDown: true,
        };
        this.addWindowEvents    = this.addWindowEvents.bind(this);
        this.removeWindowEvents = this.removeWindowEvents.bind(this);
        this.handleSelectOpener = this.handleSelectOpener.bind(this);
        this.propsModifications = this.propsModifications.bind(this);
    }

    componentDidMount(){
        _isSelectTagMounted = true;
        _selectIsDown = true;

        this.setState({
            selectTagId: generateId(),
        },
        () => {
            const elem  = document.querySelector(`#nw-select-tag-${this.state.selectTagId}`);
            _elemOffset = getOffset(elem);
            /* 
            |-------------
            | Init Events
            |-------------
            */
            const blurElemName = `#blur-control-${this.state.selectTagId}`;
            blurElem(blurElemName, (isInside) => {
                if( isInside === false && _isSelectTagMounted === true) {
                    this.setState({isOpen: false});
                }
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
        if(_isSelectTagMounted){
            const {data, placeholder, block, size} = this.props;
            const _size = size || this.state.size;
            const elem = document.querySelector('.select-wrap .nw-option');
            elem.style.maxHeight = (+_size * 30) + 'px';
            
            if(data) this.setState({data: data});
            if(placeholder) this.setState({currLabel: placeholder,});
            if(block) this.setState({isBlock: true})
        }
    }

    componentWillUnmount(){
        _isSelectTagMounted = false;
        this.removeWindowEvents();
        clearElemListeners();
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
        _last_known_scroll_position = window.scrollY;
        var offsetY = _elemOffset.top - _last_known_scroll_position;

        const currY      = window.innerHeight- offsetY;
        const heightOver = window.innerHeight + _overPixels;
        // TODO: refine this;        
        if(currY <  heightOver) _selectIsDown = false;
        else _selectIsDown = true;
    }

    onWindowResize(evt){
        if( ! _isSelectTagMounted) return 0;
        // console.log('resize', evt);
    }
    
    handleSelectOpener(e){
        if(_isSelectTagMounted){
            this.setState({ isOpen: !this.state.isOpen, });
        }
    }

    renderHybridTagOption(data){
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

    renderSelectTagOption(data){
        return data.map((opt, idx) => {
            return (<option key={idx} value={opt.value}>{opt.label}</option>)
        })
    }
    
    render(){
        const {isOpen, currLabel, data, currValue, selectTagId, isBlock} = this.state;
        return (
            <div id={`blur-control-${selectTagId}`} className={`select-wrap -switched ${((isBlock) ? '-block' : '' )}`}
                onClick={this.handleSelectOpener} >
                {/* INPUT_TAG */}
                <input className="select-input -prevent-pointer disable-user-select" 
                placeholder={currLabel} 
                alt={currLabel}
                />
                {/* SELECT_TAG */}
                <select id={`nw-select-tag-${selectTagId}`} 
                className="select-tag disable-user-select" 
                value={currValue}
                onChange={()=>{ this.setState({currValue}); }} >
                    {this.renderSelectTagOption(data)}
                </select>
                {/* HYBRID_TAG  -down || -up */}
                <ul className={`nw-option disable-user-select 
                   ${( (_selectIsDown) ? '-down': '-up' )}
                   ${( (isOpen) ? '' : '-hidden-opts' )}
                `}>
                    {this.renderHybridTagOption(data)}
                </ul>

                {/* {(_selectIsDown)?'TRUE':'FALSE'} */}

                {/* 8/28/2019
                -------------
                TODO: Option
                TODO: OptionGroup
                TODO: Normal select
                TODO: Like Tag
                TODO: Icon in Text
                TODO: Theming */}

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
  block: PropTypes.bool,
}

export default Select;
