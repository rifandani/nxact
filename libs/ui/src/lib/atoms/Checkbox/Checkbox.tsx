import { Indicator, Root } from '@radix-ui/react-checkbox';
import React from 'react';

import { cn } from 'libs/ui/src/utils/cn.util';
import '../../../index.css';
import { Check, Minus } from '../Icon/Icon';

const Checkbox = React.forwardRef<
  React.ElementRef<typeof Root>,
  React.ComponentPropsWithoutRef<typeof Root>
>(({ className, checked, ...props }, ref) => (
  <Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-50 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900',
      className
    )}
    {...props}
  >
    <Indicator className={cn('flex items-center justify-center')}>
      {checked === 'indeterminate' && <Minus className="h-4 w-4" />}
      {checked === true && <Check className="h-4 w-4" />}
    </Indicator>
  </Root>
));

Checkbox.displayName = Root.displayName;

export { Checkbox };
