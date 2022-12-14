import pasajeroService from '../../../services/pasajero.services.js'
import pasajeroModel from '../../../schemas/pasajero.js'

export const infoPasajeros = [
    {
        identificacion: 1084869583,
        nombre: 'Juan Manuel Tamayo Monje',
        metodoPago: 'CARD',
        idPago: 42418
    },
    {
        identificacion: 165523148,
        nombre: 'Daniela Pedraza Veloza',
        metodoPago: 'CARD',
        idPago: 42494
    },
    {
        identificacion: 164121645,
        nombre: 'Eduar Motta',
        metodoPago: 'NEQUI',
        idPago: 42499
    }
]

export const semillaPasajeros = async () => {
    const pasajeros = await pasajeroService.listarPasajeros({})
    if (pasajeros.length !== 0) return
    await pasajeroModel.insertMany(infoPasajeros)
}
