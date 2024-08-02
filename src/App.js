import { useEffect } from "react"

import { Contacts, Navbar, AddContact, EditContact, ViewContact } from "./components"
import { getAllContacts, getAllgroup, createContact, deleteContact } from "./services/contactsServices"

import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import _ from "lodash"

import { ContactContext } from "./context/contactContext"
import { useImmer } from "use-immer"
import { confirmDelete } from "./helpers/confirmDelete"
import { toast, ToastContainer } from "react-toastify"


const App = () => {

  const [loading, setLoading] = useImmer(false);
  const [contacts, setContacts] = useImmer([]);
  const [filterContacts, setFilterContacts] = useImmer([]);
  const [groups, setgroups] = useImmer([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)

        const { data: dataContacts } = await getAllContacts();
        const { data: datagroup } = await getAllgroup();
        setContacts(dataContacts)
        setFilterContacts(dataContacts)
        setgroups(datagroup)

        setLoading(false)
      } catch (err) {
        console.log(err.message);
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const createNewContact = async (values) => {
    try {

      const { status, data } = await createContact(values);
      if (status === 201) {

        setContacts(draft => { draft.push(data) })
        setFilterContacts(draft => { draft.push(data) })

        toast.success("مخاطب با موفقیت ساخته شد")

        navigate("/contacts")
      }
    } catch (err) {
      toast.error(`مخاطب ساخته نشد : ${err.message}`)
    }
  }

  const removeContact = async (contactId) => {
    const allContacts = [...contacts]
    try {
      setContacts(contacts.filter(c => c.id !== parseInt(contactId)))
      setFilterContacts(contacts.filter(c => c.id !== contactId))

      const { status } = await deleteContact(contactId)

      if (status !== 200) {
        setContacts(allContacts);
        setFilterContacts(allContacts);
        toast.error(`مخاطب حذف نشد`)
      } else {
        toast.success("مخاطب با موفقیت حذف شد")
      }
    }
    catch (err) {
      setContacts(allContacts);
      setFilterContacts(allContacts);
      console.log(err);
      toast.error(`مخاطب حذف نشد : ${err.message}`)
    }
  }

  const contactSearch = _.debounce((query) => {
    if (!query) { return setFilterContacts([...contacts]) }
    setFilterContacts(contacts.filter((c) => c.fullname.toLowerCase().includes(query.toLowerCase())))
  }, 1000)

  return (
    <>
      <ContactContext.Provider value={{
        contacts,
        removeContact,
        setContacts,
        contactSearch,
        createNewContact,
        deleteContact: confirmDelete,
        filterContacts,
        setFilterContacts,
        loading,
        groups,
        setLoading,
      }}>
        <ToastContainer rtl={true} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/contacts" />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/contacts/add" element={<AddContact />} />
          <Route path="/contacts/edit/:contactId" element={<EditContact />} />
          <Route path="/contacts/:contactId" element={<ViewContact />} />
        </Routes>
      </ContactContext.Provider>
    </>
  )

}

export default App;