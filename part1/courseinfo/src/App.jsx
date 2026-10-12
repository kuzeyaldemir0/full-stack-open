const Header = (props) => {
  console.log(props)
  return (
    <h1>
      Course Name: {props.course}
    </h1>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>
      Part Name: {props.part} | Number of Exercises: {props.exercise}
    </p>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
        <Part part={props.part1} exercise={props.exercise1} />
        <Part part={props.part2} exercise={props.exercise2} />
        <Part part={props.part3} exercise={props.exercise3} />
    </div>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>
      Total Number of Exercises: {props.total}
    </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14


  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercise1={exercises1} part2={part2} exercise2={exercises2} part3={part3} exercise3={exercises3} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App