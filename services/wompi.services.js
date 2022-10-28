import axios from '../utils/plugins/axios.js'

const realizarPago = async ({ reference, precioTotal, metodoPago, payment_source_id }) => {
    let cuerpoPago = {
        amount_in_cents: precioTotal * 100,
        currency: 'COP',
        customer_email: 'example@gmail.com',
        reference,
        payment_source_id
    }

    if (metodoPago === 'CARD') {
        cuerpoPago.payment_method = {
            installments: 1
        }
    }
    const { data } = await axios.post('/transactions', cuerpoPago)

    return data.data
}

const consultarPago = async (id) => {
    const { data } = await axios.get(`/transactions/${id}`)
    return data.data
}

export { realizarPago, consultarPago }
