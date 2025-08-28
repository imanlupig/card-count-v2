export const SUITS = ["♠", "♥", "♦", "♣"];
export const RANKS = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];

export function buildSingleDeck(deckId) {
    const deck = [];
    for (const suit of SUITS) {
        for (const rank of RANKS) {
            deck.push({ suit, rank, deckId })
        }
    }
    console.log("Single Deck: ", deck)
    return deck;
}

export function buildShoe(numDecks) {
    const shoe = [];
    for (let d = 1; d <= numDecks; d++) {
        shoe.push(...buildSingleDeck(d))
    }
    return shoe;
}