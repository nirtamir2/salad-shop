import React from "react";
import "./Modal.css";

interface IProps {
  isVisible: boolean;
  children: React.ReactNode;
}

function Modal(props: IProps) {
  const { isVisible, children } = props;
  return !isVisible ? null : <div className="Modal">{children}</div>;
}

export default Modal;
