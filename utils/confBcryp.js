import bcryp from 'bcrypt'

const encryptPago = async (text) => {
    return await bcryp.hash(text.toString(), 10)
}

const compare = async (text, hash) => {
    return await bcryp.compare(text, hash)
}

export { encryptPago, compare }
