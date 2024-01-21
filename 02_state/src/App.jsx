import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [counter, setCounter] = useState(0);

  function handleDate() {
    const date = new Date();
    date.setDate(counter + date.getDate());
    return date.toDateString();
  }

  return (
    <div>
      <div>
        <button onClick={() => setStep((s) => s - 1)}>-</button>
        <span>Step size: {step}</span>
        <button onClick={() => setStep((s) => s + 1)}>+</button>
      </div>
      <div>
        <button onClick={() => setCounter((c) => c - step)}>-</button>
        <span>Counter: {counter}</span>
        <button onClick={() => setCounter((c) => c + step)}>+</button>
      </div>

      <p>
        {counter > 0 && `${counter} days from now is `}
        {counter < 0 && `${counter} days ago whas `}
        {handleDate()}
      </p>
    </div>
  );
}
