const connectToNongo = require("./db");
const express = require('express')
const auth = require('./routes/auth.js');
const notes = require('./routes/notes.js');
const cors = require('cors');

connectToNongo();

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// Available routes
app.use('/api/auth', auth)
app.use('/api/notes', notes)

app.listen(port, () => {
    console.log(`iNoteBook server listening at http://127.0.0.1:5000 port ${port}`)
})