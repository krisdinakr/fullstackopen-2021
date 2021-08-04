import React, { useState } from 'react';

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

const Statistics = ({props}) => {
  if (props.good + props.bad + props.neutral > 0) {
    return (
      <table>
        <tbody>
          <StatisticLine text='good' value={props.good} />
          <StatisticLine text='neutral' value={props.neutral} />
          <StatisticLine text='bad' value={props.bad} />
          <StatisticLine text='all' value={props.allFeedback} />
          <StatisticLine text='average' value={(props.average / props.allFeedback).toFixed(1)} />
          <StatisticLine text='positive' value={(props.good / props.allFeedback * 100).toFixed(1).concat(' %')} />
        </tbody>
      </table>
    )
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allFeedback, setAll] = useState(0);
  const [average, setAverage] = useState(0);

  const giveGood = () => {
    setGood(good + 1);
    setAll(allFeedback + 1);
    setAverage(average + 1);
  }
  const giveNeutral = () => {
    setNeutral(neutral + 1);
    setAll(allFeedback + 1)
  }
  const giveBad = () => {
    setBad(bad + 1);
    setAll(allFeedback + 1);
    setAverage(average - 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={giveGood} text='good'/>
      <Button handleClick={giveNeutral} text='neutral'/>
      <Button handleClick={giveBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics props={{good, neutral, bad, allFeedback, average}} />
    </div>
  )
}

export default App;
