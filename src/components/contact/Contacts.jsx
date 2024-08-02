import { Spinner, Contact } from "../../components"
import { useContext } from "react";
import { PINK, GREEN } from '../../helpers/colors';
import { Link } from "react-router-dom";

import { ContactContext } from "../../context/contactContext";

function Contacts() {

    const { filterContacts, loading } = useContext(ContactContext);

    return (
        <>
            <section className='container'>
                <div className='grid'>
                    <div className='row'>
                        <div className='col'>
                            <p className='h3 d-flex justify-content-center'>
                                <Link to="/contacts/add" className="btn m-2" style={{ backgroundColor: PINK }}>
                                    ساخت مخاطب جدید
                                    <i className='fa fa-plus-circle mx-2' />
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? <Spinner /> :
                    <section className='container'>
                        <div className='row'>
                            {filterContacts.length > 0 ? filterContacts.map((c, key) => (
                                <Contact c={c} key={key} />
                            )) : <h1 style={{ color: GREEN }}>مخاطبی یافت نشد</h1>}
                        </div>
                    </section>
            }
        </>
    );
}

export default Contacts; 