import React, {useContext, useState} from 'react';
import {ContactInterface, ContactsProps} from "./Models";
import {
    Avatar, Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, Typography
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {deepOrange, deepPurple, green, indigo, lightBlue} from "@mui/material/colors";
import axios from "axios";
import {NavLink} from "react-router-dom";
import {ContactsContext} from "./Context";
import EditForm from "./forms/EditForm";


export function getColorForName(name: string) {
    const colors = [deepOrange, deepPurple, green, indigo, lightBlue];
    const charCode = name.charCodeAt(0);
    const colorIndex = charCode % colors.length;

    return colors[colorIndex];
}

const Contacts: React.FC<ContactsProps> = () => {
    const {contacts, setContacts} = useContext(ContactsContext);
    const {search} = useContext(ContactsContext);
    const [editContact, setEditContact] = useState<ContactInterface | null>(null);

    let filteredContacts = contacts;

    if (search) {
        filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(search.toLowerCase())
        );
    }
    const handleEditContact = (contact: ContactInterface) => {
        setEditContact(contact);
    };

    const handleUpdate = (updatedContact: ContactInterface) => {
        setContacts(contacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact));
        setEditContact(null);
    }

    const handleDeleteContact = (contact: ContactInterface) => {
        axios.delete(`http://localhost:8000/api/contacts/${contact.id}`)
            .then(response => {
                setContacts(contacts.filter(existingContact => existingContact.id !== contact.id));
            })
            .catch(error => {
                console.error('There was an error deleting the contact!', error);
            });
    };

    return (
        <Box>
            <Typography m={2} variant="subtitle1" component="div" sx={{flexGrow: 1}}>
                CONTACTS ({contacts.length})
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Phone Number</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredContacts.map((contact) => (
                            <TableRow
                                key={contact.id}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    <NavLink to={`/contact/${contact.id}`}
                                             style={{textDecoration: 'none', color: 'inherit'}}>
                                        <Box display="flex" alignItems="center">
                                            <Avatar
                                                sx={{bgcolor: getColorForName(contact.name)[500]}}>{contact.name.substring(0, 1).toUpperCase()}</Avatar>
                                            <Box ml={1}>{contact.name}</Box>
                                        </Box>
                                    </NavLink>
                                </TableCell>
                                <TableCell align="right">{contact.phone}</TableCell>
                                <TableCell align="right">
                                    <IconButton aria-label="edit" onClick={() => handleEditContact(contact)}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={() => handleDeleteContact(contact)}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {editContact &&
                <EditForm contact={editContact} onUpdate={handleUpdate} onCancel={() => setEditContact(null)}/>
            }
        </Box>
    );
}

export default Contacts;