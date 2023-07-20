import React, {useEffect, useMemo, useState} from 'react';
import {Container, Grid, Paper} from "@mui/material";
import Contacts from "./components/Contacts";
import Header from "./components/Header";
import {ContactInterface} from "./components/Models";
import axios from "axios";
import EditForm from "./components/forms/EditForm";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ContactDetails from "./components/ContactDetails";
import {HeaderContext} from "./components/Context";

function App() {
    const [contacts, setContacts] = useState<ContactInterface[]>([]);
    const [search, setSearch] = useState<string>('');
    const [editContact, setEditContact] = useState<ContactInterface | null>(null);

    useEffect(() => {
        axios.get('http://localhost:8000/api/contacts/')
            .then(response => {
                setContacts(response.data);
            })
            .catch(error => {
                console.error('Network error!', error);
            });
    }, []);

    const handleEdit = (contact: ContactInterface) => {
        setEditContact(contact);
    }

    const handleUpdate = (updatedContact: ContactInterface) => {
        setContacts(contacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact));
        setEditContact(null);
    }

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Contacts
                contacts={contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()))}
                setContacts={setContacts}
                onEdit={handleEdit}
            />,
        },
        {
            path: "contact/:contactId",
            element: <ContactDetails/>,
            loader: ({params}) => {
                const contact = contacts.find(contact => contact.id === params.contactId);
                return {contact};
            }
        },
    ]);

    const contextValue = useMemo(() => ({search, setSearch, setContacts}), [search, setSearch, setContacts]);


    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Paper style={{margin: '10px', padding: '10px'}}>
                        <HeaderContext.Provider value={contextValue}>
                            <Header />
                        </HeaderContext.Provider>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{margin: '10px'}}>
                        <RouterProvider router={router}/>
                    </Paper>
                </Grid>
            </Grid>
            {editContact &&
                <EditForm contact={editContact} onUpdate={handleUpdate} onCancel={() => setEditContact(null)}/>
            }
        </Container>
    );
}

export default App;
