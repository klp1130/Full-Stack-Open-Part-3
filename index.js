const express = require('express')
const app = express()

app.use(express.json())



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas",  
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

  /// GET: an event handler that is used to handle GET made a /root:
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  /// Get: used to define how the request is responded to 
  app.get('/api/persons/id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    response.json(persons)

    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  /// POST
  app.post('/api/persons', (request, response) => {
    const person = request.body
    console.log(person)
    response.json(person)
  })

  /// DELETE
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
