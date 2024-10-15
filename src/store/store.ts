import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './slices/usersSlice'
import errorSlice from './slices/errorSlice'

const store = configureStore({
  reducer: {
    users: usersReducer,
    error: errorSlice
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch