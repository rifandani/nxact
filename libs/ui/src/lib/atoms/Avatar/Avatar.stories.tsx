import type { ComponentMeta, ComponentStoryFn } from '@storybook/react';
import { Avatar, AvatarFallback, AvatarImage } from './Avatar';

const Story: ComponentMeta<typeof Avatar> = {
  title: 'molecules/Avatar',
  component: Avatar,
  subcomponents: {
    AvatarImage,
    AvatarFallback,
  },
  argTypes: {
    asChild: {
      control: { type: 'boolean' },
      defaultValue: false,
    },
  },
};
export default Story;

const AvatarTemplate: ComponentStoryFn<typeof Avatar> = (args) => {
  return (
    <Avatar {...args}>
      <AvatarImage src="https://github.com/rifandani.png" alt="@rifandani" />
      <AvatarFallback>RR</AvatarFallback>
    </Avatar>
  );
};

const FallbackTemplate: ComponentStoryFn<typeof AvatarFallback> = (args) => {
  return (
    <Avatar>
      <AvatarFallback {...args}>RR</AvatarFallback>
    </Avatar>
  );
};

export const Default = AvatarTemplate.bind({});
export const Fallback = FallbackTemplate.bind({});
