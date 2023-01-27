import * as AvatarPrimitive from '@radix-ui/react-avatar';
import * as React from 'react';

import { cn } from 'libs/ui/src/utils/cn.util';
import '../../../index.css';
import {
  AvatarFallbackProps,
  AvatarImageProps,
  AvatarProps,
} from '../../../types/avatar.type';

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
)) as React.ForwardRefExoticComponent<
  AvatarProps & React.RefAttributes<HTMLSpanElement>
>;
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn('aspect-square h-full w-full', className)}
    {...props}
  />
)) as React.ForwardRefExoticComponent<
  AvatarImageProps & React.RefAttributes<HTMLImageElement>
>;
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      'flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-700',
      className
    )}
    {...props}
  />
)) as React.ForwardRefExoticComponent<
  AvatarFallbackProps & React.RefAttributes<HTMLSpanElement>
>;
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
