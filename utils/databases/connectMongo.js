import mongoose from 'mongoose'
import { createVehicle, findVehiclesByQuery } from '../../services/servicesVehicle.js'

export default (() => {
    try {
        mongoose.connect(process.env.DATABASE_URL)

        const DB = mongoose.connection

        DB.on('error', (error) => console.log('Connect to mongo error: ', error))
        DB.once('open', async () => {
            console.log('Connection to DB succesfull')
            const vehicles = await findVehiclesByQuery()
            if (vehicles.length === 0) {
                await createVehicle({
                    name: 'No tiene',
                    typeVehicle: 'NO APLICA',
                    color: 'NO APLICA'
                })
            }
        })
    } catch (error) {
        console.log('error')
    }
})()
