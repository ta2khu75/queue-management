import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AddressState {
    ip: string
}

const initialState = { ip: "" } satisfies AddressState as AddressState
const addressSlice = createSlice({
    name: 'address',
    initialState,
    reducers: {
        set(state, action: PayloadAction<string>) {
            state.ip = action.payload
        },
        reset(state) {
            state.ip = ""
        }
    },
})

export const addressAction = addressSlice.actions
export const addressReducer = addressSlice.reducer