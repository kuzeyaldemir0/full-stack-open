const Persons = ({persons, deletePerson}) => {

  const personList = (person) => {
    return (
      <div key={person.id}>
        <p> {person.name} {person.number} </p>
        <button onClick={() => deletePerson(person.id)}>
          delete
        </button>
      </div>
    )
  }
  return (
    <div>
      {persons.map(personList)}
    </div>
  )
}

export default Persons
