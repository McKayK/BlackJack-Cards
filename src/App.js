import { useEffect, useState } from "react";
import "./App.css";
import Dealer from "./components/Dealer";
import Player from "./components/Player";
import Deck from "./deck-of-cards/deck";

function App() {
  const [dealerCards, setDealerCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [playableDeck, setPlayableDeck] = useState(new Deck());
  const [playerSum, setPlayerSum] = useState(0);
  const [canHit, setCanHit] = useState(true);

  let dealerSum = 0;
  let playerSum2 = 0;

  let dealerAceCount = 0;
  let playerAceCount = 0;

  let hidden;
  let deck;

  const dealerArr = [];
  const playerArr = [];

  const getValue = (card) => {
    // console.log(card);
    let newCard = `${card.value}-${card.suit}`;
    let data = newCard.split("-");
    let value = data[0];

    if (isNaN(value)) {
      if (value === "A") {
        return 11;
      }
      return 10;
    }
    return +value;
  };

  const checkAce = (card) => {
    // console.log("this", card);
    if (card.suit === "A") {
      return 1;
    }
    return 0;
  };

  const reduceAce = (playerSum, playerAceCount) => {
    while (playerSum > 21 && playerAceCount > 0) {
      setPlayerSum((preValue) => (preValue -= 10));
      // playerSum -= 10;
      playerAceCount -= 1;
    }
    return playerSum;
  };

  // const playableDeck = new Deck();
  playableDeck.shuffle();
  // console.log(playableDeck);

  // let ready = false;
  // let tempSum = 0;

  useEffect(() => {
    const startGame = () => {
      hidden = playableDeck.playCard();
      dealerSum += getValue(hidden);
      dealerAceCount += checkAce(hidden);

      // console.log(`hidden: ${hidden.value}`, typeof hidden.value);
      // console.log(`dealer sum: ${dealerSum}`, typeof dealerSum);

      // console.log(playableDeck.playCard());

      dealerArr.push(hidden);

      while (dealerSum < 17) {
        const temp = playableDeck.playCard();
        // setDealerCards([...dealerCards, temp]);
        dealerArr.push(temp);
        dealerSum += getValue(temp);
        dealerAceCount += checkAce(temp);
        // console.log(temp);
      }

      setDealerCards([...dealerArr]);

      for (let i = 0; i < 2; i++) {
        const temp = playableDeck.playCard();

        // console.log(temp);
        playerArr.push(temp);
        // setPlayerSum(playerSum + getValue(temp));
        playerSum2 += getValue(temp);
        // tempSum = playerArr.reduce((acc, curr) => {
        //   return acc + +curr.value;
        // }, 0);
        setPlayerSum(
          playerArr.reduce((acc, curr) => {
            return (acc += +curr.value);
          }, 0)
        );
        // playerSum += getValue(temp);
        console.log(playerSum);
        playerAceCount += checkAce(temp);
        // setPlayerSum(playerSum2);
      }

      // console.log(tempSum);
      // setPlayerSum(tempSum);

      setPlayerCards([...playerArr]);
    };
    startGame();
    console.log("Dealer: ", dealerSum);
    console.log("Player: ", playerSum2);
  }, []);
  console.log(playerSum);

  const hit = () => {
    if (!canHit) {
      return;
    } else {
      const hitCards = [];
      const playerHand = playableDeck.playCard();
      hitCards.push(playerHand);
      setPlayerCards([...playerCards, ...hitCards]);
      setPlayerSum((preValue) => (preValue += getValue(playerHand)));
      if (playerSum + getValue(playerHand) > 21) {
        setCanHit(false);
      }
      // playerSum += getValue(playerHand);
      // console.log(playableDeck.cards);
    }
    // if (reduceAce(playerSum, playerAceCount) > 21) {
    //   setCanHit(false);
    // }

    // console.log(playerSum);
  };

  return (
    <div className="App">
      <h2>Dealer: </h2>
      <div className="dealerCards">
        {dealerCards.map((elem, index) => {
          // console.log("elem", elem);
          return index !== 0 ? (
            <Dealer key={index} card={elem} />
          ) : (
            <Dealer key={index} hidden={true} card={elem} />
          );
        })}
      </div>
      <h2>Player 1:</h2>
      <div className="playerCards">
        {playerCards.map((elem, index) => {
          // console.log("elem", elem);
          return <Player key={index} card={elem} />;
        })}
      </div>
      <div className="buttons">
        <button id="hit" onClick={hit}>
          Hit
        </button>
        <button id="stay">Stay</button>
        <p id="results"></p>
      </div>
    </div>
  );
}

export default App;
