import React from "react";
import {ContactInterface} from "./Models";

export const HeaderContext = React.createContext<{
        search: string;
        setSearch: React.Dispatch<React.SetStateAction<string>>;
        setContacts: React.Dispatch<React.SetStateAction<ContactInterface[]>>;
    }>({
        search: '',
        setSearch: () => {
        },
        setContacts: () => {
        }
    });