import app from './app.js'
import './utils/databases/connectMongo.js'

const port = process.env.PORT || 3002

app.listen(port, () => {
    console.log('Running in http://localhost:' + port)
})
