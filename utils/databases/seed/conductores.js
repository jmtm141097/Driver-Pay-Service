import conductorService from '../../../services/conductor.services.js'
import conductorModel from '../../../schemas/conductor.js'

export const infoConductores = [
    {
        estado: 'DISPONIBLE',
        identificacion: 6451648,
        nombreCompleto: 'Daniel Felipe Sandoval',
        ubicacionActual: '2.933796, -75.280578',
        vehiculo: 'CARRO'
    },
    {
        estado: 'DISPONIBLE',
        identificacion: 9841522,
        nombreCompleto: 'Juan Edison Giraldo',
        ubicacionActual: '2.939153, -75.292852',
        vehiculo: 'MOTO'
    },
    {
        estado: 'DISPONIBLE',
        identificacion: 1894152,
        nombreCompleto: 'Andres Felipe Peña',
        ubicacionActual: '2.937482, -75.265901',
        vehiculo: 'BICICLETA'
    }
]

export const semillaConductores = async () => {
    const conductores = await conductorService.listarConductores({})
    if (conductores.length !== 0) return
    await conductorModel.insertMany(infoConductores)
}
