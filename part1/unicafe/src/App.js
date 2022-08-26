import { useState } from "react";
import Statistics from "./components/Statistics";
import Button from "./components/Button";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h2>give feedback</h2>

      <Button handleClick={() => setGood(good + 1)} buttonText="good" />
      <Button
        handleClick={() => setNeutral(neutral + 1)}
        buttonText="neutral"
      />
      <Button handleClick={() => setBad(bad + 1)} buttonText="bad" />

      <Statistics {...{ good, neutral, bad }} />
    </div>
  );
};

export default App;
