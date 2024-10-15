import { FC, ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Table } from 'antd'
import type { TableColumnsType } from 'antd'

import type { RootState, AppDispatch } from './store/store'
import { fetchUsers } from './store/slices/usersSlice'

import styles from './App.module.scss'

interface User {
  id: number,
  email: string,
  first_name: string,
  last_name: string,
  avatar: string
}

const columns: TableColumnsType<User> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'First name',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: 'Last name',
    dataIndex: 'last_name',
    key: 'last_name',
  }
]

const App: FC = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>()
  const { status, users, error } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  console.log(users)

  return (
    <>
      {status === 'pending' && <div>Загрузка...</div>}
      {error !== null ? <div>Произошла ошибка загрузки данных</div> : <></>}
      <Table<User> className={styles.Table} columns={columns} dataSource={users} pagination={false} />
    </>
  )
}

export default App
