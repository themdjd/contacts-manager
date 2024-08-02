import { Link } from "react-router-dom";
import { CURRENTLINE, CYAN, ORANGE, RED } from "../../helpers/colors";
import { ContactContext } from "../../context/contactContext";
import { useContext } from "react";

function Contact({ c }) {

    const { deleteContact, removeContact } = useContext(ContactContext);


    return (
        <div className="col-lg-12 col-xl-6" >
            <div className="card my-2" style={{ backgroundColor: CURRENTLINE, minHeight: "160px" }}>
                <div className="card-body">
                    <div className="row d-flex flex-column flex-md-row align-items-center justify-content-around">
                        <div className="col-12 col-md-4 col-sm-4 d-flex justify-content-center my-md-0 my-2">
                            <img
                                src={c.photo}
                                alt="contactImage"
                                style={{ maxHeight: "150px", height: "150px", width: "180px", objectFit: "cover" }}
                                className="rounded"
                            />
                        </div>
                        <div className="col-12 col-md-7">
                            <ul className="list-group">
                                <li className="list-group-item list-group-item-dark">
                                    نام و نام خانوادگی :{" "}
                                    <span className="fw-bold">{c.fullname}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                    شماره موبایل :{" "}
                                    <span className="fw-bold">{c.mobile}</span>
                                </li>
                                <li className="list-group-item list-group-item-dark">
                                    آدرس ایمیل :{" "}
                                    <span className="fw-bold">{c.email}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-1 col-sm-1 my-2 my-md-0 d-flex flex-md-column gap-2 justify-content-center align-items-center">
                            <Link to={`/contacts/${c.id}`} className="btn" title="مشاهده مخاطب" style={{ backgroundColor: ORANGE }}>
                                <i className="fa fa-eye" />
                            </Link>
                            <Link to={`/contacts/edit/${c.id}`} className="btn" title="ویرایش مخاطب" style={{ backgroundColor: CYAN }}>
                                <i className="fa fa-pen" />
                            </Link>
                            <button onClick={() => deleteContact(c.id, c.fullname, removeContact)} className="btn" title="حذف مخاطب" style={{ backgroundColor: RED }}>
                                <i className="fa fa-trash" />
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Contact;