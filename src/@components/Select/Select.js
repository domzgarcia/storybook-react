import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getOffset, generateId, addBlurElem, removeBlurElem} from './helpers';
import './select.scss';

// global variable not included on states.
let _isSelectTagMounted = false;
let _elemOffset = null;
let _selectIsDown = true;
const _DEFAULT_LABEL = 'Please select';

class Select extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            currLabel: _DEFAULT_LABEL,
            currValue: '',
            size: 6, // default size
            hasSelection: false,
            data: [],
            tagId: 0,
            placeholder: '',
            isBlock: false,
            isDown: true,
            isNullable: false,
        };
        this.handleSelectOpener = this.handleSelectOpener.bind(this);
        this.setSelectTagValue = this.setSelectTagValue.bind(this);
    }

    setElemOffsetById (id) {
        const elem  = document.querySelector(`#blur-control-${id}`);
        if(elem) {
            _elemOffset = getOffset(elem);
        }
    }
    
    setSelectTagValue(){
        if(this.props && this.props.onChange) {
            const value = {value: this.state.currValue, label: this.state.currLabel }   
            this.props.onChange(value);
        }
    }
    
    componentDidMount(){
        _isSelectTagMounted = true;
        _selectIsDown = true;

        this.setState({
            tagId: generateId(),
        },
        () => {
            // const elem  = document.querySelector(`#nw-select-tag-${this.state.tagId}`);
            this.setElemOffsetById(this.state.tagId);
            /*
            |-------------
            | Init Events
            |-------------
            */
            addBlurElem(`#blur-control-${this.state.tagId}`, 
                isInside => {
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
            /* 
            |---------------------
            | Auto-trigger funct
            |---------------------
            */
            this.calcHitBounds();
        });
    }
    
    propsModifications(){
        if(_isSelectTagMounted){
            const {data, placeholder, block, size, nullable} = this.props;

            const _size = size || this.state.size;
            const elem = document.querySelector('.select-wrap .nw-option');
            elem.style.maxHeight = (+_size * 30) + 'px';
            
            if( data && data.length) this.setState({data: data});
            if( placeholder && placeholder.length) this.setState({currLabel: placeholder, placeholder: placeholder});
            if(block) this.setState({isBlock: true});
            if(nullable) this.setState({isNullable:true, currValue:""}, () => this.setSelectTagValue() );
        }
    }

    componentWillUnmount () {
        _isSelectTagMounted = false;
        this.removeWindowEvents();
        removeBlurElem();
    }

    removeWindowEvents () {
        window.removeEventListener('resize', this.onWindowResize.bind(this));
        window.removeEventListener('scroll', this.onWindowScroll.bind(this));
    }

    addWindowEvents () {
        window.addEventListener('resize', this.onWindowResize.bind(this));
        window.addEventListener('scroll', this.onWindowScroll.bind(this));
    }

    onWindowScroll () {
        this.calcHitBounds();
    }

    calcHitBounds () {
        if( ! _isSelectTagMounted) return 0;
        // Reset
        // TODO: There's a glitch by which the scroll snap a bit.
        this.setElemOffsetById(this.state.tagId);
        const offsetY      = _elemOffset.top - window.scrollY;
        const windowHeight = window.innerHeight;
        const offsetPixel  = 200;

        if(offsetY > (windowHeight - offsetPixel)) _selectIsDown = false;
        else _selectIsDown = true;
    }

    onWindowResize (evt) {
        if( ! _isSelectTagMounted  && ! this.state.tagId ) return 0;
        // Reset
        this.setElemOffsetById(this.state.tagId);
    }
    
    handleSelectOpener (e) {
        if(_isSelectTagMounted){
            this.setState({ isOpen: !this.state.isOpen, });
        }
    }
    
    resolveNullableData(data){
        if(this.state.isNullable){
            const adoptPlaceholder = (this.state.isNullable && this.state.placeholder.length) 
                ? this.state.placeholder 
                : _DEFAULT_LABEL;
            data = [{value: null, label: adoptPlaceholder }, ...data];
        }
        return data;
    }

    renderHybridTagOption (data) {
        data = this.resolveNullableData(data);
        return data.map((opt, idx) => {
            return (
                <li key={idx}
                data-value={opt.value}
                className={((this.state.currValue===opt.value) ? '-active' : '' )} 
                onClick={(e)=> {
                    const value = e.target.dataset.value;
                    const label = e.target.innerText;
                    this.setState({
                        currLabel: label,
                        currValue: value,
                    },
                    () => {
                        this.setSelectTagValue();
                    });
                }} >{opt.label}</li>
            )
        });
    }
    
    renderSelectTagOption (data) {
        data = this.resolveNullableData(data);
        return data.map((opt, idx) => {
            return (<option key={idx} value={opt.value}>{opt.label}</option>)
        })
    }
    
    render () {
        const {isOpen, currLabel, data, currValue, tagId, isBlock} = this.state;
        return (
            <div id={`blur-control-${tagId}`} className={`select-wrap -switched ${((isBlock) ? '-block' : '' )}`}
                onClick={this.handleSelectOpener} >
                {/* INPUT_TAG */}
                <input className="select-input -prevent-pointer disable-user-select" 
                placeholder={currLabel} 
                alt={currLabel}
                />
                {/* SELECT_TAG */}
                <select id={`nw-select-tag-${tagId}`} 
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
  nullable: PropTypes.bool,
  data: PropTypes.array,
  onChange: PropTypes.func,
}

export default Select;
