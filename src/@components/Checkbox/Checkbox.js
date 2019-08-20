import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import './checkbox.scss';

class Checkbox extends Component {
    state = {
        isChecked: false,
        inputValue: false,
        newColor: '',
        colorType: 'primary',
    };
    
    componentDidMount(){
        this.resolveType();
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
        const {isChecked, colorType} = this.state;
        const {children} = this.props;
        return (
            <Fragment>
            <label className="nw-checkbox-wrapper" >
                <span className={`${colorType} nw-checkbox ${((isChecked) ? '-checked' : '')} `}>
                    <input type="checkbox" className="nw-checkbox-input" onClick={this.handleChecked}  />
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
    type: PropTypes.string, // primary, secondary, success, danger, warning, info, light, dark, link
    disable: PropTypes.bool,
};

export default Checkbox;