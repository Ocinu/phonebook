import React from "react";
import {ContactInterface} from "./Models";

export const HeaderContext = React.createContext<{
        search: string;
        setSearch: React.Dispatch<React.SetStateAction<string>>;
        setContacts: React.Dispatch<React.SetStateAction<ContactInterface[]>>;
    }>({
        search: '',
        setSearch: () => {},
        setContacts: () => {},
    });

export const ContactsContext = React.createContext<{
        contacts: ContactInterface[];
        setContacts: React.Dispatch<React.SetStateAction<ContactInterface[]>>;
        search: string;
}>({
        contacts: [],
        setContacts: () => {},
        search: '',
});