export enum Size {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

export enum ColorVariant {
  primary = 'primary',
  secondary = 'secondary',
  error = 'error',
  warning = 'warning',
  info = 'info',
  success = 'success',
}

export type SizeMapping = Record<Size, string>;
export type ColorVariantMapping = Record<ColorVariant, string>;

type ButtonType = 'solid' | 'outlined' | 'text';

export type IconProps = React.ComponentProps<'div'> & {
  size: Size;
};

export type BaseButtonProps = React.ComponentProps<'button'> & {
  testId: string;
  size: Size;
  buttonType: ButtonType;
  variant: ColorVariant;
  rounded: boolean;
};

export type ButtonProps = React.ComponentProps<'button'> & {
  testId?: string;
  size?: Size;
  buttonType?: ButtonType;
  variant?: ColorVariant;
  rounded?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};
