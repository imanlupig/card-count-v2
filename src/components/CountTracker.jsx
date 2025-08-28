export default function CountTracker({ hidden, runningCount, trueCount, decks, remaining }) {
  if (hidden) {
    return (
      <div className="panel panel-muted">
        Counts are hidden.
      </div>
    );
  }
  return (
    <div className="panel">
      <div className="panel-heading">Count Tracker</div>
      <div><strong>Running Count:</strong> {runningCount}</div>
      <div><strong>True Count:</strong> {trueCount.toFixed(2)}</div>
      <div className="muted" style={{ marginTop: 6, fontSize: 12 }}>
        <em>{decks} deck{decks === 1 ? "" : "s"} in shoe · {remaining} card{remaining === 1 ? "" : "s"} remaining</em>
      </div>
    </div>
  );
}
