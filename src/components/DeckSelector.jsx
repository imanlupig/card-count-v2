export default function DeckSelector({ value, onChange }) {
  return (
    <div>
      <label htmlFor="decks" style={{ display: "block", fontWeight: 600, color: 'black' }}>Number of decks</label>
      <select
        id="decks"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", padding: 8 }}
      >
        {[1,2,3,4,5,6,7,8].map(n => (
          <option key={n} value={n}>{n} {n === 1 ? "deck" : "decks"}</option>
        ))}
      </select>
    </div>
  );
}
