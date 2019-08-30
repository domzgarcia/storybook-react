import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getOffset, generateId} from './helpers';
import  './colors.scss';
import './select.scss';

// global variable not included on states.
let _isSelectTagMounted = false;
let _elemOffset = null;
let _selectIsDown = true;
let _gtimeout = null;
const _DEFAULT_LABEL = 'Please select';
const _SELECT_PROPS = [
    'disabled', 'type',
    'size','placeholder','block',
    'nullable','data','onChange',
];

class Select extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            isOpen: false, currLabel: _DEFAULT_LABEL, currValue: '',
            size: 6, /* default size */ hasSelection: false,
            data: [], tagId: 0, placeholder: '', isBlock: false,
            isDown: true, isNullable: false, type: 'primary',
            customProps: {},
        };
        // should use ref
        this.inputSelf = React.createRef();

        this.handleSelectOpener = this.handleSelectOpener.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.onWindowScroll = this.onWindowScroll.bind(this);
        this.mainClasses = this.mainClasses.bind(this);
    }

    setElemOffsetById (id) {
        const elem  = document.querySelector(`#select-control-${id}`);
        if(elem) {
            _elemOffset = getOffset(elem);
        }
    }
    
    setSelectTagValue(){
        if(this.props && this.props.onChange) {
            const value = {
                value: this.state.currValue, 
                label: this.state.currLabel }   
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
            this.setElemOffsetById(this.state.tagId);
            /*|-------------
              | Init Events
              |-------------*/
            this.addWindowEvents();
            /*|---------------------
              | Props Modifications
              |---------------------*/
            this.propsModifications();
            /*|---------------------
              | Auto-trigger funct
              |---------------------*/
            this.calcHitBounds();
            /*|---------------------
              | Clean Mock Attributes
              |---------------------*/
           this.cleanAttributes();
        });
    }
    
    cleanAttributes () {
        const properties = Object.assign({}, this.props);
        _SELECT_PROPS.forEach((name) => {
            delete properties[name];
        });
        this.setState({customProps: properties});
    }

    propsModifications () {
        if(_isSelectTagMounted){
            const {data, placeholder, block, size, nullable, type} = this.props;
            const _size = size || this.state.size;
            const elem = document.querySelector('.select-wrap .nw-option');
            elem.style.maxHeight = (+_size * 30) + 'px';
            
            if( data && data.length ) this.setState({data: data});
            if( placeholder && placeholder.length ) this.setState({currLabel: placeholder, placeholder: placeholder});
            if( block ) this.setState({isBlock: true});
            if( nullable ) this.setState({isNullable:true, currValue:""}, () => this.setSelectTagValue()/** autoset */);
            if( type && type.length ) this.setState({type});
        }
    }

    componentWillUnmount () {
        _isSelectTagMounted = false;
        clearTimeout(_gtimeout);
        this.removeWindowEvents();
    }

    removeWindowEvents () {
        window.removeEventListener('resize', this.onWindowResize);
        window.removeEventListener('scroll', this.onWindowScroll);
    }

    addWindowEvents () {
        window.addEventListener('resize', this.onWindowResize);
        window.addEventListener('scroll', this.onWindowScroll);
    }

    onWindowScroll () {
        this.calcHitBounds();
    }

    calcHitBounds () {
        if( ! _isSelectTagMounted) return 0;
        // TODO: There's a glitch by which the scroll snap a bit.
        this.setElemOffsetById(this.state.tagId);
        const offsetY      = _elemOffset.top - window.scrollY;
        const windowHeight = window.innerHeight;
        const offsetPixel  = 200;

        if(offsetY > (windowHeight - offsetPixel)) _selectIsDown = false;
        else _selectIsDown = true;
    }

    onWindowResize () {
        if( ! _isSelectTagMounted  && ! this.state.tagId ) return 0;
        this.setElemOffsetById(this.state.tagId);
    }
    
    handleSelectOpener (evt) {
        if(_isSelectTagMounted){
            evt.stopPropagation();
            this.setState({
                isOpen: !this.state.isOpen,
            },
            () => this.inputSelf.current.focus());
        }
    }
    
    resolveNullableData (data) {
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
                onClick={(evt)=> {
                    evt.stopPropagation();
                    const currValue = evt.target.dataset.value;
                    const currLabel = evt.target.innerText;
                    this.setState({
                        currLabel, 
                        currValue,
                        isOpen: false,
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

    resolvePrimitiveTheme (type) {
        return ;
    }

    mainClasses ({className,}) {
        let ownClasses = ['select-wrap -switched',
            ('-').concat(this.state.type),
            ((this.state.isBlock) ? '-block' : ''),
            ((this.state.isOpen) ? '-with-border-focus' : '')
        ];
        const nativeClasses = (className) ? className : '';
        ownClasses = ownClasses.join(" ");
        return `${ownClasses} ${nativeClasses}`;
    }
    
    render () {
        const {isOpen, currLabel, data, currValue, tagId, customProps} = this.state;
        return (
            <div id={`select-control-${tagId}`}
                className={this.mainClasses(customProps)}
                onBlur={()=>{ 
                    /* just found, this can handle onblur from inner input elem */
                    if(this.state.isOpen){
                        _gtimeout = setTimeout(()=>{
                            clearTimeout(_gtimeout);
                            this.setState({isOpen:false});
                        }, 250);
                    }
                }}
                onClick={(evt)=>{
                    this.handleSelectOpener(evt);
                }} >
                
                {/* SPAN_TAG */}
                <span className={`${((isOpen) ? '-with-focus' : '')} 
                    -prevent-pointer -disable-user-select`} >
                    
                    {/* INPUT_TAG */}
                    <input
                        {...customProps}
                        ref={this.inputSelf}
                        className="select-input disable-user-select -not-used -prevent-pointer -disable-user-select"
                        value={currLabel}
                        onBlur={ ()=> {/* refer: #select-control- */}}
                        onChange={ ()=>{ this.setState({currValue}); }}
                    />
                    
                    {/* DIV_TAG_AS_LABEL */}
                    <div
                        className={`div-label 
                        -prevent-pointer -disable-user-select`}>
                        {currLabel}
                    </div>
                </span>
                
                {/* SELECT_TAG */}
                <select id={`nw-select-tag-${tagId}`} 
                    className={`select-tag disable-user-select
                    -prevent-pointer -disable-user-select`}
                    value={currValue}
                    onChange={()=>{ this.setState({currValue}); }} >
                    {this.renderSelectTagOption(data)}
                </select>
                
                <ul className={`nw-option disable-user-select ${((_selectIsDown) ? '-down': '-up')} ${((isOpen) ? '' : '-hidden-opts')}`}>
                    {this.renderHybridTagOption(data)}
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
                aria-hidden="true">
                    <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
                </svg>
                
                {/* 8/28/2019
                -------------
                    TODO: Option
                    TODO: OptionGroup
                    TODO: Normal select
                    TODO: Like Tag
                    TODO: Icon in Text
                    TODO: Theming 
                    TODO: ClassName, Style
                    TODO: Bug in multiple instance do not close on BLUR
                */}
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
  type: PropTypes.string,
  data: PropTypes.array,
  onChange: PropTypes.func,
}

export default Select;
