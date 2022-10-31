import { useState } from "react";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <div>
      {text} {value}
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={good + neutral + bad} />
        <StatisticLine
          text="average"
          value={(good - bad) / (good + neutral + bad)}
        />
        <StatisticLine
          text="positive"
          value={(100 * good) / (good + neutral + bad)}
        />
      </div>
    );
  }
  return (
    <div>
      <h1>statistics</h1>
      No feedback given
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
