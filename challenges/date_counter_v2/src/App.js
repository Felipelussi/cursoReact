import { useState } from "react";

export default function App() {
  const [step, setstep] = useState(1);
  const [counter, setCounter] = useState(0);

  function handleDate(count) {
    const date = new Date();
    date.setDate(date.getDate() + count);
    return date.toDateString();
  }

  function reset() {
    setCounter(0);
    setstep(0);
  }
  return (
    <div>
      <input
        type="range"
        value={step}
        onChange={(e) => setstep(Number(e.target.value))}
      />
      <span>{step}</span>
      <div>
        <button onClick={() => setCounter(() => counter - step)}>-</button>
        <input
          type="text"
          value={counter}
          onChange={(e) => setCounter(Number(e.target.value))}
        />
        <button onClick={() => setCounter(() => counter + step)}>+</button>
      </div>
      <div>
        <span>{handleDate(counter)}</span>
      </div>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}
