'use client'

import { useCallback, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { login, logout } from "../../store/authSlice.js"
import api from "../lib/axios.js"
import { useRouter } from "next/navigation"

export const UserLoader = () => {
    const dispatch = useDispatch()
    const router = useRouter()

    const fetchRefreshToken = useCallback(async () => {
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

    }, [dispatch])

    useEffect(() => {
        fetchRefreshToken()
    }, [fetchRefreshToken])
}

