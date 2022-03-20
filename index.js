
require('dotenv').config()

const express = require('express')

const app = express()

const Note= require('./models/note')

const cors = require('cors')
app.use(cors())


app.use(express.json())

app.use(express.static('build'))

const mongoose = require('mongoose')



// if (process.argv.length < 3) {
//   console.log('Please provide the password as an argument: node mongo.js <password>')
//   process.exit(1)
// }

// const password = process.argv[2]


// DO NOT SAVE YOUR PASSWORD TO GITHUB!!
const url = `mongodb+srv://antariksh:<password>@cluster0.ouytb.mongodb.net/noteApp?retryWrites=true&w=majority`


mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// let notes = [
//     {
//       id: 1,
//       content: "HTML is easy",
//       date: "2022-05-30T17:30:31.098Z",
//       important: true
//     },
//     {
//       id: 2,
//       content: "Browser can execute only Javascript",
//       date: "2022-05-30T18:39:34.091Z",
//       important: false
//     },
//     {
//       id: 3,
//       content: "GET and POST are the most important methods of HTTP protocol",
//       date: "2022-05-30T19:20:14.298Z",
//       important: true
//     }
//   ]
 /* without express 
  const app = http.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
  })
*/

//  app.get('/', (request, response)=> {
//    response.send('<h1>Hello World!</h1>')
//  })


 noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
 })

 app.get('/api/notes', (request,response)=> {
    
    Note.find({}).then(notes => {

      response.json(notes)

    })
 })

 app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  
  
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})
 const generateId = () => {

  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id)) 
    : 0

  return maxId + 1

 }

app.post('/api/notes', (request,response) => {
  const body = request.body
  
  if(!body.content){
    return response.status(400).json({
      error: "content missing"
    })
  }

  const note ={
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId()
  }

  notes = notes.concat(note)
  response.json(note)
})


app.delete('/api/notes/:id', (request, response) => {
  const id =Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  
  response.status(204).end()
})

const PORT = process.env.PORT 

app.listen(PORT, () => {
  console.log(`Server running on port  ${PORT}`)
}) 

// npm install --save-dev nodemon
//npm run dev