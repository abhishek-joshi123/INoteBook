const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
require('dotenv').config();

connectToMongo()

const app = express()

const port = 5000

// const corsOptions = {
//     origin: ""
// }

app.use(cors())
// app.use(cors( {
//     origin: ["http://localhost:3000", "https://abhishek-joshi123.github.io"]
// }))

app.use(express.json())    //   thi srequired to send request..
// available routes..

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, () => {
    console.log(`INoteBook backend is running at localhost:${port}`);
})
