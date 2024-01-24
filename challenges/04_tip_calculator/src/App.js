import { useState } from "react";

export default function App() {
  const [billValue, setBillValue] = useState("");
  const [Percentage1, setPercentage1] = useState(0);
  const [Percentage2, setPercentage2] = useState(0);

  let bill = billValue;
  const tipValue = (bill * (Percentage1 + Percentage2)) / 200;

  function reset() {
    setPercentage1(0);
    setPercentage2(0);
    setBillValue("");
  }
  const total = bill + tipValue;

  return (
    <div className="main">
      <Bill onSetBill={setBillValue} bill={billValue} />
      <Review percentage={Percentage1} onSetPercentage={setPercentage1}>
        How are you satisfied with service?{" "}
      </Review>
      <Review percentage={Percentage2} onSetPercentage={setPercentage2}>
        How are your friend satisfied with service?{" "}
      </Review>
      <Output bill={total} tip={tipValue}></Output>
      <Reset handleReset={reset} />
    </div>
  );
}

function Bill({ bill, onSetBill }) {
  return (
    <div className="inputs">
      <label>How much was the bill? </label>
      <input
        type="text"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

function Review({ percentage, onSetPercentage, children }) {
  return (
    <div className="inputs">
      <label>{children}</label>
      <select
        onChange={(e) => onSetPercentage(Number(e.target.value))}
        value={percentage}
      >
        <option value="0">Didn't like it (0%)</option>
        <option value="5">It was ok (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutly amazing (20%)</option>
      </select>
    </div>
  );
}

function Output({ bill, tip }) {
  return (
    <h3>
      You pay ${bill} (${bill - tip} + ${tip} tip)
    </h3>
  );
}

function Reset({ handleReset }) {
  return <button onClick={() => handleReset()}>Reset</button>;
}
