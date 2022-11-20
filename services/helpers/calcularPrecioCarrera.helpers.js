import calcularDistanciaEntreDosCoordenadas from './distanciaEntreDosCoordenadas.helpers.js'

const calcularMinutosTranscurridos = (millis) => {
    let seconds = Math.floor((millis / 1000) % 60),
        minutes = Math.floor((millis / (1000 * 60)) % 60),
        hours = Math.floor((millis / (1000 * 60 * 60)) % 24)

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes
    seconds = seconds < 10 ? '0' + seconds : seconds

    return hours + ':' + minutes + ':' + seconds
}

export default ({ carrera, horaFin, ubicacionFinal }) => {
    const [latInicial, lngInicial] = carrera.ubicacionInicial.split(',')
    const [latFinal, lngFinal] = ubicacionFinal.split(',')
    const kmRecorridos = calcularDistanciaEntreDosCoordenadas(latInicial, lngInicial, latFinal, lngFinal)

    const fechasEnMilisegundos = horaFin - new Date(carrera.horaInicio).getTime()
    const [horas, minutos, _segundos] = calcularMinutosTranscurridos(fechasEnMilisegundos).split(':')

    const precioTotal =
        3500 +
        kmRecorridos * 1000 +
        (parseInt(horas) > 0 ? (parseInt(horas) * 60 + parseInt(minutos)) * 200 : parseInt(minutos) * 200)

    return { precioTotal: Math.round((precioTotal + Number.EPSILON) * 100) / 100, kmRecorridos: Math.round((kmRecorridos + Number.EPSILON) * 100) / 100 }
}
