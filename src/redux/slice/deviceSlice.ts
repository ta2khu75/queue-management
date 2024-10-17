import { db } from '@/config/FirebaseConfig'
import BaseService from '@/service/BaseService'
import { FetchStatus } from '@/type/FetchStatus'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { collection } from 'firebase/firestore'

interface DeviceState {
    devices: Device[],
    fetchStatus: FetchStatus
}

const initialState = { devices: [], fetchStatus: FetchStatus.IDLE } satisfies DeviceState as DeviceState

const devicesSlice = createSlice({
    name: 'devices',
    initialState,
    reducers: {
        set(state, action: PayloadAction<Device[]>) {
            state.devices = action.payload
        },
        reset(state) {
            state.devices = []
        },
        add(state, action: PayloadAction<Device>) {
            state.devices.push(action.payload)
        },
        update(state, action: PayloadAction<Device>) {
            const index = state.devices.findIndex(device => device.id === action.payload.id);
            if (index !== -1) {
                state.devices[index] = action.payload;
            }
        },
        delete(state, action: PayloadAction<string>) {
            const index = state.devices.findIndex(device => device.id === action.payload);
            if (index !== -1) {
                state.devices.splice(index, 1);
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchReadAll.pending, (state) => {
            state.fetchStatus = FetchStatus.PENDING
        }).addCase(fetchReadAll.fulfilled, (state, action) => {
            state.fetchStatus = FetchStatus.FULFILLED
            state.devices = action.payload
        }).addCase(fetchReadAll.rejected, (state, action) => {
            state.fetchStatus = FetchStatus.REJECTED
            console.error("Error fetching read devices:", action.error)
        })
            //create
            .addCase(fetchCreate.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchCreate.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                state.devices.push(action.payload)
            }).addCase(fetchCreate.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching create device")
            })
            //update
            .addCase(fetchUpdate.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchUpdate.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                const index = state.devices.findIndex(device => device.id === action.payload.id);
                if (index !== -1) {
                    state.devices[index] = action.payload;
                }
            }).addCase(fetchUpdate.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching update device")
            })
            //delete
            .addCase(fetchDelete.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchDelete.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching delete device")
            }).addCase(fetchDelete.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                const index = state.devices.findIndex(device => device.id === action.payload);
                if (index !== -1) {
                    state.devices.splice(index, 1);
                }
            })
    }
})
const collectionRef = collection(db, "devices")
const fetchReadAll = createAsyncThunk("devices/fetchReadAll", () => {
    return BaseService.readAll(collectionRef).then(data => data).catch(error => { throw error })
})
const fetchCreate = createAsyncThunk("devices/fetchCreate", (device: Device) => {
    return BaseService.create(collectionRef, device).then(data => data).catch(error => { throw error })
})
const fetchUpdate = createAsyncThunk("devices/fetchUpdate", (deviceWithId: { id: string, device: Device }) => {
    return BaseService.update(collectionRef, deviceWithId.id, deviceWithId.device).then(() => ({ ...deviceWithId.device, id: deviceWithId.id })).catch(error => { throw error })
})
const fetchDelete = createAsyncThunk("devices/fetchDelete", (id: string) => {
    return BaseService.delete(collectionRef, id).then(() => id).catch(error => { throw error })
})

export const deviceAction = { ...devicesSlice.actions, fetchReadAll, fetchCreate, fetchUpdate, fetchDelete }
export const deviceReducer = devicesSlice.reducer