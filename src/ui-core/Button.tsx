import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import "./Button.css";

interface IProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  to?: string;
}

function Button(props: IProps) {
  const { children, to, disabled = false, type = "button", onClick } = props;
  if (to != null) {
    return (
      <Link
        to={to}
        onClick={onClick}
        className={cx("Button Button--link", { "Button--disabled": disabled })}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={cx("Button", { "Button--disabled": disabled })}
    >
      {children}
    </button>
  );
}

export default Button;
