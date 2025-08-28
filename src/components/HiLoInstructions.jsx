export default function HiLoInstructions() {
  return (
    <div style={styles.container}>
      <ul style={styles.list}>
        <li><strong>+1</strong> → Cards <b>2, 3, 4, 5, 6</b></li>
        <li><strong>0</strong> → Cards <b>7, 8, 9</b></li>
        <li><strong>−1</strong> → Cards <b>10, J, Q, K, A</b></li>
      </ul>
    </div>
  );
}

const styles = {
  container: {
    marginTop: 20,
    padding: "12px 16px",
    border: "1px solid #e0e0e0",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    fontFamily: "system-ui, sans-serif",
    maxWidth: 700,
    color: 'black'
  },
  heading: {
    fontSize: 20,
    marginBottom: 8,
  },
  description: {
    margin: "6px 0",
    lineHeight: 1.5,
  },
  list: {
    margin: "8px 0 8px 18px",
    padding: 0,
    lineHeight: 1.5,
  },
  code: {
    display: "inline-block",
    backgroundColor: "#eee",
    padding: "4px 8px",
    borderRadius: 4,
    fontSize: 14,
    fontFamily: "monospace",
  },
};
