import * as React from 'react';
import './styles.scss';

interface CardProps {
    children: React.ReactNode;
    color?: 'white' | 'red' | 'blue' | 'violet' | 'violet-light' | 'red-light' | 'grey';
    isTransparent?: boolean;
    className?: string;
    title?: string;
}

export const Card = (props: CardProps) => {
    const {
        color = 'white',
        children,
        isTransparent,
        className,
        title,
    } = props;
    
    return (
        <section className={`card card--color-${color} ${isTransparent ? 'card--transparent' : ''} ${className}`} title={title} >
            {children}
        </section>
    );
};