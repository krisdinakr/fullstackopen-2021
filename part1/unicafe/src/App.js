import React, { useState } from 'react';

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({text, value, percent}) => (
  <tr>
    <td>{text}</td>
    <td>{value} {percent ? '%' : ''}</td>
  </tr>
)

const Statistics = ({feedback}) => {
  if (feedback.allFeedback > 0) {
    return (
      <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text='good' value={feedback.good} />
          <StatisticLine text='neutral' value={feedback.neutral} />
          <StatisticLine text='bad' value={feedback.bad} />
          <StatisticLine text='all' value={feedback.allFeedback} />
          <StatisticLine text='average' value={feedback.average.toFixed(1)} />
          <StatisticLine text='positive' value={feedback.positiveFeedbackPercentage.toFixed(1)} percent='%' />
        </tbody>
      </table>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  )
}

const Feedback = ({good, neutral, bad, setGood, setNeutral, setBad}) => (
  <div>
    <h1>give feedback</h1>
    <Button handleClick={() => setGood(good + 1)} text='good'/>
    <Button handleClick={() => setNeutral(neutral + 1)} text='neutral'/>
    <Button handleClick={() => setBad(bad + 1)} text='bad'/>
  </div>
)

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const allFeedback = good + neutral + bad;
  const average = (good - bad) / allFeedback;
  const positiveFeedbackPercentage = (good / allFeedback * 100)

  return (
    <>
      <Feedback good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad} />
      <Statistics feedback={{good, neutral, bad, allFeedback, average, positiveFeedbackPercentage}} />
    </>
  )
}

export default App;
