const { response } = require('express')
const express = require('express')
const app = express()



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

  app.use(express.json())


  /// GET: an event handler that is used to handle GET made a /root:
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })

  app.get('/api/persons', (request, response) => {
    response.json(persons)
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

   /*persons need a unique id. find out the largest id 
    number in the current list and assign it to the maxId 
    variable. the id of the new persons is then defined as maxID + 1. 
    Math.max() returns the largest mapped id numbers 
    the spread operator (...) is used because persons.map(p => p.id)  is an array and cannot 
    be directly given as a parameter to Math.max.
    the array is transformed into individual numbers by using the spread operator. 
    */

    const generateId = () => {
    const maxId = persons.length > 0 
    ? Math.max(...persons.map(p => p.id))
    : 0
    return maxId + 1
    }

  /// POST
  app.post('/api/persons', (request, response) => {
    const body = request.body

  // id data for name is missing, server will respond with 400 bad request 

    if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    }

    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }

    persons = persons.concat(person)

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
