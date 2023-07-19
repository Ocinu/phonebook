import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormProps} from "./models";
import axios from "axios";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const Form: React.FC<FormProps> = ({ open, onClose, onAdd }) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const handleAddContact = () => {
        axios.post('http://localhost:8000/api/contacts/', { name, phone })
            .then(response => {
                onAdd(response.data);
                onClose();
            })
            .catch(error => {
                console.error('There was an error creating the contact!', error);
            });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add a new contact</DialogTitle>
            <DialogContent>
                <DialogContentText>Please fill out the form below.</DialogContentText>
                <TextField autoFocus margin="dense" id="name" label="Name" type="text" fullWidth
                           value={name} onChange={(e) => setName(e.target.value)} />
                <TextField margin="dense" id="phone" label="Phone" type="text" fullWidth
                           value={phone} onChange={(e) => setPhone(e.target.value)} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Cancel</Button>
                <Button onClick={handleAddContact} color="primary">Add</Button>
            </DialogActions>
        </Dialog>
    );
};
export default Form;