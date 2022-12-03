require('dotenv').config()

const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())
const Person = require('./models/person')
app.use(express.static('build'))
morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

/* let persons = [
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
 */
app.get('/', (request, response) => {
  response.send(`<div>Phonebook has info for ${persons.length} people</div>
  <div>${new Date()}</div>
  `)
})

app.get('/info', (request, response) => {
  Person.find({}).then(persons => {
    response.send(`<div>Phonebook has info for ${persons.length} people</div>
      <div>${new Date()}</div>
    `)
  })
  
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  
  return Math.floor(Math.random() * 1000000);
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  let personsArr
  Person.find({}).then(persons => {
    personsArr ={...persons}
  })

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  else if (!body.number) {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }

  else if (typeof personsArr !== 'undefined' && personsArr.find(person => person.name === body.name)) {
    return response.status(400).json({ 
      error: 'name must be unique'
    })
  }


  const person = new Person({
    name: body.name,
    number: body.number
    
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
