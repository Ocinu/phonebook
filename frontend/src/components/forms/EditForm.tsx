import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {EditFormProps} from "../Models";
import axios from "axios";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";


const EditForm: React.FC<EditFormProps> = ({ contact, onUpdate, onCancel }) => {
  const [name, setName] = useState<string>(contact.name);
  const [phone, setPhone] = useState<string>(contact.phone);

  useEffect(() => {
      setName(contact.name);
      setPhone(contact.phone);
  }, [contact]);

  const handleUpdateContact = () => {
        axios.put(`http://localhost:8000/api/contacts/${contact.id}/`, { name, phone })
            .then(response => {
                onUpdate(response.data);
            })
            .catch(error => {
                console.error('There was an error updating the contact!', error);
            });
    };

    return (
        <Dialog open={true} onClose={onCancel}>
            <DialogTitle>Edit contact</DialogTitle>
            <DialogContent>
                <DialogContentText>Please edit the form below.</DialogContentText>
                <TextField autoFocus margin="dense" id="name" label="Name" type="text" fullWidth
                           value={name} onChange={(e) => setName(e.target.value)} />
                <TextField margin="dense" id="phone" label="Phone" type="text" fullWidth
                           value={phone} onChange={(e) => setPhone(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel} color="primary">Cancel</Button>
                <Button onClick={handleUpdateContact} color="primary">Update</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditForm;
