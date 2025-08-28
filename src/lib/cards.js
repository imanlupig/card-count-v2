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

export function fisherYatesShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function hiLoValue(rank) {
    if (["2", "3", "4", "5", "6"].includes(rank)) return +1;
    if (["7", "8", "9"].includes(rank)) return 0;
    return -1; // 10, J, Q, K, A
}

export const round2 = (n) => Math.round(n * 100) / 100;

/**
 * Optional debugging helper to detect duplicates within the same deckId.
 * Set `debug=true` when calling from development only.
 */
export function logDuplicateCardsIfAny(shoe, debug = false) {
    if (!debug) return;
    const seen = new Set();
    const dups = [];
    for (const c of shoe) {
        const key = `${c.deckId}|${c.rank}|${c.suit}`;
        if (seen.has(key)) dups.push(key);
        seen.add(key);
    }
    if (dups.length) {
        // eslint-disable-next-line no-console
        console.warn("Duplicate cards detected (deckId|rank|suit):", dups);
    } else {
        // eslint-disable-next-line no-console
        console.info("No duplicates detected within the same deckId.");
    }
}