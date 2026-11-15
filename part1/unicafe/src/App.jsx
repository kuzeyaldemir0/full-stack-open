import { useState } from 'react'

const StatisticLine = ({text, number}) => {
  return (
    <tr>
      <td>
        {text}
      </td>
      <td>
        {number}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  const {good, bad, neutral} = props
  const total = good + bad + neutral
  if (total === 0) {
    return (
      <>
        <h1>Statistics</h1>
        <p>no feedback given</p>
      </>
    )
  }
  const pos_feedb_perc = (good / total) * 100
  const average = ((bad * -1) + good) / total
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
        <StatisticLine text="good" number={good} />
        <StatisticLine text="neutral" number={neutral} />
        <StatisticLine text="bad" number={bad} />
        <StatisticLine text="all" number={total} />
        <StatisticLine text="average" number={average} />
        <StatisticLine text="positive" number={pos_feedb_perc} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleBad = () => setBad(bad + 1)
  const handleNeutral = () => setNeutral(neutral + 1)

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <Statistics good={good} bad={bad} neutral={neutral} />
    </>
  )
}

export default App