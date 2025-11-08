'use client'

import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../../store/authSlice.js"
import api from "../lib/axios.js"
import { useRouter } from "next/navigation"

export const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch()
    const accessToken = useSelector(state => state.auth.accessToken)
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    const checkAuth = useCallback(async () => {
        if (!accessToken) {
            try {
                const res = await api.get('/auth/refresh')
                if (res.status === 200 && res.data?.data) {
                    const { accessToken, name, email } = res.data.data
                    dispatch(login({ accessToken, user: { name, email } }))
                } else {
                    dispatch(logout())
                    router.push('/auth/login')
                }
            } catch (err) {
                console.log(err)
                dispatch(logout())
                router.push('/auth/login')
            }
        }

        setLoading(false)

    }, [dispatch, accessToken, router])

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (loading)
        return <div className="text-white text-center">Loading...</div>

    return accessToken ? children : null
}

