const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const createError = require('http-errors')
const path = require('path');
const app = express()
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
mongoose
    .connect(
        process.env.DB_CONNECT,
        {
            dbName:process.env.DB_NAME ,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log('Mongodb connected...')
    })
    .catch((err) => console.error('Something went wrong!', err.message))

const Police = require('./Routes/PoliceDepartment')
const Justice = require('./Routes/JusticeDepartment')
const User = require('./Routes/User')
//const Form = require("./Routes/Complaint");
const Doc = require("./Routes/uploadRoute")
var cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH']
}))
app.use(express.urlencoded({ extended: false }));

app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use('/police', Police)
app.use('/justice', Justice)
app.use('/user', User)
//app.use('/form', Form)
app.use('/uploads', Doc)

app.use((req, res, next) => {
    next(createError(404, 'Not found'))
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Listening on port ${port}...`))