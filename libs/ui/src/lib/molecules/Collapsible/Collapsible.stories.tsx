import type { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './Collapsible';

const Story: ComponentMeta<typeof Collapsible> = {
  component: Collapsible,
  subcomponents: {
    CollapsibleTrigger,
    CollapsibleContent,
  },
  title: 'Collapsible',
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

const CollapsibleTemplate: ComponentStoryFn<typeof Collapsible> = (args) => (
  <Collapsible {...args} />
);
const TriggerTemplate: ComponentStoryFn<typeof CollapsibleTrigger> = (args) => (
  <Collapsible>
    <CollapsibleTrigger {...args} />
  </Collapsible>
);
const ContentTemplate: ComponentStoryFn<typeof CollapsibleContent> = (args) => (
  <Collapsible>
    <CollapsibleContent {...args} />
  </Collapsible>
);

export const Default = CollapsibleTemplate.bind({});
export const Trigger = TriggerTemplate.bind({});
export const Content = ContentTemplate.bind({});

Default.args = {
  children: (
    <>
      <CollapsibleTrigger>Triggerer</CollapsibleTrigger>
      <CollapsibleContent>Collapsible Content</CollapsibleContent>
    </>
  ),
  defaultOpen: false,
  open: false,
  disabled: false,
};
Trigger.args = {
  children: 'Triggerer',
  asChild: false,
};
Content.args = {
  children: 'Collapsible Content',
  asChild: false,
  forceMount: undefined,
};
