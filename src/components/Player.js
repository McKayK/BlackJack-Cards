import React from "react";
import "./Player.css";

const Player = ({ card }) => {
  // console.log("Player: ", card);
  return (
    <div>
      <img src={`cards/${card.value}-${card.suit}.png`} />
    </div>
  );
};

export default Player;
