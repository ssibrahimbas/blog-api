const express = require("express")
const dotenv = require("dotenv")

const connectToMongoDB = require(`${process.cwd()}/helpers/database/mongoDB`)
const routes = require(`${process.cwd()}/routes`)
const errorHandler = require(`${process.cwd()}/middlewares/error/errorHandler`)

dotenv.config({path : "./config/env/config.env"});

const app = express()

app.use(errorHandler)
app.use('/api',routes)
app.use(express.json())
app.use(express.static("static"))

const PORT = process.env.PORT || 3001

connectToMongoDB()

app.listen(PORT, () => {
    console.log(`App started on ${PORT}`)
})