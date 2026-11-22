const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
morgan.token('body', (req, res) => {
    return JSON.stringify(req.body)
})
app.use(morgan((tokens, req, res) => {
    return [
        'Method: ', tokens.method(req, res), '\n',
        'URL: ', tokens.url(req, res), '\n',
        'Status: ', tokens.status(req, res), '\n',
        'Content length: ', tokens.res(req, res, 'content-length'), '\n',
        'Response time: ', tokens['response-time'](req, res), ' ms', '\n',
        'Body: ', tokens.body(req, res),
    ].join('')
}))

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Welcome to the home page!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
    const receivedAt = new Date().toString()
    response.send(
        `Phonebook has info for ${persons.length} people <br> ${receivedAt}`
    )
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {    
    const maxId = persons.length > 0
    ? Math.max(...persons.map(person => Number(person.id)))
    : 0

    
    const person = request.body
    const names = persons.map(person => person.name)
    if (!person.name || !person.number) {
        return response.status(400).json({
            error: 'person name or phone is missing'
        })
        
    } else if (names.includes(person.name))
        return response.status(400).json({
            error: 'name is already in the phonebook'
        })
    else {
        person.id = String(maxId + 1)
        persons = persons.concat(person)
        response.json(person)
    }
})

const unknownEndpoint = (request, response) => {
    response.status(404).json({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
