import * as React from 'react';
import './styles.scss';

interface CardProps {
    children: React.ReactChild[];
    color?: 'white' | 'red' | 'blue' | 'violet' | 'violet-light' | 'red-light' | 'grey';
    isTransparent?: boolean;
}

export const Card = (props: CardProps) => {
    const {
        color = 'white',
        children,
        isTransparent,
    } = props;
    
    return (
        <section className={`card card--color-${color} ${isTransparent ? 'card--transparent' : ''}`} >
            {children}
        </section>
    );
};