import React, {useEffect, useMemo, useState} from 'react';
import {Container, Grid, Paper} from "@mui/material";
import Header from "./components/Header";
import {ContactInterface} from "./components/Models";
import {ContactsContext, HeaderContext} from "./components/Context";
import {Outlet} from "react-router-dom";
import {fetchAllContacts} from "./components/fetchData/fetchAllContacts";

function App() {
    const [contacts, setContacts] = useState<ContactInterface[]>([]);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        fetchAllContacts().then(data => setContacts(data));
    }, []);


    const contextHeaderValue = useMemo(() => ({search, setSearch, setContacts}), [search, setSearch, setContacts]);
    const contextContactsValue = useMemo(() => ({contacts, setContacts, search}), [contacts, setContacts, search]);

    return (
        <Container>
            <Grid container>
                <Grid item xs={12}>
                    <Paper style={{margin: '10px', padding: '10px'}}>
                        <HeaderContext.Provider value={contextHeaderValue}>
                            <Header/>
                        </HeaderContext.Provider>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{margin: '10px'}}>
                        <ContactsContext.Provider value={contextContactsValue}>
                            <Outlet/>
                        </ContactsContext.Provider>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default App;
