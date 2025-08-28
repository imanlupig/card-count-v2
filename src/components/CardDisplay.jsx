export default function CardDisplay({ card, total, index }) {
  const hasCard = !!card;
  const dealt = Math.min(index, total);
  const suit = hasCard ? card.suit : null;
  const isRed = suit === "♥" || suit === "♦";
  return (
    <div className="card-row">
      <div className={`playing-card ${isRed ? 'red' : 'black'}`}>
        {hasCard ? <span title={`Deck ${card.deckId}`}>{card.rank}{card.suit}</span> : <span>—</span>}
      </div>
      <div className="meta">
        <div><strong>Card:</strong> {hasCard ? `${card.rank}${card.suit} (Deck ${card.deckId})` : "—"}</div>
        <div><strong>Dealt:</strong> {dealt} / {total || 0}</div>
      </div>
    </div>
  );
}
