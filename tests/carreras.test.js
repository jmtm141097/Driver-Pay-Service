import request from 'supertest'
import app from '../app'
import server from '../index.js'

import ConductorModel from '../schemas/conductor.js'
import PasajeroModel from '../schemas/pasajero.js'
import CarreraModel from '../schemas/carrera.js'

import { infoPasajeros } from '../utils/databases/seed/pasajeros'
import { infoConductores } from '../utils/databases/seed/conductores'

const API = request(app)
const URL = '/api/v1/carreras'

const DATA_PASAJEROS = [
    {
        identificacion: 6123458,
        nombre: 'Autobots',
        metodoPago: 'NEQUI',
        idPago: 42499
    }
]

beforeAll(async () => {
    await Promise.all([ConductorModel.deleteMany({}), PasajeroModel.deleteMany({}), CarreraModel.deleteMany({})])
    await Promise.all([PasajeroModel.insertMany(DATA_PASAJEROS)])
})

describe('POST /carreras solicitando conductores', () => {
    const campos = [
        {
            identificacion: 1084869583,
            ubicacionInicial: '2.937043, -75.296442'
        },
        {
            identificacion: 165523148,
            ubicacionInicial: '2.937043, -75.296442',
            vehiculo: 'CARRO'
        },
        {
            identificacion: 164121645,
            ubicacionInicial: '2.937043, -75.296442',
            vehiculo: 'BICICLETA'
        }
    ]

    test('Deberia responder conductor asignado y un status 200', async () => {
        for (const body of campos) {
            const response = await API.post(`${URL}/solicitar-conductor`).send(body)
            expect(response.statusCode).toBe(200)
            expect(response.body.mensaje).toBe('Conductor asignado correctamente')
        }
    })

    test('Deberia responder con un status 400 porque ya solicitaron conductor', async () => {
        for (const body of campos) {
            const response = await API.post(`${URL}/solicitar-conductor`).send(body)
            expect(response.statusCode).toBe(400)
            expect(response.body.mensaje).toBe('Ya solicitaste un conductor, esperalo por favor')
        }
    })

    test('Deberia responder que ya no hay conductores disponibles y un status 404', async () => {
        const response = await API.post(`${URL}/solicitar-conductor`).send({
            identificacion: 6123458,
            ubicacionInicial: '2.937043, -75.296442'
        })
        expect(response.statusCode).toBe(404)
        expect(response.body.mensaje).toBe('No hay conductores disponibles')
    })

    test('Deberia responder que no existe un usuario con esa identificacion y status 400', async () => {
        const response = await API.post(`${URL}/solicitar-conductor`).send({
            identificacion: 846153248,
            ubicacionInicial: '2.937043, -75.296442'
        })
        expect(response.statusCode).toBe(400)
        expect(response.body.errors[0].msg).toBe('No existe un usuario registrado con esa identificacion')
    })

    const camposValidaciones = [
        {},
        { ubicacionInicial: '2.937043, -75.296442' },
        {
            identificacion: 6123458
        },
        { identificacion: 6123458, ubicacionInicial: '8495615, 98465189' }
    ]

    test('Deberia responder con status 400 porque faltan campos o no estan en el formato esperado', async () => {
        for (const campos of camposValidaciones) {
            const response = await API.post(`${URL}/solicitar-conductor`).send(campos)
            expect(response.statusCode).toBe(400)
        }
    })
})

describe('POST /carreras finalizando carreras', () => {
    test('Deberia responder carrera finalizada y status 200', async () => {
        const response = await API.post(`${URL}/finalizar-carrera`).send({
            identificacion: '9841522',
            estado: 'TERMINADA',
            ubicacionFinal: '2.942058, -75.250694'
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.mensaje).toBe('Carrera finalizada')
        expect(response.body.carrera.kmRecorridos).toBe('5.11 KM')
    })

    test('Deberia responder que no tiene carrera en curso y status 400', async () => {
        const response = await API.post(`${URL}/finalizar-carrera`).send({
            identificacion: '9841522',
            estado: 'TERMINADA',
            ubicacionFinal: '2.942058, -75.250694'
        })
        expect(response.statusCode).toBe(400)
        expect(response.body.mensaje).toBe('No tienes una carrera en curso')
    })

    test('Deberia responder que la carrera fue cancelada y un status 200', async () => {
        const response = await API.post(`${URL}/finalizar-carrera`).send({
            identificacion: '1894152',
            estado: 'CANCELADA',
            ubicacionFinal: '2.942058, -75.250694'
        })
        expect(response.statusCode).toBe(200)
        expect(response.body.mensaje).toBe('La carrera ha sido cancelada')
    })

    const camposValidaciones = [
        {},
        { identificacion: '1894152' },
        { estado: 'AJSDJFKLASKD' },
        { ubicacionFinal: '1234123412, GASDFAAJHSDF' }
    ]

    test('Deberia responder todas las peticiones con un status 400, porque faltan campos y no estan en el formato esperado', async () => {
        for (const body of camposValidaciones) {
            const response = await API.post(`${URL}/finalizar-carrera`).send(body)
            expect(response.statusCode).toBe(400)
        }
    })
})

afterAll(async () => {
    await Promise.all([ConductorModel.deleteMany({}), PasajeroModel.deleteMany({}), CarreraModel.deleteMany({})])
    await Promise.all([PasajeroModel.insertMany(infoPasajeros), ConductorModel.insertMany(infoConductores)])
    server.close()
})
