import { FC, ReactElement } from 'react'

import { Table } from 'antd'
import type { TableColumnsType } from 'antd'

import styles from './App.module.scss'

interface User {
  key: number,
  name: string,
  age: number,
  address: string
}

const columns: TableColumnsType<User> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
];

const data: User[] = [
  {
    key: 1,
    name: 'Mike',
    age: 32,
    address: '10 Downing Street',
  },
  {
    key: 2,
    name: 'John',
    age: 42,
    address: '10 Downing Street',
  },
];

const App: FC = (): ReactElement => {
  return (
    <Table<User> className={styles.Table} columns={columns} dataSource={data} />
  )
}

export default App
