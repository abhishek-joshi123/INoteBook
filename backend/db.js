const mongoose = require('mongoose')
require('dotenv').config();

const url = "mongodb+srv://Abhishek-Joshi-123:Abhi123@INoteBook.q24cilx.mongodb.net/iNoteBook"

const ConnectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectToMongo = () => {
    mongoose.connect(url, ConnectionParams).then(() => {
        console.log('connected successfully')
    }).catch((e) => {
        console.log('error : ', e);
    })
}

module.exports = connectToMongo