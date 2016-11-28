import React from 'react';
import classnames from 'classnames';

const TextFieldGroup = ({ label, name, type, value, onChange, onExit, error }) => {
  return (
    <div className={classnames('form-group', { 'has-error': error })}>
      <label className='control-label'>{label}</label>
      <input
        type={type}
        name={name}
        className='form-control'
        value={value}
        onChange={onChange}
        onBlur={onExit}
      />
      {error &&
        <span className='help-block'>{error}</span>
      }
    </div>
  );
};

TextFieldGroup.propTypes = {
  name: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired,
  error: React.PropTypes.string,
  onChange: React.PropTypes.func.isRequired,
  onExit: React.PropTypes.func
};

TextFieldGroup.defaultProps = {
  type: 'text'
};

export default TextFieldGroup;
