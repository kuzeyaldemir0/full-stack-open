const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Give password as argument')
    process.exit(1)
}

const userName = 'kuzeyaldemir0_db_user'
const password = process.argv[2]
const url = `mongodb+srv://${userName}:${password}@full-stack-open.tojhmdk.mongodb.net/phonebook?`

mongoose.set('strictQuery', false)
mongoose.connect(url, { family: 4 })

const personSchema = new mongoose.Schema({
    person: String,
    number: String,
})
const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    // Fetch all the results from the database
    Person.find({}).then(result => {
        result.forEach(note => {
            console.log(note)
        })
        mongoose.connection.close()
    })
}
else if (process.argv.length == 5) {
    const person = new Person({
        person: process.argv[3],
        number: process.argv[4],
    })
    person.save().then(result => {
        console.log('Person saved')
        mongoose.connection.close()
    })
}
else {
    console.log('Too many arguments')
}

