import type { ComponentStory, ComponentMeta } from '@storybook/react';
import { ThisYear } from './ThisYear';

const Story: ComponentMeta<typeof ThisYear> = {
  component: ThisYear,
  title: 'ThisYear',
};
export default Story;

const Template: ComponentStory<typeof ThisYear> = (args) => (
  <ThisYear {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
