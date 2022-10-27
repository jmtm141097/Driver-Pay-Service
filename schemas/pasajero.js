import mongoose from 'mongoose'

const pasajeroSchema = new mongoose.Schema(
    {
        identificacion: {
            type: Number,
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        metodoPago: {
            type: String,
            required: true,
            enum: ['CARD', 'NEQUI']
        },
        idPago: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('pasajero', pasajeroSchema)
