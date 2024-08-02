import { PURPLE } from "../../helpers/colors";
import { useContext } from "react";
import { ContactContext } from "../../context/contactContext";

function SearchContact() {

    const { contactSearch } = useContext(ContactContext);

    return (
        <div className="input-group mx-2 w-100" style={{ maxWidth: "30rem" }} dir="ltr">
            <span className="input-group-text" id="basic-addon1" style={{ backgroundColor: PURPLE }}>
                <i className="fas fa-search" />
            </span>
            <input
                dir="rtl"
                type="text"
                className="form-control"
                placeholder="جستجوی مخاطبین"
                aria-label="Search"
                aria-describedby="basic-addon1"
                onChange={e => contactSearch(e.target.value)}
            />
        </div>
    )
}
export default SearchContact;