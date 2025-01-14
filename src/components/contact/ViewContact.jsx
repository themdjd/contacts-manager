import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getGroup } from "../../services/contactsServices";
import { Spinner } from "..";
import { CYAN, PURPLE, CURRENTLINE } from "../../helpers/colors";

import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

const ViewContacts = () => {

    const { contacts } = useContext(ContactContext);
    const { contactId } = useParams();

    const [state, setState] = useState({
        loading: false,
        contact: contacts.filter(c => c.id === contactId)[0],
        group: {}
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setState({ ...state, loading: true });
                const { data: groupData } = await getGroup(contact.group);

                setState({
                    ...state,
                    loading: false,
                    group: groupData,
                });
            } catch (err) {
                console.log(err.message);
                setState({ ...state, loading: false });
            }
        };

        fetchData();
    }, []);

    const { loading, contact, group } = state;

    return (
        <>
            <section className="view-contact-intro p-3">
                <div className="container">
                    <div className="row my-2 text-center">
                        <p className="h3 fw-bold" style={{ color: CYAN }}>
                            اطلاعات مخاطب
                        </p>
                    </div>
                </div>
            </section>
            <hr style={{ backgroundColor: CYAN }} />

            {loading ? (<Spinner />) : (
                <>
                    {Object.keys(contact).length > 0 && (
                        <section className="view-contact mt-e">
                            <div
                                className="container p-2"
                                style={{ borderRadius: "1em", backgroundColor: CURRENTLINE }}
                            >
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <img
                                            src={contact.photo}
                                            alt=""
                                            className="img-fluid rounded"
                                            style={{ border: `1px solid ${PURPLE}` }}
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-dark">
                                                نام و نام خانوادگی :{" "}
                                                <span className="fw-bold">{contact.fullname}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                شماره موبایل :{" "}
                                                <span className="fw-bold">{contact.mobile}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                ایمیل : <span className="fw-bold">{contact.email}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                شغل : <span className="fw-bold">{contact.job}</span>
                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                گروه : <span className="fw-bold">{group.name}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row my-2">
                                    <div className="d-grid gap-2 col-6 mx-auto">
                                        <Link
                                            to={"/contacts"}
                                            className="btn"
                                            style={{ backgroundColor: PURPLE }}
                                        >
                                            برگشت به صفحه اصلی
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </>
            )
            }
        </>
    )

}

export default ViewContacts;