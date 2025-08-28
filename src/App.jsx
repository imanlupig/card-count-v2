import { useState } from "react";
import useHiLoTrainer from "./hooks/useHiLoTrainer";
import DeckSelector from "./components/DeckSelector.jsx";
import CardDisplay from "./components/CardDisplay.jsx";
import CountTracker from "./components/CountTracker.jsx";

const MIN_INTERVAL_MS = 100;

export default function App() {
  // Trainer engine
  const {
    numDecks, setNumDecks,
    intervalMs, setIntervalMs,
    autoDealing, runningCount, trueCount,
    currentCard, totalCards, dealtIndex, deckEnded,
    remaining,
    startDrill, dealOne, toggleAuto,
  } = useHiLoTrainer({ initialDecks: 6, initialInterval: 500, minInterval: MIN_INTERVAL_MS, debug: false });

  // Pure UI flag for visibility
  const [showCounts, setShowCounts] = useState(true);

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h1>Blackjack Hi-Lo Trainer</h1>

      <section style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, alignItems: "end" }}>
        <DeckSelector value={numDecks} onChange={setNumDecks} />
        <div>
          <label htmlFor="interval" style={{ display: "block", fontWeight: 600 }}>Auto-deal interval (ms)</label>
          <input
            id="interval"
            type="number"
            min={MIN_INTERVAL_MS}
            step={50}
            value={intervalMs}
            onChange={(e) => setIntervalMs(Math.max(MIN_INTERVAL_MS, Number(e.target.value) || MIN_INTERVAL_MS))}
            style={{ width: "100%", padding: 8 }}
          />
          <small>Minimum {MIN_INTERVAL_MS}ms</small>
        </div>
      </section>

      <section style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
        <button onClick={startDrill} style={btnStyle}>Start Drill</button>
        <button onClick={dealOne} style={btnStyle} disabled={totalCards === 0 || deckEnded}>Next Card</button>
        <button onClick={toggleAuto} style={btnStyle} disabled={totalCards === 0 || deckEnded}>
          {autoDealing ? "Stop Auto Deal" : "Start Auto Deal"}
        </button>
        <button onClick={() => setShowCounts((s) => !s)} style={btnStyle}>
          {showCounts ? "Hide Count" : "Show Count"}
        </button>
      </section>

      <section style={{ marginTop: 16 }}>
        <CardDisplay card={currentCard} total={totalCards} index={dealtIndex} />
      </section>

      <section style={{ marginTop: 12 }}>
        <CountTracker
          hidden={!showCounts}
          runningCount={runningCount}
          trueCount={trueCount}
          decks={numDecks}
          remaining={remaining}
        />
      </section>

      {deckEnded && <p style={{ marginTop: 12 }}><strong>Drill complete.</strong> Start a new drill to reshuffle.</p>}
    </div>
  );
}

const btnStyle = {
  padding: "8px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
  background: "#f8f8f8",
  cursor: "pointer",
  color: 'black'
};
