import { ComponentPropsWithoutRef, Primitives } from './primitive.type';

type CheckedState = boolean | 'indeterminate';
type PrimitiveButtonProps = ComponentPropsWithoutRef<Primitives['button']>;

export interface CheckboxProps
  extends Omit<PrimitiveButtonProps, 'checked' | 'defaultChecked'> {
  checked?: CheckedState;
  defaultChecked?: CheckedState;
  required?: boolean;
  onCheckedChange?(checked: CheckedState): void;
}
