export default function HiLoInstructions() {
  return (
    <div className="panel" style={{ marginTop: 16 }}>
      <div className="panel-heading">Hi‑Lo Rules</div>
      <ul className="tips-list">
        <li><strong>+1</strong> → Cards <b>2, 3, 4, 5, 6</b></li>
        <li><strong>0</strong> → Cards <b>7, 8, 9</b></li>
        <li><strong>−1</strong> → Cards <b>10, J, Q, K, A</b></li>
      </ul>
    </div>
  );
}
