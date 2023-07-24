import axios from 'axios';

import {ContactInterface} from "../Models";

export const fetchContactByID = async (params: {[key: string]: string | undefined}): Promise<ContactInterface> => {
    const contactId = params['contactId'];
    if (contactId === undefined) {
        console.error('contactId is undefined');
        return { id: '', name: '', phone: '' };
    }
    try {
        const response = await axios.get(`http://localhost:8000/api/contacts/${contactId}`);
        return response.data;
    } catch (error) {
        console.error('Network error!', error);
        return { id: '', name: '', phone: '' };
    }
};




