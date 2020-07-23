import React from 'react';
import PropTypes from 'prop-types';

class FormInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({ value });
    this.props.onChange(value);
  }

  onFocus(event) {
    this.setState({ isFocused: true });
    this.props.onFocus(event);
  }

  onBlur(event) {
    this.setState({ isFocused: false });
    this.props.onBlur(event);
  }

  onKeyDown(event) {
    if (event.key === 'Enter') {
      this.props.onKeyEnter();
    }
  }

  render() {
    const { state, props } = this;
    const {
      label, value, className, type,
    } = this.props;

    // const isEmptyClass = state.isEmpty ? ' Error' : '';
    const isFocusedClass = state.isFocused ? ' focused' : '';
    // const mandatoryClass = props.mandatory ? ' mandatory' : '';
    // let isFilledClass = state.isFilled ? ' not-empty' : '';
    if (typeof value === 'string') {
      // isFilledClass = !isEmpty(props.value) ? ' not-empty' : '';
    }

    let extraClasses = '';
    extraClasses += isFocusedClass;
    extraClasses += ` ${className}`;
    return (
      <div className={`form-input${extraClasses}`}>
        <div className="form-input-container">
          <span className="form-input-label">{label}</span>
          {type === 'textarea'
            ? (
              <textarea
                type={type}
                className="form-input-field"
                value={props.value ? value : state.value}
                placeholder={props.placeholder}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
            )
            : (
              <input
                type={type}
                className="form-input-field"
                placeholder={props.placeholder}
                value={props.value ? value : state.value}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
              />
            )}
        </div>
        <div className="form-input-message">{props.errorMessage}</div>
        <div className="form-input-focus-ruler" />
      </div>
    );
  }
}

FormInput.propTypes = {
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  onKeyEnter: PropTypes.func,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};

FormInput.defaultProps = {
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onKeyEnter: () => {},
  value: '',
  className: '',
  placeholder: '',
  type: 'text',
};

export default FormInput;
