import { useState } from "react";
import useHiLoTrainer from "./hooks/useHiLoTrainer";
import DeckSelector from "./components/DeckSelector.jsx";
import CardDisplay from "./components/CardDisplay.jsx";
import CountTracker from "./components/CountTracker.jsx";
import HiLoInstructions from "./components/HiLoInstructions.jsx";

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
    <div className="app">
      <h1 className="title">Blackjack Hi‑Lo Trainer</h1>

      <section className="table-card" style={{ marginBottom: 12 }}>
        <div className="controls">
          <DeckSelector value={numDecks} onChange={setNumDecks} />
          <div>
            <label htmlFor="interval" className="label">Auto-deal interval (ms)</label>
            <input
              id="interval"
              className="input"
              type="number"
              min={MIN_INTERVAL_MS}
              step={50}
              value={intervalMs}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "") { setIntervalMs(""); return; }
                const num = Number(val);
                if (!isNaN(num)) setIntervalMs(num);
              }}
              onBlur={() => {
                if (!intervalMs || intervalMs < MIN_INTERVAL_MS) setIntervalMs(MIN_INTERVAL_MS);
              }}
            />
            <small className="muted">Minimum {MIN_INTERVAL_MS}ms</small>
          </div>
        </div>

        <div className="btn-row" style={{ marginTop: 12 }}>
          <button onClick={startDrill} className="btn btn-primary">Start Drill</button>
          <button onClick={dealOne} className="btn btn-secondary" disabled={totalCards === 0 || deckEnded}>Next Card</button>
          <button onClick={toggleAuto} className="btn" disabled={totalCards === 0 || deckEnded}>
            {autoDealing ? "Stop Auto Deal" : "Start Auto Deal"}
          </button>
          <button onClick={() => setShowCounts((s) => !s)} className="btn">
            {showCounts ? "Hide Count" : "Show Count"}
          </button>
        </div>
      </section>

      <HiLoInstructions />

      <section className="panel" style={{ marginTop: 16 }}>
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

      {deckEnded && (
        <p style={{ marginTop: 12 }}>
          <strong>Drill complete.</strong> Start a new drill to reshuffle.
        </p>
      )}
    </div>
  );
}

const btnStyle = {};
