import { listarConductores, crearConductor } from '../../../services/conductor.services.js'

const infoConductores = [
    {
        estado: 'DISPONIBLE',
        identificacion: 6451648,
        nombreCompleto: 'Daniel Felipe Sandoval',
        ubitacionActual: '2.933796, -75.280578',
        vehiculo: 'CARRO'
    },
    {
        estado: 'DISPONIBLE',
        identificacion: 9841522,
        nombreCompleto: 'Juan Edison Giraldo',
        ubitacionActual: '2.939153, -75.292852',
        vehiculo: 'MOTO'
    },
    {
        estado: 'DISPONIBLE',
        identificacion: 1894152,
        nombreCompleto: 'Andres Felipe Peña',
        ubitacionActual: '2.937482, -75.265901',
        vehiculo: 'BICICLETA'
    }
]

export const semillaConductores = async () => {
    const conductores = await listarConductores({})
    if (conductores.length !== 0) return
    await Promise.all([infoConductores.forEach(async (conductor) => await crearConductor(conductor))])
}