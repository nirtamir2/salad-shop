import React from "react";
import "./TextField.css";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  label: React.ReactNode;
  placeholder?: string;
  textArea?: boolean;
  type?: "text" | "email";
  required?: boolean;
}

function TextField(props: IProps) {
  const {
    value,
    onChange,
    label,
    placeholder = "",
    type = "text",
    textArea = false,
    required = false
  } = props;
  const idRef = React.useRef(Math.random().toString());
  const id = idRef.current;
  return (
    <>
      <label htmlFor={id} className="TextField__label">
        {label}
      </label>
      {textArea ? (
        <textarea
          id={id}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          className="TextField__input TextField__input--textarea"
        />
      ) : (
        <input
          id={id}
          value={value}
          required={required}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
          type={type}
          className="TextField__input"
        />
      )}
    </>
  );
}

export default TextField;
