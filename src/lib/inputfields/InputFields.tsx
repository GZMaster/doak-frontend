import React from "react";
import { IInput } from "../../types/input";
import "./InputFields.scss";

function InputFields({
  type,
  label,
  placeholder,
  value,
  name,
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
      <span className="inputfield__label">
        {label}
        {required && <span className="inputfield__label__required">*</span>}
      </span>
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
          name={name}
        />
        {suffix && <span className="inputfield__verify">{suffix}</span>}
      </div>
      {errorstate && <span className="inputfield__error">{helperText}</span>}
    </label>
  );
}

export default InputFields;
