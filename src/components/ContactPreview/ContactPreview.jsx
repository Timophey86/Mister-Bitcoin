import "./ContactPreview.scss";
import DeleteForeverIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";

export function ContactPreview({ contact, removeContact }) {


  return (
    <Link to={"/Contacts/" + contact._id}>
      <div className="contact-preview">
        <h4>{contact.name}</h4>
        <img src={contact.img} alt="" />
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
        <span className="remove" onClick={()=>removeContact(contact._id)}>
          <DeleteForeverIcon />
        </span>
      </div>
    </Link>
  );
}
