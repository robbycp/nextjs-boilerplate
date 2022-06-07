import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Layout from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Layout',
  component: Layout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Layout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args}><>Test page</></Layout>;

export const Default = Template.bind({});
