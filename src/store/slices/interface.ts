import { User } from '../../interface'

export interface IUsersData {
    page: number,
    per_page: number,
    total: number,
    total_pages: number,
    data: User[],
    support: {
        url: string,
        text: string
    }
}

export interface IInitialState {
    status: 'pending' | 'fulfilled' | 'rejected' | null,
    users: User[],
    error: unknown | null
}