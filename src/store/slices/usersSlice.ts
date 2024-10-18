import { createSlice, createAsyncThunk, ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit'
import axios, { AxiosError, type AxiosPromise } from 'axios'

import { User } from '../../interface'
import { IUsersData, IInitialState } from './interface'

import handlerUsersApi from '../../api/usersApi'

const initialState: IInitialState = {
  status: null,
  users: [],
  error: null
}

const axiosUsersDataFirstPage = (): AxiosPromise =>
  axios.get<IUsersData>(handlerUsersApi + '1')

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async function (_, { rejectWithValue }) {
    try {
      const response = await axiosUsersDataFirstPage()

      if (response.status !== 200) {
        throw new Error('Server error!')
      }

      if (response.data.total_pages > 1) {
        const axiosUsersDataAllPage: AxiosPromise[] = []
        for (let i = 1; i <= response.data.total_pages; i++) {
          axiosUsersDataAllPage.push(axios.get<IUsersData>(handlerUsersApi + i))
        }
        const responseAllPage = await Promise.all(axiosUsersDataAllPage)
        let responseAll: IUsersData[] = []
        response.data = responseAll.concat(...responseAllPage.map(item => item.data.data))
      }

      return response.data
    } catch (error: unknown) {

      const err = error as AxiosError
      return rejectWithValue(err.message)
    }
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUserStore(state: typeof initialState, action: PayloadAction<number | null>) {
      state.users = state.users.filter(item => item.id !== action.payload)
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<IInitialState>) => {
    builder.addCase(fetchUsers.pending, (state: typeof initialState) => {
      state.status = 'pending'
      state.error = null
    })
    builder.addCase(fetchUsers.fulfilled, (state: typeof initialState, action: PayloadAction<User[]>) => {
      state.status = 'fulfilled'
      state.users = action.payload
    })
    builder.addCase(fetchUsers.rejected, (state: typeof initialState, action: PayloadAction<unknown>) => {
      state.status = 'rejected'
      state.error = action.payload
    })
  },
})

export const { deleteUserStore } = usersSlice.actions
export default usersSlice.reducer


