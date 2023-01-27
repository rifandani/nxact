import { ComponentPropsWithoutRef, Primitives } from './primitive.type';

type PrimitiveDivProps = ComponentPropsWithoutRef<Primitives['div']>;
type PrimitiveButtonProps = ComponentPropsWithoutRef<Primitives['button']>;

export interface CollapsibleProps extends PrimitiveDivProps {
  defaultOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
  onOpenChange?(open: boolean): void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CollapsibleTriggerProps extends PrimitiveButtonProps {}

interface CollapsibleContentImplProps extends PrimitiveDivProps {
  present: boolean;
}

export interface CollapsibleContentProps
  extends Omit<CollapsibleContentImplProps, 'present'> {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true;
}
