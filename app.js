import * as dotenv from 'dotenv'
import express from 'express'
import compression from 'compression'
import rutas from './routes/index.routes.js'
import cors from 'cors'
import helmet from 'helmet'

dotenv.config()
const app = express()

app.use(compression())
app.use(express.json())
app.use(cors())
app.use(helmet())

app.get('/', async (_, res) => {
    res.json({
        message: 'Driver Pay Service'
    })
})

app.use('/api/v1', rutas)

export default app
