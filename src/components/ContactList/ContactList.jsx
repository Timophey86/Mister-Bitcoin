import "./ContactList.scss";
import { ContactPreview } from "../ContactPreview";

export function ContactList({ contacts,  removeContact }) {
  return (
    <div className="contact-list-container">
      <h2>Contacts</h2>
      <div className="contact-list">
        {contacts &&
          contacts.map(function (contact) {
            return <ContactPreview  removeContact={removeContact} key={contact._id} contact={contact} />;
          })}
      </div>
    </div>
  );
}
