import mongoose from 'mongoose'

const conductorSchema = new mongoose.Schema(
    {
        estado: {
            type: String,
            required: true,
            enum: ['DISPONIBLE', 'OCUPADO', 'FUERA DE SERVICIO']
        },
        idCarrera: {
            type: String
        },
        identificacion: {
            type: Number,
            required: true
        },
        nombreCompleto: {
            type: String,
            required: true
        },
        ubicacionActual: {
            type: String,
            required: true
        },
        vehiculo: {
            type: String,
            required: true,
            enum: ['CARRO', 'MOTO', 'BICICLETA']
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('conductor', conductorSchema)
