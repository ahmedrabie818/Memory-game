import React from "react";
import "./Card.css";

export default function Card({ card, handelChoice, flipped, disabled }) {
  const handelClick = () => {
    if (!disabled) {
      handelChoice(card);
    }
  };
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/img/cover.png"
          onClick={handelClick}
          alt="card back"
        />
      </div>
    </div>
  );
}
