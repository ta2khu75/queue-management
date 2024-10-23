import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './slice/countSlice'
import { authReducer } from './slice/authSlice'
import { roleReducer } from './slice/roleSlice'
import { accountReducer } from './slice/accountSlice'
import { deviceReducer } from './slice/deviceSlice'
import { serviceReducer } from './slice/serviceClice'
import { addressReducer } from './slice/addressSlice'
export const store = configureStore({
    reducer: {
        count: counterReducer,
        auth: authReducer,
        device: deviceReducer,
        role: roleReducer,
        account: accountReducer,
        service: serviceReducer,
        address: addressReducer,
    }
});
export const makeStore = () => {
    return store
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']