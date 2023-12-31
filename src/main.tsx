import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../public/index.css'
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path="/:resource" element={<App/>}/>
        <Route path="*" element={<Navigate to="/pokemon?page=1"/>}/>
    </>
))

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <QueryClientProvider client={client}>
            <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>,
)
