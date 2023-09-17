import type { Meta, StoryObj } from '@storybook/react';

import App from './App';

const meta = {
  title: 'src/App',
  component: App,
  parameters: {
    controls: { expanded: true }
  },
  argTypes: {},
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 기본적인_사용법: Story = {
  args: {}
};
