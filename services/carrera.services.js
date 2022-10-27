import CarreraSchema from '../schemas/carrera.js'

const crearCarrera = async (infoCarrera) => {
    try {
        const carrera = new CarreraSchema(infoCarrera)
        return await carrera.save()
    } catch (error) {
        return null
    }
}

const editarCarrera = async (infoCarrera) => {
    try {
        return await CarreraSchema.findByIdAndUpdate(infoCarrera._id, infoCarrera)
    } catch (error) {
        return null
    }
}

const buscarCarrera = async (query) => {
    try {
        return await CarreraSchema.findOne(query)
    } catch (error) {
        return null
    }
}

const listarCarreras = async (query) => {
    try {
        return await CarreraSchema.find(query)
    } catch (error) {
        return null
    }
}

export { crearCarrera, editarCarrera, buscarCarrera, listarCarreras }
