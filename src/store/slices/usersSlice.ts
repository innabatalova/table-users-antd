import { createSlice, createAsyncThunk, ActionReducerMapBuilder, PayloadAction } from '@reduxjs/toolkit'
import handlerUsersApi from '../../api/usersApi'

import axios, { AxiosError, type AxiosPromise } from 'axios'

interface userData {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}

interface usersData {
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  data: userData[],
  support: {
    url: string,
    text: string
  }
}

interface IInitialState {
  status: 'pending' | 'fulfilled' | 'rejected' | null,
  users: userData[],
  error: unknown | null
}

const initialState: IInitialState = {
  status: null,
  users: [],
  error: null
}

const axiosUsersDataFirstPage = (): AxiosPromise =>
  axios.get<usersData>(handlerUsersApi + '1')

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
          axiosUsersDataAllPage.push(axios.get<usersData>(handlerUsersApi + i))
        }
        const responseAllPage = await Promise.all(axiosUsersDataAllPage)
        let responseAll: usersData[] = []
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
    builder.addCase(fetchUsers.fulfilled, (state: typeof initialState, action: PayloadAction<userData[]>) => {
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


