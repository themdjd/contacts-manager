import SearchContact from './contact/SearchContact';
import { BACKGROUND, PURPLE } from './../helpers/colors';
import { useLocation } from 'react-router-dom';

const Navbar = () => {

    const location = useLocation();

    return (
        <>
            <div className='navbar navbar-dark navbar-expand-sm shadow' style={{ background: BACKGROUND }}>
                <div className='container'>
                    <div className='row w-100'>
                        <div className='col-4'>
                            <div className='navbar-brand'>
                                <i className='fas fa-id-badge' style={{ color: PURPLE }} />
                                <span style={{ color: PURPLE }}>{" "}اپلیکیشن مدیریت مخاطبین</span>
                            </div>
                        </div>
                        {
                            location.pathname === "/contacts" ? (
                                <div className='col-8'>
                                    <SearchContact />
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar;