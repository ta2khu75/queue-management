import { db } from '@/config/FirebaseConfig'
import BaseService from '@/service/BaseService'
import { FetchStatus } from '@/type/FetchStatus'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { collection } from 'firebase/firestore'

interface RoleState {
    roles: Role[],
    fetchStatus: FetchStatus
}

const initialState = { roles: [], fetchStatus: FetchStatus.IDLE } satisfies RoleState as RoleState

const rolesSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {
        set(state, action: PayloadAction<Role[]>) {
            state.roles = action.payload
        },
        reset(state) {
            state.roles = []
        },
        add(state, action: PayloadAction<Role>) {
            state.roles.push(action.payload)
        },
        update(state, action: PayloadAction<Role>) {
            const index = state.roles.findIndex(role => role.id === action.payload.id);
            if (index !== -1) {
                state.roles[index] = action.payload;
            }
        },
        delete(state, action: PayloadAction<string>) {
            const index = state.roles.findIndex(role => role.id === action.payload);
            if (index !== -1) {
                state.roles.splice(index, 1);
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchReadAll.pending, (state) => {
            state.fetchStatus = FetchStatus.PENDING
        }).addCase(fetchReadAll.fulfilled, (state, action) => {
            state.fetchStatus = FetchStatus.FULFILLED
            state.roles = action.payload
        }).addCase(fetchReadAll.rejected, (state, action) => {
            state.fetchStatus = FetchStatus.REJECTED
            console.error("Error fetching read roles:", action.error)
        })
            //create
            .addCase(fetchCreate.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchCreate.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                state.roles.push(action.payload)
            }).addCase(fetchCreate.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching create role")
            })
            //update
            .addCase(fetchUpdate.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchUpdate.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                const index = state.roles.findIndex(role => role.id === action.payload.id);
                if (index !== -1) {
                    state.roles[index] = action.payload;
                }
            }).addCase(fetchUpdate.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching update role")
            })
            //delete
            .addCase(fetchDelete.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchDelete.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching delete role")
            }).addCase(fetchDelete.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                const index = state.roles.findIndex(role => role.id === action.payload);
                if (index !== -1) {
                    state.roles.splice(index, 1);
                }
            })
    }
})
const collectionRef = collection(db, "roles")
const fetchReadAll = createAsyncThunk("roles/fetchReadAll", () => {
    return BaseService.readAll(collectionRef).then(data => data).catch(error => { throw error })
})
const fetchCreate = createAsyncThunk("roles/fetchCreate", (role: Role) => {
    return BaseService.create(collectionRef, { ...role, description: role.description ? role.description : "" }).then(data => data).catch(error => { throw error })
})
const fetchUpdate = createAsyncThunk("roles/fetchUpdate", (roleWithId: { id: string, role: Role }) => {
    return BaseService.update(collectionRef, roleWithId.id, roleWithId.role).then(() => ({ ...roleWithId.role, id: roleWithId.id })).catch(error => { throw error })
})
const fetchDelete = createAsyncThunk("roles/fetchDelete", (id: string) => {
    return BaseService.delete(collectionRef, id).then(() => id).catch(error => { throw error })
})

export const roleAction = { ...rolesSlice.actions, fetchReadAll, fetchCreate, fetchUpdate, fetchDelete }
export const roleReducer = rolesSlice.reducer