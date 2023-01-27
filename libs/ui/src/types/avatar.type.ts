import { ComponentPropsWithoutRef, Primitives } from './primitive.type';

type ImageLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';
type PrimitiveSpanProps = ComponentPropsWithoutRef<Primitives['span']>;
type PrimitiveImageProps = ComponentPropsWithoutRef<Primitives['img']>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AvatarProps extends PrimitiveSpanProps {}

export interface AvatarImageProps extends PrimitiveImageProps {
  onLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}

export interface AvatarFallbackProps extends PrimitiveSpanProps {
  delayMs?: number;
}
