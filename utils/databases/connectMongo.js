import mongoose from 'mongoose'
import { semillaPasajeros } from './seed/pasajeros.js'
import { semillaConductores } from './seed/conductores.js'
export default (() => {
    try {
        mongoose.connect(process.env.DATABASE_URL)

        const DB = mongoose.connection

        DB.on('error', (error) => console.log('Connect to mongo error: ', error))
        DB.once('open', async () => {
            console.log('Connection to DB succesfull')
            await Promise.all([semillaPasajeros(), semillaConductores()])
        })
    } catch (error) {
        console.log('error')
    }
})()
