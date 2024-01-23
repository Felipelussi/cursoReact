export default function Stats({ items }) {
  if (items.length === 0)
    return (
      <footer className="stats">
        <em>Start adding some items to your list 🚀</em>
      </footer>
    );
  const nItems = items.length;
  const nPackedItems = items.filter((item) => item.packed).length;
  const percentage = Math.round((nPackedItems / nItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage !== 100
          ? `💼 You have ${nItems} items on your list, and you already packed 
        ${percentage}%`
          : "You are ready to go 😎"}
      </em>
    </footer>
  );
}
