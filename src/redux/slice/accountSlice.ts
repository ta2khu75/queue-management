import { db } from '@/config/FirebaseConfig'
import BaseService from '@/service/BaseService'
import { FetchStatus } from '@/type/FetchStatus'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { collection } from 'firebase/firestore'

interface AccountState {
    accounts: Account[],
    fetchStatus: FetchStatus
}

const initialState = { accounts: [], fetchStatus: FetchStatus.IDLE } satisfies AccountState as AccountState

const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        set(state, action: PayloadAction<Account[]>) {
            state.accounts = action.payload
        },
        reset(state) {
            state.accounts = []
        },
        add(state, action: PayloadAction<Account>) {
            state.accounts.push(action.payload)
        },
        update(state, action: PayloadAction<Account>) {
            const index = state.accounts.findIndex(account => account.id === action.payload.id);
            if (index !== -1) {
                state.accounts[index] = action.payload;
            }
        },
        delete(state, action: PayloadAction<string>) {
            const index = state.accounts.findIndex(account => account.id === action.payload);
            if (index !== -1) {
                state.accounts.splice(index, 1);
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchReadAll.pending, (state) => {
            state.fetchStatus = FetchStatus.PENDING
        }).addCase(fetchReadAll.fulfilled, (state, action) => {
            state.fetchStatus = FetchStatus.FULFILLED
            state.accounts = action.payload
        }).addCase(fetchReadAll.rejected, (state, action) => {
            state.fetchStatus = FetchStatus.REJECTED
            console.error("Error fetching read accounts:", action.error)
        })
            //create
            .addCase(fetchCreate.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchCreate.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                state.accounts.push(action.payload)
            }).addCase(fetchCreate.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching create account")
            })
            //update
            .addCase(fetchUpdate.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchUpdate.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                const index = state.accounts.findIndex(account => account.id === action.payload.id);
                if (index !== -1) {
                    state.accounts[index] = action.payload;
                }
            }).addCase(fetchUpdate.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching update account")
            })
            //delete
            .addCase(fetchDelete.pending, (state) => {
                state.fetchStatus = FetchStatus.PENDING
            }).addCase(fetchDelete.rejected, (state) => {
                state.fetchStatus = FetchStatus.REJECTED
                console.error("Error fetching delete account")
            }).addCase(fetchDelete.fulfilled, (state, action) => {
                state.fetchStatus = FetchStatus.FULFILLED
                const index = state.accounts.findIndex(account => account.id === action.payload);
                if (index !== -1) {
                    state.accounts.splice(index, 1);
                }
            })
    }
})
const collectionRef = collection(db, "accounts")
const fetchReadAll = createAsyncThunk("accounts/fetchReadAll", () => {
    return BaseService.readAll(collectionRef).then(data => data).catch(error => { throw error })
})
const fetchCreate = createAsyncThunk("accounts/fetchCreate", (account: Account) => {
    return BaseService.create(collectionRef, account).then(data => data).catch(error => { throw error })
})
const fetchUpdate = createAsyncThunk("accounts/fetchUpdate", (accountWithId: { id: string, account: Account }) => {
    return BaseService.update(collectionRef, accountWithId.id, accountWithId.account).then(() => ({ ...accountWithId.account, id: accountWithId.id })).catch(error => { throw error })
})
const fetchDelete = createAsyncThunk("accounts/fetchDelete", (id: string) => {
    return BaseService.delete(collectionRef, id).then(() => id).catch(error => { throw error })
})

export const accountAction = { ...accountsSlice.actions, fetchReadAll, fetchCreate, fetchUpdate, fetchDelete }
export const accountReducer = accountsSlice.reducer