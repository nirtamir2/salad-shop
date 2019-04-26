import React from "react";
import cx from "classnames";
import { Link } from "react-router-dom";
import "./Button.css";

interface IProps {
  children: React.ReactNode;
  disabled?: boolean;
  to?: string;
}

function Button(props: IProps) {
  const { children, to, disabled = false } = props;
  if (to != null) {
    return (
      <Link
        to={to}
        className={cx("Button Button--link", { "Button--disabled": disabled })}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      disabled={disabled}
      className={cx("Button", { "Button--disabled": disabled })}
    >
      {children}
    </button>
  );
}

export default Button;
