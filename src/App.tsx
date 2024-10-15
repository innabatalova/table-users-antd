import { FC, ReactElement, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Table, notification } from 'antd'
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

type NotificationType = 'info' | 'success' | 'error'

const App: FC = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>()
  const { status, users, error } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])


  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (type: NotificationType, error?: {}) => {
    switch (type) {
      case 'info':
        api[type]({
          key: type,
          message: 'Получение списка пользователей',
          description:
            'Получаем данные...',
        })
        break
      case 'error':
        api[type]({
          key: type,
          message: 'Ошибка получения данных',
          description: `${error}`
        })
        break
      case 'success':
        setTimeout(() => {
          api[type]({
            key: type,
            message: 'Получение списка пользователей',
            description:
              'Данные пользователей успешно получены',
          })
        }, 2000)
        break
    }
  }


  return (
    <>
      {contextHolder}
      {status === 'pending' && openNotificationWithIcon('info')}
      {error !== null && openNotificationWithIcon('error', error)}
      {status === 'fulfilled' && [openNotificationWithIcon('success'),
      <Table<User> className={styles.Table} columns={columns} dataSource={users} pagination={false} />]
      }
    </>
  )
}

export default App
