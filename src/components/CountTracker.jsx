export default function CountTracker({ hidden, runningCount, trueCount, decks, remaining }) {
  if (hidden) {
    return (
      <div style={{
        padding: 12,
        border: "1px dashed #bbb",
        borderRadius: 10,
        color: "black"
      }}>
        Counts are hidden.
      </div>
    );
  }
  return (
    <div style={{
      padding: 12,
      border: "1px solid #e5e5e5",
      borderRadius: 10,
      background: "#fff"
    }}>
      <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6, color: 'black'}}>Count Tracker</div>
      <div style={{color: 'black'}}><strong>Running Count:</strong> {runningCount}</div>
      <div style={{color: 'black'}}><strong>True Count:</strong> {trueCount.toFixed(2)}</div>
      <div style={{ marginTop: 6, fontSize: 12, color: "black" }}>
        <em>{decks} deck{decks === 1 ? "" : "s"} in shoe · {remaining} card{remaining === 1 ? "" : "s"} remaining</em>
      </div>
    </div>
  );
}
