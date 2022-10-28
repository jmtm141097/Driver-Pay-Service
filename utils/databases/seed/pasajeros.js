import pasajeroService from '../../../services/pasajero.services.js'

const infoPasajeros = [
    {
        identificacion: 1084869583,
        nombre: 'Juan Manuel Tamayo Monje',
        metodoPago: 'CARD',
        idPago: 42418
    },
    {
        identificacion: 1084869583,
        nombre: 'Daniela Pedraza Veloza',
        metodoPago: 'CARD',
        idPago: 42494
    },
    {
        identificacion: 1084869583,
        nombre: 'Eduar Motta',
        metodoPago: 'NEQUI',
        idPago: 42499
    }
]

export const semillaPasajeros = async () => {
    const pasajeros = await pasajeroService.listarPasajeros({})
    if (pasajeros.length !== 0) return
    await Promise.all([infoPasajeros.forEach(async (pasajero) => await pasajeroService.crearPasajero(pasajero))])
}
