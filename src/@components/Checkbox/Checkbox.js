import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './checkbox.scss';

class Checkbox extends Component {

    constructor(props){
        super(props);

        this.state = {
            isChecked: false,
            isDisabled: false,
            inputValue: false,
            newColor: '',
            colorType: 'primary',
            customProps: {},
        };
        this.handleChecked = this.handleChecked.bind(this);
    }

    setCheckboxTagValue () {
        if(this.props && this.props.onChange) {
            const value = this.state.isChecked;   
            this.props.onChange(value);
        }
    }
    
    componentDidMount () {
        this.resolveType();
        this.setDefault();
        this.cleanAttributes();
    }
    
    cleanAttributes () {
        const properties = Object.assign({}, this.props);
        delete properties.children;
        delete properties.checked;
        delete properties.disabled;
        delete properties.onChange;
        this.setState({customProps: properties});
    }

    setDefault () {
        const {checked, disabled} = this.props;
        if(checked) this.setState({isChecked: checked});
        if(disabled) this.setState({isDisabled: disabled});
    }

    resolveType () {
        const {type} = this.props;
        if(type) this.setState({colorType: type});
    }

    handleChecked () {
        this.setState({
            isChecked: !this.state.isChecked,
        },
        () => {
            this.setCheckboxTagValue(this.state.isChecked);
        });
    }

    render () {
        const {isChecked, colorType, customProps, isDisabled} = this.state;
        const {children} = this.props;
        const empty = '';
        return (
            <div>
            <label className={`nw-checkbox-wrapper ${((isDisabled) ? '-disabled' : '')} `} >
                <span className={`${colorType} nw-checkbox ${((isChecked) ? '-checked' : '')} `}>
                    <input {...customProps}
                        type="checkbox" 
                        className="nw-checkbox-input" 
                        onClick={this.handleChecked}  
                        defaultChecked={isChecked}
                        disabled={isDisabled}
                    />
                    <span className={`${colorType} nw-checkbox-inner ${((isChecked) ? '-checked' : '')} `}></span>
                </span>
                {(children)
                ? <span>{children}</span>
                : empty}
            </label>
            </div>
        )
    }
}

/*|--------------
  | Proptypes
  |-------------- */
  Checkbox.propTypes = {
    type: PropTypes.string,
    checked: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
};

export default Checkbox;