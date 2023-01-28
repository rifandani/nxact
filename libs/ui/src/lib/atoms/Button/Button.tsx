import React, { cloneElement } from 'react';

import '../../../index.css';
import {
  BaseButtonProps,
  ButtonProps,
  ColorVariant,
  IconProps,
  Size,
} from '../../../types/button.type';
import { cn } from '../../../utils/cn.util';

const buttonSizeClasses = {
  small: 'py-1.5 text-sm rounded text-red-500',
  medium: 'py-[9px] text-base rounded-md',
  large: 'py-3 text-lg rounded-md',
};
const buttonTypeClasses = {
  solid:
    'text-white disabled:border-gray-100 disabled:text-gray-400 disabled:bg-gray-100',
  outlined:
    'bg-opacity-0 hover:bg-opacity-20 disabled:border-gray-300 disabled:text-gray-300',
  text: 'disabled:text-gray-300 border-transparent bg-transparent',
};
const solidButtonVariantClasses = {
  primary:
    'border-primary bg-primary hover:bg-primary-dark hover:border-primary-dark',
  secondary:
    'border-secondary bg-secondary hover:bg-secondary-dark hover:border-secondary-dark',
  error: 'border-error bg-error hover:bg-error-dark hover:border-error-dark',
  warning:
    'border-warning bg-warning hover:bg-warning-dark hover:border-warning-dark',
  info: 'border-info bg-info hover:bg-info-dark hover:border-info-dark',
  success:
    'border-success bg-success hover:bg-success-dark hover:border-success-dark',
};
const outlinedButtonVariantClasses = {
  primary: 'text-primary border-primary bg-primary',
  secondary: 'text-secondary border-secondary bg-secondary',
  error: 'text-error border-error bg-error',
  warning: 'text-warning border-warning bg-warning',
  info: 'text-info border-info bg-info',
  success: 'text-success border-success bg-success',
};
const textButtonVariantClasses = {
  primary: 'text-primary hover:text-primary-dark',
  secondary: 'text-secondary hover:text-secondary-dark',
  error: 'text-error hover:text-error-dark',
  warning: 'text-warning hover:text-warning-dark',
  info: 'text-info hover:text-info-dark',
  success: 'text-success hover:text-success-dark',
};

function BaseButton({
  testId,
  size,
  buttonType,
  variant,
  rounded,
  className,
  children,
  ...props
}: BaseButtonProps) {
  return (
    <button
      data-testid={testId}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center space-x-3 border border-solid px-4 font-semibold leading-none duration-200',
        'disabled:pointer-events-none disabled:cursor-default',
        buttonSizeClasses[size],
        buttonType === 'solid' && solidButtonVariantClasses[variant],
        buttonType === 'outlined' && outlinedButtonVariantClasses[variant],
        buttonType === 'text' && textButtonVariantClasses[variant],
        buttonTypeClasses[buttonType],
        !rounded && 'rounded-none',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function Icon({ size, children }: IconProps) {
  return (
    <div
      className={cn(
        size === Size.small && 'h-5 w-5',
        size === Size.medium && 'h-6 w-6',
        size === Size.large && 'h-7 w-7'
      )}
    >
      {children}
    </div>
  );
}

export function Button({
  testId = 'nxact-ui-button',
  size = Size.medium,
  buttonType = 'solid',
  variant = ColorVariant.primary,
  rounded = true,
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      testId={testId}
      size={size}
      buttonType={buttonType}
      variant={variant}
      rounded={rounded}
      {...props}
    >
      {!!leftIcon && (
        <Icon size={size}>
          {cloneElement(leftIcon as React.ReactElement, {
            width: '100%',
            height: '100%',
          })}
        </Icon>
      )}

      {children}

      {!!rightIcon && (
        <Icon size={size}>
          {cloneElement(rightIcon as React.ReactElement, {
            width: '100%',
            height: '100%',
          })}
        </Icon>
      )}
    </BaseButton>
  );
}
