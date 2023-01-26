import type { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './Collapsible';

const Story: ComponentMeta<typeof Collapsible> = {
  title: 'molecules/Collapsible',
  component: Collapsible,
  subcomponents: {
    CollapsibleTrigger,
    CollapsibleContent,
  },
  argTypes: {
    asChild: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    defaultOpen: {
      control: { type: 'boolean' },
    },
    open: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
  },
};
export default Story;

const CollapsibleTemplate: ComponentStoryFn<typeof Collapsible> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen} {...args}>
      <CollapsibleTrigger>Triggerer</CollapsibleTrigger>
      <CollapsibleContent>Collapsible Content</CollapsibleContent>
    </Collapsible>
  );
};

const TriggerTemplate: ComponentStoryFn<typeof CollapsibleTrigger> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger {...args}>Triggerer</CollapsibleTrigger>
    </Collapsible>
  );
};

const ContentTemplate: ComponentStoryFn<typeof CollapsibleContent> = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleContent {...args}>Collapsible Content</CollapsibleContent>
    </Collapsible>
  );
};

export const Default = CollapsibleTemplate.bind({});
export const Trigger = TriggerTemplate.bind({});
export const Content = ContentTemplate.bind({});

Default.args = {
  defaultOpen: false,
  open: false,
  disabled: false,
};
Trigger.args = {
  asChild: false,
};
Content.args = {
  children: 'Collapsible Content',
  asChild: false,
  forceMount: undefined,
};
