import { useCallback, useEffect, useRef, useState } from "react";
import { buildShoe, fisherYatesShuffle, hiLoValue, round2, logDuplicateCardsIfAny } from "../lib/cards";

export default function useHiLoTrainer({
  initialDecks = 6,
  initialInterval = 500,
  minInterval = 100,
  debug = false,
} = {}) {
  // Configurable UI states
  const [numDecks, setNumDecks] = useState(initialDecks);
  const [intervalMs, setIntervalMs] = useState(initialInterval);
  const [autoDealing, setAutoDealing] = useState(false);

  // Count & current display
  const [runningCount, setRunningCount] = useState(0);
  const [trueCount, setTrueCount] = useState(0);
  const [currentCard, setCurrentCard] = useState(null);

  // Internals
  const shoeRef = useRef([]);       // full shoe of cards
  const idxRef = useRef(0);         // current index (useRef to be interval-safe)
  const timerRef = useRef(null);    // interval id

  const totalCards = shoeRef.current.length;
  const dealtIndex = idxRef.current;

  const remainingCards = useCallback(() => {
    return totalCards - idxRef.current;
  }, [totalCards]);

  const computeTrueCount = useCallback((rc) => {
    const rem = remainingCards();
    if (rem <= 0) return rc;
    const decksRemaining = rem / 52;
    return rc / decksRemaining;
  }, [remainingCards]);

  const stopAuto = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setAutoDealing(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const dealOne = useCallback(() => {
    const idx = idxRef.current;
    const shoe = shoeRef.current;

    if (!shoe || shoe.length === 0) return;
    if (idx >= shoe.length) {
      stopAuto();
      return;
    }

    const card = shoe[idx];
    idxRef.current = idx + 1;
    setCurrentCard(card);

    const delta = hiLoValue(card.rank);
    setRunningCount((prev) => {
      const nextRunning = prev + delta;
      const nextTrue = computeTrueCount(nextRunning);
      setTrueCount(round2(nextTrue));
      return nextRunning;
    });

    if (idxRef.current >= shoe.length) stopAuto();
  }, [computeTrueCount, stopAuto]);

  const startDrill = useCallback(() => {
    const fresh = buildShoe(numDecks);
    fisherYatesShuffle(fresh);
    logDuplicateCardsIfAny(fresh, debug);

    shoeRef.current = fresh;
    idxRef.current = 0;

    setRunningCount(0);
    setTrueCount(0);
    setCurrentCard(null);

    // immediate first deal & count
    dealOne();
  }, [numDecks, debug, dealOne]);

  const toggleAuto = useCallback(() => {
    if (autoDealing) return stopAuto();

    const speed = Math.max(minInterval, Number(intervalMs) || minInterval);
    setIntervalMs(speed);
    setAutoDealing(true);

    // deal immediately, then continue at interval
    dealOne();
    timerRef.current = setInterval(() => {
      dealOne();
    }, speed);
  }, [autoDealing, intervalMs, minInterval, dealOne, stopAuto]);

  const deckEnded = totalCards > 0 && dealtIndex >= totalCards;

  return {
    // state
    numDecks,
    intervalMs,
    autoDealing,
    runningCount,
    trueCount,
    currentCard,
    totalCards,
    dealtIndex,
    deckEnded,

    // derived
    remaining: remainingCards(),

    // actions
    setNumDecks,
    setIntervalMs,
    startDrill,
    dealOne,       // manual next-card
    toggleAuto,
    stopAuto,
  };
}
