import React from "react";
import { IText } from "../../types/text";
import "./TextFields.scss";

const TextFields = ({
  label,
  value,
  rows,
  cols,
  errorstate,
  helperText,
  disabled,
  required,
  prefix,
  suffix,
}: IText) => {
  return (
    <label className="textfield">
      <span className="textfield__label">
        {label}
        {required && <span className="textfield__label__required">*</span>}
      </span>
      <div>
        {prefix && <span className="textfield__verify">{prefix}</span>}
        <textarea
          placeholder={value}
          value={value}
          className="textfield__input"
          disabled={disabled}
          required={required}
          rows={rows}
          cols={cols}
        />
        {suffix && <span className="textfield__verify">{suffix}</span>}
      </div>
      {errorstate && <span className="textfield__error">{helperText}</span>}
    </label>
  );
};

export default TextFields;
