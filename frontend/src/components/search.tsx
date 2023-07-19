import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import {SearchProps} from "./models";
import {Avatar, Grid, InputAdornment, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Button from "@mui/material/Button";
import {deepOrange} from '@mui/material/colors';
import Form from "./form";

const Search: React.FC<SearchProps> = ({setSearch, search, contacts, setContacts}) => {
    const [open, setOpen] = useState(false);
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

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
                        <Avatar sx={{bgcolor: deepOrange[500]}}>N</Avatar>
                    </Grid>
                    <Grid item>
                        <Typography variant="h6" gutterBottom>
                            <a href={`http://localhost:3000/`} style={{textDecoration: 'none', color: 'inherit'}}>
                                Phonebook
                            </a>
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={4}
                  justifyContent="space-around"
                  alignItems="center"
            >
                <TextField
                    fullWidth
                    id="search"
                    label="Search"
                    type="search"
                    variant="filled"
                    value={search}
                    onChange={handleSearchChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon/>
                            </InputAdornment>
                        ),
                    }}
                />
            </Grid>
            <Grid item xs="auto">
                <Button variant="contained" color="primary" fullWidth onClick={() => setOpen(true)}>
                    Create contact
                </Button>
                <Form
                    open={open}
                    onClose={() => setOpen(false)}
                    onAdd={(contact) => setContacts(prevContacts => [...prevContacts, contact])}
                />
            </Grid>
        </Grid>
    );
}

export default Search;