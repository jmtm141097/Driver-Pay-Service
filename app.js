import * as dotenv from 'dotenv'
import express from 'express'
import compression from 'compression'

dotenv.config()
const app = express()

app.use(compression())
app.use(express.json())

app.get('/', async (req, res) => {
    res.json({
        message: 'Hola mundo'
    })
})

export default app
