import { FC, ReactElement, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Table, notification, Input, Space, Button } from 'antd'
import type { TableColumnsType, InputRef, TableColumnType } from 'antd'
import type { FilterDropdownProps } from 'antd/es/table/interface'
import { SearchOutlined } from '@ant-design/icons'

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

type DataIndex = keyof User

type NotificationType = 'info' | 'success' | 'error'

const App: FC = (): ReactElement => {
  const dispatch = useDispatch<AppDispatch>()
  const { status, users, error } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])


  const [api, contextHolder] = notification.useNotification()

  const openNotificationWithIcon = (type: NotificationType, error?: {}): void => {
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


  const searchInput = useRef<InputRef>(null)

  const handleSearch = (confirm: FilterDropdownProps['confirm']) => {
    confirm()
  }

  const handleReset = (clearFilters: () => void) => {
    clearFilters()
  }

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<User> => (
    { filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(confirm)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase())
  })

  const columns: TableColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id - b.id,
      ...getColumnSearchProps('id')
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.length - b.email.length,
      ...getColumnSearchProps('email')
    },
    {
      title: 'First name',
      dataIndex: 'first_name',
      key: 'first_name',
      sorter: (a, b) => a.first_name.length - b.first_name.length,
      ...getColumnSearchProps('first_name')
    },
    {
      title: 'Last name',
      dataIndex: 'last_name',
      key: 'last_name',
      sorter: (a, b) => a.last_name.length - b.last_name.length,
      ...getColumnSearchProps('last_name')
    }
  ]


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
