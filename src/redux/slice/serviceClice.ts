import { db } from '@/config/FirebaseConfig'
import BaseService from '@/service/BaseService'
import { FetchStatus } from '@/type/FetchStatus'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { collection, orderBy, query } from 'firebase/firestore'
interface ServiceState {
    services: Service[],
    fetchStatus: FetchStatus
}

const initialState = { services: [], fetchStatus: FetchStatus.IDLE } satisfies ServiceState as ServiceState

const servicesSlice = createSlice({
    name: 'services',
    initialState,
    reducers: {
        set(state, action: PayloadAction<Service[]>) {
            state.services = action.payload
        },
        reset(state) {
            state.services = []
        },
        add(state, action: PayloadAction<Service>) {
            state.services.push(action.payload)
        },
        update(state, action: PayloadAction<Service>) {
            const index = state.services.findIndex(service => service.id === action.payload.id);
            if (index !== -1) {
                state.services[index] = action.payload;
            }
        },
        delete(state, action: PayloadAction<string>) {
            const index = state.services.findIndex(service => service.id === action.payload);
            if (index !== -1) {
                state.services.splice(index, 1);
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchReadAll.pending, (state) => {
            state.fetchStatus = FetchStatus.PENDING
        }).addCase(fetchReadAll.fulfilled, (state, action) => {
            state.fetchStatus = FetchStatus.FULFILLED
            state.services = action.payload
        }).addCase(fetchReadAll.rejected, (state, action) => {
            state.fetchStatus = FetchStatus.REJECTED
            console.error("Error fetching read services:", action.error)
        })
            //create
            .addCase(fetchCreate.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchCreate.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                state.services.push(action.payload)
            }).addCase(fetchCreate.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching create service")
            })
            //update
            .addCase(fetchUpdate.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchUpdate.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                const index = state.services.findIndex(service => service.id === action.payload.id);
                if (index !== -1) {
                    state.services[index] = action.payload;
                }
            }).addCase(fetchUpdate.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching update service")
            })
            //delete
            .addCase(fetchDelete.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchDelete.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching delete service")
            }).addCase(fetchDelete.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                const index = state.services.findIndex(service => service.id === action.payload);
                if (index !== -1) {
                    state.services.splice(index, 1);
                }
            })
    }
})
const collectionRef = collection(db, "services")
const fetchReadAll = createAsyncThunk("services/fetchReadAll", () => {
    return BaseService.query<Service>(query(collectionRef, orderBy("service_id", "asc"))).then(data => data).catch(error => { throw error })
})
const fetchCreate = createAsyncThunk("services/fetchCreate", (service: Service) => {
    const description = service.description ? service.description : ""
    return BaseService.create<Service>(collectionRef, { ...service, description }).then(data => data).catch(error => { throw error })
})
const fetchUpdate = createAsyncThunk("services/fetchUpdate", (serviceWithId: { id: string, service: Service }) => {
    const description = serviceWithId.service.description ? serviceWithId.service.description : ""
    return BaseService.update(collectionRef, serviceWithId.id, { ...serviceWithId.service, description }).then(() => ({ ...serviceWithId.service, id: serviceWithId.id })).catch(error => { throw error })
})
const fetchDelete = createAsyncThunk("services/fetchDelete", (id: string) => {
    return BaseService.delete(collectionRef, id).then(() => id).catch(error => { throw error })
})

export const serviceAction = { ...servicesSlice.actions, fetchReadAll, fetchCreate, fetchUpdate, fetchDelete }
export const serviceReducer = servicesSlice.reducer