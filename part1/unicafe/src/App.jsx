import { useState } from 'react'

const Feedback = () => (
  <div>
    <h1>
      give feedback
    </h1>
  </div>
)

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}> {props.text} </button>
    </div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>
        {props.text}
      </td>
      <td>
        {props.value}
      </td>
    </tr>
  )
}

const Statistics = (props) => {
  let total = props.good + props.neutral + props.bad
  let average = 0
  let percentage = 0
  
  if (total === 0) {
    return (
      <div>
        <h2>
          Statistics
        </h2>
        No Feedback Given
      </div>
    )
  }
  else if (total !== 0) {
    average = (props.good * 1 + props.bad * -1) / total
    percentage = props.good / total * 100
  }
  
  return (
    <div>
      <h2>
        Statistics
      </h2>
      <table>
        <tbody>
          <StatisticLine text="Good" value={props.good} />
          <StatisticLine text="Neutral" value={props.neutral} />
          <StatisticLine text="Bad" value={props.bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={average} />
          <StatisticLine text="Positive" value={percentage} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Feedback />
      <Button onClick={() => setGood(good + 1)}  text="Good" />
      <Button onClick={() => setNeutral(neutral + 1)}  text="Neutral" />
      <Button onClick={() => setBad(bad + 1)}  text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App