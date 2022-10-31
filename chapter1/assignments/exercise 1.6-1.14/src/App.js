import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad }) => {
  return (
    <div>
      <h1>statistics</h1>
      <div> good {good}</div>
      <div> neutral {neutral}</div>
      <div> bad {bad}</div>
      <div> all {good + neutral + bad}</div>
      <div> average {(good - bad) / (good + neutral + bad)}</div>
      <div> positive {(100 * good) / (good + neutral + bad)} %</div>
    </div>
  );
};

function App() {
  const [good, incrementGood] = useState(0);
  const [neutral, incrementNeutral] = useState(0);
  const [bad, incrementBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={() => incrementGood(good + 1)} text="good" />
        <Button onClick={() => incrementNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => incrementBad(bad + 1)} text="bad" />
        <Statistics good={good} neutral={neutral} bad={bad} />
      </div>
    </div>
  );
}

export default App;
