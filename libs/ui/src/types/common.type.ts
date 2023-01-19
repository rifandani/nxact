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
