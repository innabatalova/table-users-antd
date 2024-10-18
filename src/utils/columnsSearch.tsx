import { Input, Space, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import type { FilterDropdownProps } from 'antd/es/table/interface'
import type { TableColumnType } from 'antd'
import { User } from '../interface'
import { DataIndex } from '../types'

const handleSearch = (confirm: FilterDropdownProps['confirm']): void => {
  confirm()
}
const handleReset = (clearFilters: () => void) => {
  clearFilters()
}

export const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<User> => (
  {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
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