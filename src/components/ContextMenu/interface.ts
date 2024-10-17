import { User } from '../../interface'

export interface IContextMenuProps {
    open: boolean,
    pos: { x: number; y: number },
    rowData: User | null,
    getDeleteUser: (data: User | null) => void
}