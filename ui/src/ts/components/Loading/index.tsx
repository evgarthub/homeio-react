import * as React from 'react';
import { Spin, Icon } from 'antd';
import './styles.scss';

interface LoadingProps {
    title?: string;
}

export const Loading = (props: LoadingProps) => {
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    return (
        <div className='loading'>
            <div className='loading__container'>
                <div className='loading__indicator'><Spin indicator={antIcon} /></div>
                {props.title && <div className='loading__title'>{props.title}</div>}
            </div>
        </div>
    )
};
