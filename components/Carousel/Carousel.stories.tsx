import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Carousel  from './';

export default {
  title: 'Carousel',
  component: Carousel,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof Carousel>;

const Template: ComponentStory<typeof Carousel> = (args) => <Carousel {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  children: [
    'item 1',
    'item 2',
    'item 3'
  ],
  color: 'red'
};
