import type { NotificationInstance } from 'antd/lib/notification/interface'
import { User } from '../interface'
import { NotificationType } from '../types'

const Notification = (
  api: NotificationInstance,
  type: NotificationType,
  error?: unknown,
  dataDeleteUser?: User | null,
  flagSuccessNot?: (flag: boolean) => void
): void => {
  switch (type) {
    case 'success':
      setTimeout(() => {
        api[type]({
          key: type,
          message: 'Получение списка пользователей',
          description:
            'Данные пользователей успешно получены',
        })
        if (flagSuccessNot) {
          flagSuccessNot(true)
        }
      }, 2000)
      break
    case 'error':
      api[type]({
        key: type,
        message: 'Ошибка получения данных',
        description: `${error}`
      })
      break
    case 'info':
      api[type]({
        key: `${dataDeleteUser?.id ?? 'delete'}`,
        message: 'Удаление пользователя',
        description:
          `Пользователь ${dataDeleteUser?.first_name ?? ''} ${dataDeleteUser?.last_name ?? ''} удален`,
      })
      break
  }
}

export default Notification
