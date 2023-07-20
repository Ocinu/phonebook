import React from "react";

import {ContactDetailsProps} from "./Models";
import {useLoaderData} from "react-router-dom";
import {Avatar, Box, Grid, Paper, Typography} from "@mui/material";
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import {getColorForName} from "./Contacts";


const ContactDetails: React.FC<ContactDetailsProps> = () => {
    // @ts-ignore
    const {contact} = useLoaderData()

    return (
        <Grid container>
            <Grid item xs={12}>
                <Box display="flex" alignItems="center" style={{margin: '10px'}}>
                    <Avatar
                        sx={{bgcolor: getColorForName(contact.name)[500], width: 256, height: 256}}
                    >
                        <Typography variant="h1" gutterBottom>
                            {contact.name.substring(0, 1).toUpperCase()}
                        </Typography>
                    </Avatar>
                    <Box ml={5}>
                        <Typography variant="h2" gutterBottom>
                            {contact.name}
                        </Typography>
                    </Box>
                </Box>
                <Paper elevation={3} style={{margin: '10px', padding: '10px'}}>
                    <Box ml={1} display="flex" alignItems="center" style={{margin: '10px'}}>
                        <Person2OutlinedIcon style={{padding: '10px'}}></Person2OutlinedIcon>
                        <Typography variant="h6" mb={0} ml={2}>
                            {contact.name}
                        </Typography>

                    </Box>
                </Paper>
                <Paper elevation={3} style={{margin: '10px', padding: '10px'}}>
                    <Box ml={1} display="flex" alignItems="center" style={{margin: '10px'}}>
                        <LocalPhoneOutlinedIcon style={{padding: '10px'}}></LocalPhoneOutlinedIcon>
                        <Typography variant="h6" mb={0} ml={2}>
                            {contact.phone}
                        </Typography>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default ContactDetails;