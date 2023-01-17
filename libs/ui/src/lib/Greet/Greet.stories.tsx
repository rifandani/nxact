import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Greet } from './Greet';

const Story: ComponentMeta<typeof Greet> = {
  component: Greet,
  title: 'Greet',
};
export default Story;

const Template: ComponentStory<typeof Greet> = (args) => <Greet {...args} />;

export const Primary = Template.bind({});
Primary.args = { name: 'story' };
