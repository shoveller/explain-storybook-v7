import type {Meta, StoryObj} from '@storybook/react';

import App, {Page} from './App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import {getWorker} from "msw-storybook-addon";
import {rest} from "msw";

const worker = getWorker()
const client = new QueryClient();
const meta = {
    title: 'src/App',
    component: App,
    decorators: [(Story, props) => {
        worker.resetHandlers();
        worker.use(rest.get<Page>('https://pokeapi.co/api/v2/*', (_, res, ctx) => {
            return res(
                ctx.json(props.args)
            )
        }))
        client.refetchQueries()

        return (
            <QueryClientProvider client={client}>
                <Story args={props.args} />
            </QueryClientProvider>
        )
    }]
} satisfies Meta<typeof App>;

export default meta;

type Story = StoryObj<typeof meta>;

const args = {
    count: 0,
    next: '',
    previous: '',
    results: [
        {
            "name": "master-ball",
            "url": "https://pokeapi.co/api/v2/item/1/"
        }
    ]
}

export const 포켓몬을_표시한다: Story = {
    args,
    decorators: [(Story, ctx) => {
        return (
            <MemoryRouter initialEntries={['/pokemon?page=2']}>
                <Routes>
                    <Route path="/:resource" element={<Story args={ctx.args} />}/>
                </Routes>
            </MemoryRouter>
        )
    }],
};

export const 아이템을_표시한다: Story = {
    args,
    decorators: [(Story, ctx) => {
        return (
            <MemoryRouter initialEntries={['/item?page=1']}>
                <Routes>
                    <Route path="/:resource" element={<Story args={ctx.args} />}/>
                </Routes>
            </MemoryRouter>
        )
    }]
};
