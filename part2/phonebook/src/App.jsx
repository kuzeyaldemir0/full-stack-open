import { useState } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1, show: true },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2, show: true },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3, show: true },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4, show: true }
  ])
  const [newName, setNewName] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [filter, setFilter] = useState("")

  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)) { alert(`${newName} is already added to phonebook`) }
    else {
      const newPerson = { name: newName, number: newPhone, id: (persons.length + 1) }
      setPersons(persons.concat(newPerson))
      setNewName("")
      setNewPhone("")
    }
  }

  const personsToShow = filter === "" ? persons : persons.filter(person => person.name.includes(filter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <Form
          addPerson={addPerson}
          newName={newName}
          handleNameChange={handleNameChange}
          newPhone={newPhone}
          handlePhoneChange={handlePhoneChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App