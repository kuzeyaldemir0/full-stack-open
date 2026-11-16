const Part = ( props ) => {
  return (
    <div>
      <p>{props.name} {props.count} </p>
    </div>
  )
}

const Content = ( {parts} ) => {
  const exercise_counts = parts.map(part => part.exercises)
  const total = exercise_counts.reduce(
    (accumulator, currentValue) => accumulator + currentValue
    , 0
  )
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} count={part.exercises} />)}
      <p>total of {total} exercises </p>
    </div>
  )
}

const Course = ( {course} ) => {
  console.log(course);
  
  return (
    <div>
      <h2>{course.name}</h2>
      <Content parts={course.parts} />
    </div>
  )
}

export default Course