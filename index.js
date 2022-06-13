const { request } = require('express')
const { response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')


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

/// Middleware request logger
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))

  app.use(express.json())



  /// GET: an event handler that is used to handle GET made a /root:
  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  /// GET for how many entries are in the phone book + date/time
  app.get('/info', (request, response) => {
    const currentDate = new Date().toLocaleString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      response.send(
        `<div>
          <span>phone book has info for ${persons.length} people</span></div>
        <span>${currentDate} (${timeZone})</span>`,
      )
    })
  

  app.get('/api/persons', (request, response) => {
    response.json(persons)
  })

  /// GET: used to get a specific person by id
  app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

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

  /// POST: Add new contact 
  app.post('/api/persons', (request, response) => {
    const body = request.body

  // id data for name is missing, server will respond with 400 bad request 

    if (!body.name) {
      return response.status(400).json({
        error: 'name missing'
      })
    }
  // id data for number is missing, server will respond with 400 bad request 
    if (!body.number) {
      return response.status(400).json({
        error: 'missing number'
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
  
  const unknownEndpoint = (request, response) => {
    response.status(400).send({error: 'unknown endpoint'})
  }

  app.use(unknownEndpoint)

  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  
