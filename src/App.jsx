const API = ' https://data.fixer.io/api/latest?access_key=API_KEY'

import { useState, useEffect } from "react"

function App(){
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [rate, setRate] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    fetch(
      API
    )
      .then((res) => res.json())
      .then((data) => {
        setRate(data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    if(rate){
      setResult((amount*rate).toFixed(2))
    }
  }, [amount, rate]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return(
    <div className="app">
      <div className="card">
        <h2>Currency Converter</h2>

        <div className="input-group">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="currency-row">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </select>

          <button className="swap-btn" onClick={swapCurrencies}>
            ⇄
          </button>

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </select>
        </div>

        <div className="result">
          {result && (
            <h3>
              {amount} {fromCurrency} = {result} {toCurrency}
            </h3>
          )}
        </div>
      </div>
    </div>
  )
}

export default App