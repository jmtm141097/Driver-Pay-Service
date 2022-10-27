import pasajeroService from '../../../services/pasajero.services.js'
import { encryptPago } from '../../confBcryp.js'

const infoPasajeros = [
    {
        identificacion: 1084869583,
        nombre: 'Juan Manuel Tamayo Monje',
        metodoPago: 'CARD',
        idPago: await encryptPago(42418)
    },
    {
        identificacion: 1084869583,
        nombre: 'Daniela Pedraza Veloza',
        metodoPago: 'CARD',
        idPago: await encryptPago(42494)
    },
    {
        identificacion: 1084869583,
        nombre: 'Eduar Motta',
        metodoPago: 'NEQUI',
        idPago: await encryptPago(42499)
    }
]

export const semillaPasajeros = async () => {
    const pasajeros = await pasajeroService.listarPasajeros({})
    if (pasajeros.length !== 0) return
    await Promise.all([infoPasajeros.forEach(async (pasajero) => await pasajeroService.crearPasajero(pasajero))])
}
