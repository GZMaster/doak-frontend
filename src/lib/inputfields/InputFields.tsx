import React from "react";
import { IInput } from "../../types/input";
import "./InputFields.scss";

function InputFields({
  type,
  label,
  placeholder,
  value,
  onChange,
  errorstate,
  helperText,
  disabled,
  required,
  prefix,
  suffix,
}: IInput) {
  return (
    <label className="inputfield">
      {label && <span className="inputfield__label">{label}</span>}
      <span className="inputfield__label">{label}</span>
      <div>
        {prefix && <span className="inputfield__verify">{prefix}</span>}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="inputfield__input"
          disabled={disabled}
          required={required}
        />
        {suffix && <span className="inputfield__verify">{suffix}</span>}
      </div>
      {errorstate && <span className="inputfield__error">{helperText}</span>}
    </label>
  );
}

export default InputFields;
