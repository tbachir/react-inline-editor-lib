import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { designTokens } from '../../design/DesignTokens';

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
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  className = '',
  ...props
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: designTokens.spacing.sm,
    fontFamily: designTokens.typography.fontFamily.sans.join(', '),
    fontWeight: designTokens.typography.fontWeight.medium,
    borderRadius: designTokens.borderRadius.md,
    border: 'none',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: `all ${designTokens.animation.duration.fast} ${designTokens.animation.easing.ease}`,
    outline: 'none',
    position: 'relative' as const,
    overflow: 'hidden' as const,
  };

  const variants = {
    primary: {
      backgroundColor: designTokens.colors.primary[500],
      color: 'white',
      boxShadow: designTokens.shadows.sm,
    },
    secondary: {
      backgroundColor: designTokens.colors.neutral[100],
      color: designTokens.colors.neutral[700],
      border: `1px solid ${designTokens.colors.neutral[200]}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: designTokens.colors.neutral[600],
    },
    danger: {
      backgroundColor: designTokens.colors.error[500],
      color: 'white',
      boxShadow: designTokens.shadows.sm,
    },
  };

  const sizes = {
    sm: {
      padding: `${designTokens.spacing.xs} ${designTokens.spacing.sm}`,
      fontSize: designTokens.typography.fontSize.sm[0],
      lineHeight: designTokens.typography.fontSize.sm[1].lineHeight,
    },
    md: {
      padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
      fontSize: designTokens.typography.fontSize.base[0],
      lineHeight: designTokens.typography.fontSize.base[1].lineHeight,
    },
    lg: {
      padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
      fontSize: designTokens.typography.fontSize.lg[0],
      lineHeight: designTokens.typography.fontSize.lg[1].lineHeight,
    },
  };

  const hoverVariants = {
    primary: { backgroundColor: designTokens.colors.primary[600] },
    secondary: { backgroundColor: designTokens.colors.neutral[50] },
    ghost: { backgroundColor: designTokens.colors.neutral[100] },
    danger: { backgroundColor: designTokens.colors.error[600] },
  };

  return (
    <motion.button
      {...props}
      className={`modern-button ${className}`}
      style={{
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
        opacity: disabled || isLoading ? 0.6 : 1,
      }}
      whileHover={!disabled && !isLoading ? hoverVariants[variant] : undefined}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : undefined}
      disabled={disabled || isLoading}
    >
      {isLoading && (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '1rem',
            height: '1rem',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            borderRadius: '50%',
          }}
        />
      )}
      {!isLoading && leftIcon && leftIcon}
      {!isLoading && children}
      {!isLoading && rightIcon && rightIcon}
    </motion.button>
  );
};