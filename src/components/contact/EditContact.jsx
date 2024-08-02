import { useEffect, useState } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Formik, Field, ErrorMessage } from "formik"

import { getContact, updateContact } from '../../services/contactsServices';
import Spinner from '../Spinner';
import { COMMENT, ORANGE, PURPLE } from '../../helpers/colors';
import { useContext } from 'react';
import { ContactContext } from './../../context/contactContext';
import { contactYup } from '../../validations/contactValidation';
import { toast } from 'react-toastify';

const EditContacts = () => {

    const { contacts, setContacts, setFilterContacts, loading, setLoading, groups } = useContext(ContactContext);
    const { contactId } = useParams();
    const navigate = useNavigate();

    const [contact, setContact] = useState({})

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data: contactData } = await getContact(contactId);

                setLoading(false);
                setContact(contactData);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const updateForm = async (values) => {
        try {
            setLoading(true)
            const { data, status } = await updateContact(values, contactId)
            if (status === 200) {
                setLoading(false)
                const allContacts = [...contacts];
                const index = contacts.findIndex(c => c.id == values.id)
                allContacts[index] = { ...data };
                setContacts([...allContacts])
                setFilterContacts([...allContacts])
                toast.success("مخاطب با موفقیت ویرایش شد")
                navigate("/contacts")
            }
        } catch (err) {
            console.log(err);
            toast.error("مخاطب ویرایش نشد!")
            setLoading(false);
        }
    }

    return (
        <>
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <section className="p-3">
                        <div className="container">
                            <div className="row my-2">
                                <div className="col text-center">
                                    <p className="h4 fw-bold" style={{ color: ORANGE }}>
                                        ویرایش مخاطب
                                    </p>
                                </div>
                            </div>
                            <hr style={{ backgroundColor: ORANGE }} />
                            <div
                                className="row p-2 w-75 mx-auto align-items-center"
                                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
                            >
                                <div className="col-md-8">
                                    <Formik
                                        initialValues={contact}
                                        validationSchema={contactYup}
                                        onSubmit={values => {
                                            updateForm(values)
                                        }}
                                    >
                                        <Form>
                                            <div className="mb-2">
                                                <Field
                                                    name="fullname"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="نام و نام خانوادگی"
                                                />
                                                <ErrorMessage name="fullname" render={msg => <div className="text-danger">{msg}</div>} />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="photo"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="آدرس تصویر"
                                                />
                                                <ErrorMessage name="photo" render={msg => <div className="text-danger">{msg}</div>} />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="mobile"
                                                    type="number"
                                                    className="form-control"
                                                    placeholder="شماره موبایل"
                                                />
                                                <ErrorMessage name="mobile" render={msg => <div className="text-danger">{msg}</div>} />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    placeholder="ایمیل"
                                                    className="form-control"
                                                />
                                                <ErrorMessage name="email" render={msg => <div className="text-danger">{msg}</div>} />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="job"
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="شغل"
                                                />
                                            </div>
                                            <div className="mb-2">
                                                <Field
                                                    name="group"
                                                    className="form-control"
                                                    as="select"
                                                >
                                                    <option value="">انتخاب گروه</option>
                                                    {
                                                        (groups.length > 0) && groups.map(group => (
                                                            <option key={group.id} value={group.id}>{group.name}</option>
                                                        ))
                                                    }
                                                </Field>
                                                <ErrorMessage name="group" render={msg => <div className="text-danger">{msg}</div>} />
                                            </div>
                                            <div className="mx-2">
                                                <input
                                                    type="submit"
                                                    className="btn"
                                                    style={{ backgroundColor: PURPLE }}
                                                    value="ویرایش مخاطب"
                                                />
                                                <Link
                                                    to={"/contacts"}
                                                    className="btn mx-2"
                                                    style={{ backgroundColor: COMMENT }}
                                                >
                                                    انصراف
                                                </Link>
                                            </div>
                                        </Form>

                                    </Formik>

                                </div>
                                <div className="col-md-4">
                                    <img
                                        src={contact.photo}
                                        className="img-fluid rounded"
                                        style={{ border: `1px solid ${PURPLE}` }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="text-center mt-1">
                            <img
                                src={require("../../assets/noteMan.png")}
                                height="300px"
                                style={{ opacity: "60%" }}
                            />
                        </div>
                    </section>
                </>
            )}
        </>
    )

}

export default EditContacts;