import { useEffect, useState } from "react";
import "./App.css";
import Dealer from "./components/Dealer";
import Player from "./components/Player";
import Deck from "./deck-of-cards/deck";

function App() {
  const [dealerCards, setDealerCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [playableDeck, setPlayableDeck] = useState(new Deck());
  const [dealerSum, setDealerSum] = useState(0);
  const [playerSum, setPlayerSum] = useState(0);
  const [canHit, setCanHit] = useState(true);
  const [dealerAceCount, setDealerAceCount] = useState(0);
  const [playerAceCount, setPlayerAceCount] = useState(0);

  let playerSum2 = 0;

  let playerAceCount2 = 0;

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
    if (card.value === "A") {
      return 1;
    }
    return 0;
  };

  const reduceAce = (playerSum, playerAceCount) => {
    let playerSum2 = playerSum;
    console.log("first playersum2: ", playerSum2);
    let playerAceCount2 = playerAceCount;
    if (playerSum2 > 21 && playerAceCount2 > 0) {
      playerSum2 -= 10;
      playerAceCount2 -= 1;
    }
    console.log("second playersum2: ", playerSum2);
    setPlayerSum(playerSum2);
    setPlayerAceCount(playerAceCount2);

    return playerSum;
  };

  // const playableDeck = new Deck();
  playableDeck.shuffle();
  // console.log(playableDeck);

  // let ready = false;
  // let tempSum = 0;

  const startGame = () => {
    hidden = playableDeck.playCard();
    console.log("hidden value: ", hidden);
    setDealerSum((preValue) => (preValue += getValue(hidden)));
    setDealerAceCount((preValue) => (preValue += checkAce(hidden)));
    console.log("dealer ace: ", dealerAceCount);

    // console.log(`hidden: ${hidden.value}`, typeof hidden.value);
    // console.log(`dealer sum: ${dealerSum}`, typeof dealerSum);

    // console.log(playableDeck.playCard());

    dealerArr.push(hidden);

    let dealerSum2 = dealerSum;

    while (dealerSum2 < 17) {
      const temp = playableDeck.playCard();
      dealerSum2 += getValue(temp);
      // setDealerCards([...dealerCards, temp]);
      dealerArr.push(temp);
      setDealerAceCount((preValue) => (preValue += checkAce(temp)));
      // console.log(temp);
    }
    setDealerSum((preValue) => (preValue += dealerSum2));

    setDealerCards([...dealerArr]);

    for (let i = 0; i < 2; i++) {
      const temp = playableDeck.playCard();
      playerAceCount2 += getValue(temp);
      setPlayerAceCount((preValue) => (preValue += checkAce(temp)));

      // console.log(temp);
      playerArr.push(temp);
      // setPlayerSum(playerSum + getValue(temp));
      // playerSum2 += getValue(temp);
      // tempSum = playerArr.reduce((acc, curr) => {
      //   return acc + +curr.value;
      // }, 0);
      setPlayerSum(
        playerArr.reduce((acc, curr) => {
          // console.log("acc", acc, "curr", curr);
          return (acc += getValue(curr));
        }, 0)
      );
      // playerSum += getValue(temp);
      console.log(playerSum);
      // setPlayerSum(playerSum2);
    }

    // console.log(tempSum);
    // setPlayerSum(tempSum);

    setPlayerCards([...playerArr]);
  };

  useEffect(() => {
    startGame();
  }, []);

  console.log("player ace: ", playerAceCount);
  console.log("Dealer: ", dealerSum);
  console.log("Player: ", playerSum);

  if (playerSum === 21) {
    // alert("Black Jack!");
  }
  console.log(playerSum);

  const hit = () => {
    if (!canHit) {
      return;
    } else {
      const hitCards = [];
      const playerHand = playableDeck.playCard();
      setPlayerAceCount((preValue) => (preValue += checkAce(playerHand)));
      hitCards.push(playerHand);
      setPlayerCards([...playerCards, ...hitCards]);
      setPlayerSum((preValue) => (preValue += getValue(playerHand)));

      if (reduceAce(playerSum, playerAceCount) > 21) {
        setCanHit(false);
      }
      if (playerSum + getValue(playerHand) > 21) {
        setCanHit(false);
      }
      // playerSum += getValue(playerHand);
      // console.log(playableDeck.cards);
    }

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
