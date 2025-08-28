export default function DeckSelector({ value, onChange }) {
  return (
    <div>
      <label htmlFor="decks" className="label">Number of decks</label>
      <select
        id="decks"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="select"
      >
        {[1,2,3,4,5,6,7,8].map(n => (
          <option key={n} value={n}>{n} {n === 1 ? "deck" : "decks"}</option>
        ))}
      </select>
    </div>
  );
}
