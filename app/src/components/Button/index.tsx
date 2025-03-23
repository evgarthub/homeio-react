import * as React from 'react';
import './styles.scss';

export enum ButtonType {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    OUTLINE = 'outline'
}

interface ButtonProps {
    children?: React.ReactNode | string;
    className?: string;
    icon?: React.ReactNode;
    isCircle?: boolean;
    isDisabled?: boolean;
    prefix?: React.ReactNode;
    sufix?: React.ReactNode;
    type?: ButtonType;
    title?: string;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = (props: ButtonProps) => {
    const { type, isCircle, children, title, isDisabled, icon, prefix, sufix, className, onClick } = props;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => onClick && onClick(e);

    return (
        <button 
            className={`button ${type ? `button--${type}` : 'button--primary'} ${isCircle && 'button--circle'} ${className}`}
            disabled={isDisabled}
            title={title}
            onClick={handleClick}
        >
            {icon}
            {prefix}
            {children}
            {sufix}
        </button>
    );
};
