import React from "react";
import "./Card.css";

interface IProps {
  children: React.ReactNode;
}

function Card(props: IProps) {
  const { children } = props;
  return <div className="Card">{children}</div>;
}

export default Card;
