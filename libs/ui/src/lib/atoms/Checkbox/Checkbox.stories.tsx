import type { CheckedState } from '@radix-ui/react-checkbox';
import type { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const Story: ComponentMeta<typeof Checkbox> = {
  title: 'atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    asChild: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
    defaultChecked: {
      control: { type: 'boolean' },
    },
    checked: {
      control: { type: 'select', options: [true, false, 'indeterminate'] },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
    name: {
      control: { type: 'string' },
    },
    value: {
      control: { type: 'string' },
      defaultValue: 'on',
    },
  },
};
export default Story;

const Template: ComponentStoryFn<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState<CheckedState>('indeterminate');

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={checked}
        onCheckedChange={setChecked}
        {...args}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
};

const IndeterminateTemplate: ComponentStoryFn<typeof Checkbox> = (args) => {
  const [checked, setChecked] = useState<CheckedState>('indeterminate');

  return (
    <>
      <Checkbox checked={checked} onCheckedChange={setChecked} {...args} />

      <button
        type="button"
        onClick={() =>
          setChecked((prev) =>
            prev === 'indeterminate' ? false : 'indeterminate'
          )
        }
      >
        Toggle
      </button>
    </>
  );
};

export const Default = Template.bind({});
export const Indeterminate = IndeterminateTemplate.bind({});
