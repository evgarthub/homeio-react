import * as React from 'react';
import { Hexagon } from 'react-feather';
import './styles.scss';

interface LoadingProps {
    title?: string;
}

export const Loading = (props: LoadingProps) => {
    return (
        <div className='loading'>
            <div className='loading__container'>
                <div className='loading__indicator'><Hexagon size={26} /></div>
                {props.title && <div className='loading__title'>{props.title}</div>}
            </div>
        </div>
    )
};
