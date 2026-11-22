import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import Message from './components/Message'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newPhone, setNewPhone] = useState("")
  const [filter, setFilter] = useState("")
  const [message, setMessage] = useState("")

  const handleNameChange = (event) => setNewName(event.target.value)
  const handlePhoneChange = (event) => setNewPhone(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    if (names.includes(newName)) {
      const newPerson = { name: newName, number: newPhone }
      const existingPerson = persons.find(person => person.name === newName)
      const shouldUpdate = window.confirm(
        `${existingPerson.name} is already added to the phonebook, replace the old number with a new one?`
      )
      if (shouldUpdate) {
        personService
          .update(existingPerson.id, newPerson)
          .then(newPersonResponse => {
            setPersons(persons.map(person => {
            if (person.id === newPersonResponse.id) {
              return newPersonResponse
            }
            return person
            }))
            setMessage(`${existingPerson.name} has updated its phone number`)
            setTimeout(() => {setMessage('')}, 3000)
            })
          .catch(error => {
            setMessage(`The person you're trying to update is deleted`)
            setPersons(persons.filter(person => person.id !== existingPerson.id))
          })
        setNewName('')
        setNewPhone('')
      }
    }
    else {
      const newPerson = { name: newName, number: newPhone }
      personService.create(newPerson).then(
        newPerson => setPersons(persons.concat(newPerson))
      )
      setNewName('')
      setNewPhone('')
      setMessage(`${newPerson.name} added to the phonebook`)
      setTimeout(() => {setMessage('')}, 3000)
    }
  }

  // Getting the db.json in the root after the initial render.
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const personsToShow = filter === "" 
    ? persons 
    : persons.filter(person => person.name.includes(filter))

  const deletePerson = (id) => {
    const delete_ok = window.confirm(
      `Delete ${persons.find(person => person.id === id).name}?`
    )
    if (delete_ok) {
      personService.deletePerson(id).then(
        deletedPerson => setPersons(
          persons.filter(person => person.id !== id)
        )
      )
    }
  }

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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
      <Message message={message} />
    </div>
  )
}

export default App