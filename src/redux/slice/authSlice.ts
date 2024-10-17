import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
    auth: boolean;
    account?: Account
}

const initialState = { auth: false } satisfies AuthState as AuthState

const authSlice = createSlice({
    name: 'auther',
    initialState,
    reducers: {
        set(state, action: PayloadAction<Account>) {
            state.auth = true
            state.account = action.payload
        },
        reset(state) {
            state.auth = false
            state.account = undefined
        }
    },
})

export const authAction = authSlice.actions
export const authReducer = authSlice.reducer