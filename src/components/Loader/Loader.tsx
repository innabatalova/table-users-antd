import { FC, ReactElement } from 'react'

import { Skeleton, Card, Typography } from 'antd'

import style from './Loader.module.scss'

const Loader: FC = (): ReactElement => {
    const { Title } = Typography

    return (
        <Card className={style.Loader} >
            <Title level={2}>Загрузка</Title>
            <br />
            <Skeleton active/>
        </Card>
    )
}

export default Loader
