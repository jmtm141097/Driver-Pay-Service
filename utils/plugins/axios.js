import Axios from 'axios'

export default (() => {
    const axiosConnect = Axios.create({
        baseURL: 'https://sandbox.wompi.co/v1/'
    })

    axiosConnect.interceptors.request.use(
        function (config) {
            config.headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${process.env.KEY_PRV}`
            }
            return config
        },
        function (error) {
            return Promise.reject(error)
        }
    )
    return axiosConnect
})()
