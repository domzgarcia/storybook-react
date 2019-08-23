import React, {Component, Fragment} from 'react';
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

        this.cleanAttributes = this.cleanAttributes.bind(this);
        this.setDefault = this.setDefault.bind(this);
        this.resolveType = this.resolveType.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
    }
    
    
    componentDidMount(){
        this.resolveType();
        this.setDefault();
        this.cleanAttributes();
    }
    
    cleanAttributes() {
        const properties = Object.assign({}, this.props);
        delete properties.children;
        delete properties.checked;
        delete properties.disabled;
        this.setState({customProps: properties});
    }

    setDefault() {
        const {checked, disabled} = this.props;
        if(checked) this.setState({isChecked: checked});
        if(disabled) this.setState({isDisabled: disabled});
    }

    resolveType() {
        const {type} = this.props;
        if(type) this.setState({colorType: type});
    }

    handleChecked() {
        this.setState({
            isChecked: !this.state.isChecked,
        });
    }
    
    render(){
        const {isChecked, colorType, customProps, isDisabled} = this.state;
        const {children} = this.props;
        const empty = '';
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
                {(children)
                ? <span>{children}</span>
                : empty}
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