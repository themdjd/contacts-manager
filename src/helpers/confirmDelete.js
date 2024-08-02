import { confirmAlert } from "react-confirm-alert";
import { COMMENT, CURRENTLINE, FOREGROUND, PURPLE, YELLOW } from "./colors";

export const confirmDelete = (contactId, fullname, removeContact) => {
    confirmAlert({
        customUI: ({ onClose }) => {
            return (
                <div
                    dir="rtl"
                    style={{ backgroundColor: CURRENTLINE, border: `1px silid ${PURPLE}`, borderRadius: "1rem" }}
                    className="p-4"
                >
                    <h1 style={{ color: YELLOW }}>پاک کردن مخاطب</h1>
                    <p style={{ color: FOREGROUND }}>مطمئنی که میخای {fullname} را پاک کنی؟</p>
                    <button
                        className="btn mx-2"
                        style={{ backgroundColor: PURPLE }}
                        onClick={() => {
                            removeContact(contactId);
                            onClose();
                        }}
                    >مطمئن هستم</button>
                    <button
                        onClick={onClose}
                        className="btn"
                        style={{ backgroundColor: COMMENT }}
                    >انصراف</button>
                </div>
            )
        }
    })
}