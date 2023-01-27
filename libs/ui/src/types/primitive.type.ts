declare const NODES: readonly [
  'a',
  'button',
  'div',
  'h2',
  'h3',
  'img',
  'label',
  'li',
  'nav',
  'ol',
  'p',
  'span',
  'svg',
  'ul'
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PropsWithoutRef<P> = P extends any
  ? 'ref' extends keyof P
    ? Pick<P, Exclude<keyof P, 'ref'>>
    : P
  : P;

export type ComponentPropsWithoutRef<T extends React.ElementType> =
  PropsWithoutRef<React.ComponentProps<T>>;

export type PrimitivePropsWithRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E> & {
    asChild?: boolean;
  };

type PrimitiveForwardRefComponent<E extends React.ElementType> =
  React.ForwardRefExoticComponent<PrimitivePropsWithRef<E>>;

export type Primitives = {
  [E in (typeof NODES)[number]]: PrimitiveForwardRefComponent<E>;
};
