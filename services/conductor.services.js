import ConductorSchema from '../schemas/conductor.js'
import pasajeroServices from './pasajero.services.js'
import carreraServices from './carrera.services.js'

import buscarConductorMasCercano from './helpers/conductorMasCercano.helpers.js'

const conductorMasCercano = async ({ idCarrera, identificacionPasajero, ubicacionPasajero, tipoVehiculo }) => {
    const [conductoresDisponibles, pasajero] = await Promise.all([
        listarConductores({ estado: 'DISPONIBLE', vehiculo: tipoVehiculo }),
        pasajeroServices.buscarPasajero({ identificacion: identificacionPasajero })
    ])

    const conductorCercano = buscarConductorMasCercano({
        conductores: conductoresDisponibles,
        ubicacionUsuario: ubicacionPasajero
    })
    conductorCercano.distanciaConductorUsuario = `${conductorCercano.distanciaConductorUsuario} KM`

    if (conductorCercano.identificacion) {
        const infoConductor = conductoresDisponibles.find(
            (conductor) => conductor.identificacion === conductorCercano.identificacion
        )

        await Promise.all([
            carreraServices.crearCarrera({
                idConductor: infoConductor._id,
                idPasajero: pasajero._id,
                idCarrera,
                ubicacionInicial: ubicacionPasajero
            }),
            editarConductor({
                ...infoConductor,
                estado: 'OCUPADO',
                idCarrera
            })
        ])

        return conductorCercano
    }
}

const crearConductor = async (infoConductor) => {
    try {
        const conductor = new ConductorSchema(infoConductor)
        return await conductor.save()
    } catch (error) {
        return null
    }
}

const editarConductor = async (infoConductor) => {
    try {
        return await ConductorSchema.findByIdAndUpdate(infoConductor._id, infoConductor)
    } catch (error) {
        return null
    }
}

const buscarConductor = async (query) => {
    try {
        return await ConductorSchema.findOne(query).lean()
    } catch (error) {
        return null
    }
}

const listarConductores = async (query) => {
    try {
        return await ConductorSchema.find(query).lean()
    } catch (error) {
        return null
    }
}

export default { crearConductor, editarConductor, buscarConductor, listarConductores, conductorMasCercano }
