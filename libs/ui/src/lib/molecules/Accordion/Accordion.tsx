import * as AccordionPrimitive from '@radix-ui/react-accordion';
import * as React from 'react';

import {
  AccordionContentProps,
  AccordionItemProps,
  AccordionMultipleProps,
  AccordionSingleProps,
  AccordionTriggerProps,
} from 'libs/ui/src/types/accordion.type';
import { cn } from 'libs/ui/src/utils/cn.util';
import '../../../index.css';
import { ChevronRight } from '../../atoms/Icon/Icon';

const Accordion = AccordionPrimitive.Root as React.ForwardRefExoticComponent<
  (AccordionSingleProps | AccordionMultipleProps) &
    React.RefAttributes<HTMLDivElement>
>;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'border-b border-b-slate-200 dark:border-b-slate-700',
      className
    )}
    {...props}
  />
)) as React.ForwardRefExoticComponent<
  AccordionItemProps & React.RefAttributes<HTMLDivElement>
>;
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
          className
        )}
        {...props}
      >
        {children}
        <ChevronRight className="h-4 w-4 rotate-90 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
) as React.ForwardRefExoticComponent<
  AccordionTriggerProps & React.RefAttributes<HTMLButtonElement>
>;
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className={cn(
        'overflow-hidden text-sm transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up',
        className
      )}
      {...props}
    >
      <div className="pt-0 pb-4">{children}</div>
    </AccordionPrimitive.Content>
  )
) as React.ForwardRefExoticComponent<
  AccordionContentProps & React.RefAttributes<HTMLDivElement>
>;
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
