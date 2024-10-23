import { db } from '@/config/FirebaseConfig'
import BaseService from '@/service/BaseService'
import { FetchStatus } from '@/type/FetchStatus'
import { NumberLevel } from '@/type/NumberLevel'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { collection } from 'firebase/firestore'

interface NumberLevelState {
    numberLevels: NumberLevel[],
    fetchStatus: FetchStatus
}

const initialState = { numberLevels: [], fetchStatus: FetchStatus.IDLE } satisfies NumberLevelState as NumberLevelState

const numberLevelsSlice = createSlice({
    name: 'numberLevels',
    initialState,
    reducers: {
        set(state, action: PayloadAction<NumberLevel[]>) {
            state.numberLevels = action.payload
        },
        reset(state) {
            state.numberLevels = []
        },
        add(state, action: PayloadAction<NumberLevel>) {
            state.numberLevels.push(action.payload)
        },
        update(state, action: PayloadAction<NumberLevel>) {
            const index = state.numberLevels.findIndex(numberLevel => numberLevel.id === action.payload.id);
            if (index !== -1) {
                state.numberLevels[index] = action.payload;
            }
        },
        delete(state, action: PayloadAction<string>) {
            const index = state.numberLevels.findIndex(numberLevel => numberLevel.id === action.payload);
            if (index !== -1) {
                state.numberLevels.splice(index, 1);
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchReadAll.pending, (state) => {
            state.fetchStatus = FetchStatus.PENDING
        }).addCase(fetchReadAll.fulfilled, (state, action) => {
            state.fetchStatus = FetchStatus.FULFILLED
            state.numberLevels = action.payload
        }).addCase(fetchReadAll.rejected, (state, action) => {
            state.fetchStatus = FetchStatus.REJECTED
            console.error("Error fetching read numberLevels:", action.error)
        })
            //create
            .addCase(fetchCreate.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchCreate.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                state.numberLevels.push(action.payload)
            }).addCase(fetchCreate.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching create numberLevel")
            })
            //update
            .addCase(fetchUpdate.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchUpdate.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                const index = state.numberLevels.findIndex(numberLevel => numberLevel.id === action.payload.id);
                if (index !== -1) {
                    state.numberLevels[index] = action.payload;
                }
            }).addCase(fetchUpdate.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching update numberLevel")
            })
            //delete
            .addCase(fetchDelete.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchDelete.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching delete numberLevel")
            }).addCase(fetchDelete.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                const index = state.numberLevels.findIndex(numberLevel => numberLevel.id === action.payload);
                if (index !== -1) {
                    state.numberLevels.splice(index, 1);
                }
            })
    }
})
const collectionRef = collection(db, "number-level")
const fetchReadAll = createAsyncThunk("numberLevels/fetchReadAll", () => {
    return BaseService.readAll<NumberLevel>(collectionRef).then(data => data).catch(error => { throw error })
})
const fetchCreate = createAsyncThunk("numberLevels/fetchCreate", (numberLevel: NumberLevel) => {
    return BaseService.create(collectionRef, numberLevel).then(data => data).catch(error => { throw error })
})
const fetchUpdate = createAsyncThunk("numberLevels/fetchUpdate", (numberLevelWithId: { id: string, numberLevel: NumberLevel }) => {
    return BaseService.update(collectionRef, numberLevelWithId.id, numberLevelWithId.numberLevel).then(() => ({ ...numberLevelWithId.numberLevel, id: numberLevelWithId.id })).catch(error => { throw error })
})
const fetchDelete = createAsyncThunk("numberLevels/fetchDelete", (id: string) => {
    return BaseService.delete(collectionRef, id).then(() => id).catch(error => { throw error })
})

export const numberLevelAction = { ...numberLevelsSlice.actions, fetchReadAll, fetchCreate, fetchUpdate, fetchDelete }
export const numberLevelReducer = numberLevelsSlice.reducer