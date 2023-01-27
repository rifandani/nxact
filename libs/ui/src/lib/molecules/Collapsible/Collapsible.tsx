import CollapsiblePrimitive from '@radix-ui/react-collapsible';
import React from 'react';
import {
  CollapsibleContentProps,
  CollapsibleProps,
  CollapsibleTriggerProps,
} from '../../../types/collapsible.type';

const Collapsible =
  CollapsiblePrimitive.Root as React.ForwardRefExoticComponent<
    CollapsibleProps & React.RefAttributes<HTMLDivElement>
  >;

const CollapsibleTrigger =
  CollapsiblePrimitive.CollapsibleTrigger as React.ForwardRefExoticComponent<
    CollapsibleTriggerProps & React.RefAttributes<HTMLButtonElement>
  >;

const CollapsibleContent =
  CollapsiblePrimitive.CollapsibleContent as React.ForwardRefExoticComponent<
    CollapsibleContentProps & React.RefAttributes<HTMLDivElement>
  >;

export { Collapsible, CollapsibleTrigger, CollapsibleContent };
