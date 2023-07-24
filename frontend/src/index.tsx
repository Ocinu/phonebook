import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ContactDetails from "./components/ContactDetails";
import Contacts from "./components/Contacts";
import {fetchContactByID} from "./components/fetchData/fetchContactByID";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        children: [
            {
                path: "/",
                element: <Contacts/>,
            },
            {
                path: "contact/:contactId",
                element: <ContactDetails/>,
                loader: async ({params}) => {
                    return await fetchContactByID(params)
                },
            },
        ],
    },
]);


root.render(
    <RouterProvider router={router}/>
);
