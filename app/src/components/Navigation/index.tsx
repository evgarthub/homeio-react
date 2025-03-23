import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

interface NavigationProps {
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: React.ReactNode;
    onComplete?: (title: string) => void;
}

export const Navigation = (props: NavigationProps) => {
    const { items } = props;

    

    return (
        <section className='nav'>
            <div className='nav__container'>
                {items.map((item: NavItem, i: number) => {
                    const handleClick = () => {
                        if (item.onComplete) item.onComplete(item.title);
                    }

                    return (
                        <NavLink className='nav__item' exact={true} key={i} to={item.url} activeClassName='nav__item--active' onClick={handleClick}>
                            <div className='nav__icon'>{item.icon}</div>
                            <div className='nav__title'>{item.title}</div>
                        </NavLink>
                    );
                })}
            </div>
        </section>
    );
};