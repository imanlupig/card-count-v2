export default function CardDisplay({ card, total, index }) {
  const hasCard = !!card;
  const dealt = Math.min(index, total);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: 12,
      border: "1px solid #e5e5e5",
      borderRadius: 10,
      color: 'black'
    }}>
      <div style={{
        width: 90, height: 130, borderRadius: 10,
        border: "2px solid #222",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 28, background: "#fff"
      }}>
        {hasCard ? <span title={`Deck ${card.deckId}`}>{card.rank}{card.suit}</span> : <span>—</span>}
      </div>
      <div>
        <div><strong>Card:</strong> {hasCard ? `${card.rank}${card.suit} (Deck ${card.deckId})` : "—"}</div>
        <div><strong>Dealt:</strong> {dealt} / {total || 0}</div>
      </div>
    </div>
  );
}
