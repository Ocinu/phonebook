import React, {useContext, useState} from "react";
import {HeaderProps} from "./Models";
import {Avatar, Grid, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import CreateForm from "./forms/CreateForm";
import Search from "./forms/Search";
import {HeaderContext} from "./Context";
import {NavLink} from "react-router-dom";

const Header: React.FC<HeaderProps> = () => {
    const [open, setOpen] = useState(false);
    const {setContacts} = useContext(HeaderContext);

    return (
        <Grid container
              spacing={3}
              direction="row"
              justifyContent="space-between"
              alignItems="center">
            <Grid item xs="auto">
                <Grid container
                      spacing={3}
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center">
                    <Grid item>
                        <Avatar alt="Remy Sharp" src="/static/avatar.jpg" />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" mb={0}>
                            <NavLink to={`/`} style={{textDecoration: 'none', color: 'inherit'}}>
                                Phonebook
                            </NavLink>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={4}
                  justifyContent="space-around"
                  alignItems="center"
            >
                <Search/>
            </Grid>
            <Grid item xs="auto">
                <Button variant="contained" color="primary" fullWidth onClick={() => setOpen(true)}>
                    Create contact
                </Button>
                <CreateForm
                    open={open}
                    onClose={() => setOpen(false)}
                    onAdd={(contact) => setContacts(prevContacts => [...prevContacts, contact])}
                />
            </Grid>
        </Grid>
    );
}

export default Header;