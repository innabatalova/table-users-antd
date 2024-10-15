import { createSlice } from '@reduxjs/toolkit'

interface ErrorState {
  errorState: boolean
}

const initialState = { errorState: false } as ErrorState

const errorSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    disabledButton(state) {
      state.errorState = true
    },
    unDisabledButton(state) {
      state.errorState = false
    }
  },
})

export const { disabledButton, unDisabledButton } = errorSlice.actions
export default errorSlice.reducer