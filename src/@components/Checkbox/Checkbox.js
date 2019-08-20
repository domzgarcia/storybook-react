import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import './checkbox.scss';

class Checkbox extends Component {
    state = {
        isChecked: false,
        isDisabled: false,
        inputValue: false,
        newColor: '',
        colorType: 'primary',
        customProps: {},
    };
    
    componentDidMount(){
        this.resolveType();
        this.setDefault();
        this.cleanAttributes();
    }
    
    cleanAttributes = () => {
        const properties = Object.assign({}, this.props);
        delete properties.children;
        delete properties.checked;
        delete properties.disabled;
        this.setState({customProps: properties});
    }

    setDefault = () => {
        const {checked, disabled} = this.props;
        if(checked) this.setState({isChecked: checked});
        if(disabled) this.setState({isDisabled: disabled});
    }

    resolveType = () => {
        const {type} = this.props;
        if(type) this.setState({colorType: type});
    }

    handleChecked = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
    }

    render(){
        const {isChecked, colorType, customProps, isDisabled} = this.state;
        const {children} = this.props;
        return (
            <Fragment>
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
                <span>{children}</span>
            </label>
            </Fragment>
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
};

export default Checkbox;