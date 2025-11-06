import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: false,
    userData: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        setUser: (state, action) => {

        }
    }
})

export const { setUser } = authSlice.actions
export default authSlice.reducer


