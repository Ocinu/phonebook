import React from "react";

export interface ContactInterface {
    id?: string;
    name: string;
    phone: string;
}

export interface ContactsProps {
    contacts: ContactInterface[];
    setContacts: React.Dispatch<React.SetStateAction<ContactInterface[]>>;
    onEdit: (contact: ContactInterface) => void;
}

export interface ContactDetailsProps {
}

export interface HeaderProps {
}

export interface FormProps {
    open: boolean;
    onClose: () => void;
    onAdd: (contact: ContactInterface) => void;
}

export interface EditFormProps {
    contact: ContactInterface;
    onUpdate: (contact: ContactInterface) => void;
    onCancel: () => void;
}
