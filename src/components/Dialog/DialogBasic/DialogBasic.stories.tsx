import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import DialogBasic from '.';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/DialogBasic',
  component: DialogBasic,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    maxWidth: {
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
} as ComponentMeta<typeof DialogBasic>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DialogBasic> = (args) => {
  const [isOpen, setIsOpen] = React.useState(true)
  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Dialog</button>
      <DialogBasic {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div>Content</div>
      </DialogBasic>
    </>
  )
};

export const Default = Template.bind({});

export const WithTitleActions = Template.bind({});
WithTitleActions.args = {
  title: 'Title Dialog',
  textButtonCancel: 'Tutup',
  textButtonSubmit: 'Kirim',
  onClickSubmit: () => {
    console.log('click submit')
  }
}

export const WithTitleCustomActions = Template.bind({});
WithTitleCustomActions.args = {
  title: 'Title Dialog',
  actions: [
    {
      text: 'This',
      onClick: () => {
        console.log('click button this')
      },
      buttonVariant: 'outlined',
      buttonColor: 'primary',
    },
    {
      text: 'That',
      onClick: () => {
        console.log('click button that')
      },
      buttonVariant: 'contained',
      buttonColor: 'error',
    },
    {
      text: 'Those',
      onClick: () => {
        console.log('click button those')
      },
      buttonVariant: 'text',
      buttonColor: 'warning',
    },
  ]
}
