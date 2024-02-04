// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState("");
  const [convertedValue, setConvertedValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        try {
          setIsLoading(true);

          const res = await fetch(
            `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
          );

          if (!res.ok)
            new Error("Something went wrong when fetching converted value");

          const value = await res.json();
          setConvertedValue(value.rates[to]);
        } catch (err) {
        } finally {
          setIsLoading(false);
        }
      }
      if (from === to) setConvertedValue(amount);
      convert();
    },
    [amount, from, to]
  );

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setAmount(e.target.value)}
        value={amount}
      />
      <select onChange={(e) => setFrom(e.target.value)} value={from}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={(e) => setTo(e.target.value)} value={to}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{!isLoading ? convertedValue + " " + to : "Loading"}</p>
    </div>
  );
}
