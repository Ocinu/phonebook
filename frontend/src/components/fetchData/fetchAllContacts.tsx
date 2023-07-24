import axios from "axios";

export const fetchAllContacts = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/contacts/`);
        return response.data;
    } catch (error) {
        console.error('Network error!', error);
        return [];
    }
};
