const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://torvicvasil1993:${password}@cluster0.grnvg9j.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const generateId = () => {
  
  return Math.floor(Math.random() * 1000000);
}

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length  == 5) {
    mongoose
  .connect(url)
  .then((result) => {
    console.log('connected')

    const person = new Person({ 
      "id": generateId(),
      "name": process.argv[3], 
      "number": process.argv[4]
    })

    return person.save()
  })
  .then(() => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    return mongoose.connection.close()
  })
  .catch((err) => console.log(err))
}

else {
    mongoose
  .connect(url)
  .then((result) => { 
    return Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
        })
  })
}
