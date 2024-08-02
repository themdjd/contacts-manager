import { createContext } from "react";

export const ContactContext = createContext({
    loading: false,
    setLoading: () => { },
    contacts: {},
    errors: [],
    setContacts: () => { },
    filterContacts: {},
    setFilterContacts: () => { },
    groups: [],
    deleteContact: () => { },
    updateContact: () => { },
    createContact: () => { },
    contactSearch: () => { },
    removeContact: () => { }
})