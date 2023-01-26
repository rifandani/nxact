import type { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { ColorVariant, Size } from '../../../types/common.type';
import { Button } from './Button';

const Story: ComponentMeta<typeof Button> = {
  title: 'atoms/Button',
  component: Button,
  argTypes: {
    onClick: {
      action: 'clicked',
    },
    size: {
      control: { type: 'select', options: Size },
    },
    buttonType: {
      control: { type: 'select', options: ['solid', 'outlined', 'text'] },
    },
    variant: {
      control: { type: 'select', options: ColorVariant },
    },
    rounded: {
      control: { type: 'boolean' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    leftIcon: {
      control: 'boolean',
    },
    rightIcon: {
      control: 'boolean',
    },
  },
};
export default Story;

const Template: ComponentStoryFn<typeof Button> = (args) => (
  <Button {...args} />
);

export const Default = Template.bind({});
export const Outlined = Template.bind({});
export const Text = Template.bind({});

Default.args = {
  buttonType: 'solid',
  children: 'Solid',
};
Outlined.args = {
  buttonType: 'outlined',
  children: 'Outlined',
};
Text.args = {
  buttonType: 'text',
  children: 'Text',
};
