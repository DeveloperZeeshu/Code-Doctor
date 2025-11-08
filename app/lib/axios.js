import axios from "axios"

const api = axios.create({
    baseURL: '/api',
    withCredentials: true
})

api.interceptors.response.use(
    res => res,
    async (err) => {
        const originalRequest = err.config
        if (err.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            try {
                await axios.get('/api/auth/refresh', { withCredentials: true })
                return api(originalRequest)
            } catch (refreshErr) {
                console.log('Refresh failed:', refreshErr)
                window.location.href = '/auth/login'
            }
        }
        return Promise.reject(err)
    }
)

export default api
