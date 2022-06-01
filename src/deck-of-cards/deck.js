const SUITS = ["C", "D", "H", "S"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export default class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards;
  }
  dealCards(num) {
    const newHand = [];
    for (let i = 0; i < num; i++) {
      newHand.push(this.cards.shift());
    }
    return newHand;
  }
  shuffle() {
    this.cards.sort((a, b) => 0.5 - Math.random());
  }
  playCard() {
    return this.cards.shift();
  }
  addToHandy(arr) {
    this.cards.push(...arr);
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }
}

const freshDeck = () => {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
};
