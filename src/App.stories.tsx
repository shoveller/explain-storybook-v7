import type { Meta, StoryObj } from '@storybook/react';

import App from './App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {MemoryRouter, Route, Routes} from "react-router-dom";

const meta = {
  title: 'src/App',
  component: App,
  parameters: {
    controls: { expanded: true }
  },
  argTypes: {},
  decorators: [(Story, ctx) => {
    return <QueryClientProvider client={new QueryClient()}><Story args={ctx.args} /></QueryClientProvider>
  }]
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

export const 포켓몬을_표시한다: Story = {
  args: {},
  decorators: [(Story, ctx) => {
    return (
        <MemoryRouter initialEntries={['/pokemon?page=2']}>
          <Routes>
            <Route path="/:resource" element={<Story args={ctx.args} />} />
          </Routes>
        </MemoryRouter>
    )
  }]
};

export const 아이템을_표시한다: Story = {
  args: {},
  decorators: [(Story, ctx) => {
    return (
        <MemoryRouter initialEntries={['/item?page=1']}>
          <Routes>
            <Route path="/:resource" element={<Story args={ctx.args} />} />
          </Routes>
        </MemoryRouter>
    )
  }]
};
