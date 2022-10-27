import mongoose from 'mongoose'

const carreraSchema = new mongoose.Schema(
    {
        idCarrera: {
            type: String
        },
        estado: {
            type: String,
            default: 'EN CURSO',
            enum: ['EN CURSO', 'CANCELADA', 'TERMINADA']
        },
        idConductor: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'conductor'
        },
        idPasajero: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'pasajero'
        },
        horaInicio: {
            type: Date,
            required: true,
            default: Date.now()
        },
        horaFin: {
            type: Date
        },
        kmRecorridos: {
            type: Number,
            required: true,
            default: 0
        },
        ubicacionInicial: {
            type: String,
            required: true
        },
        ubicacionFinal: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('carrera', carreraSchema)
