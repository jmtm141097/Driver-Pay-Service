import calcularDistanciaEntreDosCoordenadas from './distanciaEntreDosCoordenadas.helpers.js'

export default ({ conductores, ubicacionUsuario }) => {
    const [latUsuario, LngUsuario] = ubicacionUsuario.split(',')
    return conductores.reduce(
        (acc, conductor) => {
            const [latConductor, lngConductor] = conductor.ubicacionActual.split(',')
            const distanciaConductorUsuario = calcularDistanciaEntreDosCoordenadas(
                latUsuario,
                LngUsuario,
                latConductor,
                lngConductor
            )

            if (distanciaConductorUsuario < acc.distanciaConductorUsuario) {
                acc = {
                    identificacion: conductor.identificacion,
                    nombreConductor: conductor.nombreCompleto,
                    ubicacionActual: conductor.ubitacionActual,
                    distanciaConductorUsuario: Math.round((distanciaConductorUsuario + Number.EPSILON) * 100) / 100
                }
            }
            return acc
        },
        {
            identificacion: '',
            nombreConductor: '',
            ubicacionActual: '',
            distanciaConductorUsuario: 999999999999999
        }
    )
}
