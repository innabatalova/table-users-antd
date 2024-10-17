import { FC, ReactElement } from 'react'
import { useDispatch } from 'react-redux'

import type { MenuProps } from 'antd'
import { Dropdown } from 'antd'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'

import axios, { AxiosError } from 'axios'

import handlerDeleteUserApi from '../../api/deleteUserApi'
import { deleteUserStore } from '../../store/slices/usersSlice'

import { IContextMenuProps } from './interface'


const ContextMenu: FC<IContextMenuProps> = ({ open, pos, rowData, getDeleteUser }): ReactElement => {
  const dispatch = useDispatch()

  const items: MenuProps["items"] = [
    {
      key: "menu",
      type: "group",
      children: [
        {
          key: 'change',
          label: 'Редактировать',
          icon: <EditOutlined style={{ color: "#1677ff" }} />
        },
        {
          key: 'delete',
          label: 'Удалить',
          icon: <DeleteOutlined style={{ color: "#f5222d" }} />,
          onClick: () => {
            if (rowData !== null) {
              deleteUser(rowData.id)
            }
          }
        }
      ]
    }
  ]

  const deleteUser = async (id: number | null) => {
    try {
      const response = await axios.delete(handlerDeleteUserApi + id)

      if (response.status !== 204) {
        throw new Error('Server error!')
      }

      getDeleteUser(rowData)
      dispatch(deleteUserStore(id))

    } catch (error: unknown) {
      const err = error as AxiosError
      return err
    }
  }

  return (
    <>
      <Dropdown
        key='dropdown'
        menu={{ items }}
        open={open}
        overlayStyle={{ left: `${pos.x}px`, top: `${pos.y}px` }}
      >
        <></>
      </Dropdown >
    </>
  )
}

export default ContextMenu
