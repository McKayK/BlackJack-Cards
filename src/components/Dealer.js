import React from "react";
import "./Dealer.css";

const Dealer = ({ card, hidden }) => {
  // console.log(card, hidden);
  return (
    <div>
      <img
        src={`cards/${hidden ? "BACK.png" : `${card.value}-${card.suit}.png`}`}
      />
      <div id="dealer-cards"></div>
    </div>
  );
};

export default Dealer;
