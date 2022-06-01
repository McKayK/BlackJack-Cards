import Deck from './deck.js'


const deck = new Deck()
// console.log(deck.cards.pop())
// console.log(deck.cards)

deck.shuffle()
const deck2 = [...deck.cards]

console.log(deck2)

const player1 = deck.dealCards(3)

deck.shuffle()

console.log(player1)
console.log(deck.cards)