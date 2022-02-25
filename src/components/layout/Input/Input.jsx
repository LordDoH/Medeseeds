import React from 'react';
import { BsCheckCircleFill, BsFillXCircleFill } from 'react-icons/bs';
import './Input.scss';

function Input({
  state = { field: '', check: 'true' },
  changeState = () => {},
  inputType = 'text',
  label = '',
  inputName = '',
  functionx = () => {},
  textPlaceholder = '',
  errorText = '',
  inputParameters,
}) {
  const onChange = (e) => {
    changeState({ ...state, field: e.target.value });
  };

  const checking = () => {
    if (inputParameters) {
      if (inputParameters.test(state.field)) {
        changeState({ ...state, check: 'true' });
      } else {
        changeState({ ...state, check: 'false' });
      }
    }
    if (functionx) {
      functionx();
    }
  };

  return (
    <div className="input">
      <label className="input__label" htmlFor={inputName} check={state.check}>
        {label}
      </label>
      <div className="input__group">
        {/* eslint-disable-next-line */}
        <input className={`input__group__box ${state.check === 'true'
              ? null
              : state.check === 'false'
              ? 'error'
              : null
          }`}
          data-test="titlein"
          type={inputType}
          placeholder={textPlaceholder}
          id={inputName}
          value={state.field}
          onChange={onChange}
          onKeyUp={checking}
          onBlur={checking}
          check={state.check}
        />
        {/* eslint-disable-next-line */}
        <div className={`input__group__check ${state.check === 'true'
              ? 'ok'
              : state.check === 'false'
              ? 'error'
              : null
          }`}
          check={state.check}
        >
          {state.check === 'true' ? (
            <BsCheckCircleFill />
          ) : (
            <BsFillXCircleFill />
          )}
        </div>
      </div>
      {/* eslint-disable-next-line */}
      <p className={`input__error ${state.check === 'true' ? null : state.check === 'false'
            ? 'error'
            : null
        }`}
      >
        {errorText}
      </p>
    </div>
  );
}

export default Input;
