import { FC, ReactElement, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Table, notification, Row, Col } from 'antd'

import type { TableColumnsType } from 'antd'
import type { RootState, AppDispatch } from './store/store'
import { User, IPosProps } from './interface'

import Loader from './components/Loader/Loader'
import ContextMenu from './components/ContextMenu/ContextMenu'

import { fetchUsers } from './store/slices/usersSlice'

import Notification from './utils/notification'
import { getColumnSearchProps } from './utils/columnsSearch'

const App: FC = (): ReactElement => {
  //get data
  const dispatch = useDispatch<AppDispatch>()
  const { status, users, error } = useSelector((state: RootState) => state.users)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  //notification
  const [api, contextHolder] = notification.useNotification()
  const [flagNotification, setFlagNotification] = useState<boolean>(false)

  //context menu
  const [menuVisible, setMenuVisible] = useState<boolean>(false)
  const [position, setPosition] = useState<IPosProps>({ x: 0, y: 0 })
  const [rowData, setRowData] = useState<User | null>(null)

  const getDeleteUser = (dataDeleteUser: User | null): void => {
    Notification(api, 'info', null, dataDeleteUser)
  }

  //columns
  const columns: TableColumnsType<User> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
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
      {error !== null && Notification(api, 'error', error)}
      {status === 'pending' && error == null ? <Loader /> :
        [!flagNotification && Notification(api, 'success', null, null, setFlagNotification),
        <Row>
          <Col span={24}>
            <ContextMenu open={menuVisible} pos={position} rowData={rowData} getDeleteUser={getDeleteUser} />
            <Table<User> rowKey={(user: User) => user.id} key='table' columns={columns}
              dataSource={users} pagination={false}
              onRow={(record) => {
                return {
                  onClick: () => { setMenuVisible(false) },
                  onContextMenu: (event) => {
                    event.preventDefault()
                    setMenuVisible(true)
                    setPosition({ x: event.clientX, y: event.clientY })
                    setRowData(record)
                  }
                }
              }}
            /></Col>
        </Row>
        ]
      }
    </>
  )
}

export default App
