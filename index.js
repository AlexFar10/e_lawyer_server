const express = require('express')
const mongoose = require('mongoose')
const createError = require('http-errors')

const app = express()

mongoose
    .connect(
        'mongodb+srv://AlexFar10:8kjMXDgA7OsyVFWb@cluster0.wveau2u.mongodb.net/?retryWrites=true',
        {
            dbName: 'RestAPI_elawyer',
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
var cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
}))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    res.header('Access-Control-Allow-Headers', 'http://localhost:3000')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, PATCH')
        return res.status(200).json({})
    }
    next()
})

app.use(express.json())
app.use('/police', Police)
app.use('/justice', Justice)
app.use('/user', User)

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