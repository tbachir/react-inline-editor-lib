import React from 'react';
import { HTMLMotionProps } from 'framer-motion';
interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
    variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    children: React.ReactNode;
}
/**
 * Modern button component with consistent styling and animations
 */
export declare const Button: React.FC<ButtonProps>;
export {};
