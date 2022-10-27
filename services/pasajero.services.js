import PasajeroSchema from '../schemas/pasajero.js'

const crearPasajero = async (infoPasajero) => {
    try {
        const pasajero = new PasajeroSchema(infoPasajero)
        return await pasajero.save()
    } catch (error) {
        return null
    }
}

const editarPasajero = async (infoPasajero) => {
    try {
        return await PasajeroSchema.findByIdAndUpdate(infoPasajero._id, infoPasajero)
    } catch (error) {
        return null
    }
}

const buscarPasajero = async (query) => {
    try {
        return await PasajeroSchema.findOne(query)
    } catch (error) {
        return null
    }
}

const listarPasajeros = async (query) => {
    try {
        return await PasajeroSchema.find(query)
    } catch (error) {
        return null
    }
}

export { crearPasajero, editarPasajero, buscarPasajero, listarPasajeros }
