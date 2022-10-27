import ConductorSchema from '../schemas/conductor.js'

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

export default { crearConductor, editarConductor, buscarConductor, listarConductores }
