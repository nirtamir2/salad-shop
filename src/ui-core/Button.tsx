import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

interface IProps {
  children: React.ReactNode;
  to?: string;
}

function Button(props: IProps) {
  const { children, to } = props;
  if (to != null) {
    return (
      <Link to={to} className="Button Button--link">
        {children}
      </Link>
    );
  }
  return <button className="Button">{children}</button>;
}

export default Button;
