import type { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './Accordion';

const Story: ComponentMeta<typeof Accordion> = {
  title: 'molecules/Accordion',
  component: Accordion,
  subcomponents: {
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
  },
  argTypes: {
    asChild: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    type: {
      control: { type: 'select', options: ['single', 'multiple'] },
    },
    value: {
      control: { type: 'text' },
    },
    defaultValue: {
      control: { type: 'text' },
    },
    onValueChange: {
      type: { name: 'function' },
    },
    collapsible: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    disabled: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    dir: {
      control: { type: 'select', options: ['ltr', 'rtl'] },
    },
    orientation: {
      control: { type: 'select', options: ['horizontal', 'vertical'] },
    },
  },
};
export default Story;

const AccordionTemplate: ComponentStoryFn<typeof Accordion> = ({
  type = 'single',
}) => {
  return (
    <Accordion type={type} collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export const Single = AccordionTemplate.bind({});
export const Multiple = AccordionTemplate.bind({});

Multiple.args = {
  type: 'multiple',
};
