import { Component } from "react";
import "./ContactDetailsPage.scss";
import contactService from "../../services/contactService";
import BackArrow from "../../assets/images/back-arrow.svg";
import RightArrow from "../../assets/images/right-arrow.svg";
import LeftArrow from "../../assets/images/left-arrow.svg";
import EditIcon from "@material-ui/icons/Edit";
import { connect } from "react-redux";
import { getContactById } from "../../store/actions/contactsAction";
import { transferCoins } from "../../store/actions/usersAction";
import { TransferFund } from "../../components/TransferFund";
import { MoveList } from "../../components/MoveList/MoveList";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class _ContactDetailsPage extends Component {
  state = {
    errMsg: null,
  };
  async componentDidMount() {
    this.getContact();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.getContact();
    }
  }

  async getContact() {
    try {
      await this.props.getContactById(this.props.match.params.id);
    } catch {
      this.setState({
        errMsg: `Couldn't find contact with such id`,
        contact: null,
      });
    }
  }

  async prevContactId() {
    const contacts = await contactService.getContacts();
    var index = contacts.findIndex(
      (contact) => contact._id === this.props.match.params.id
    );
    const pervContact = contacts[index - 1];
    if (!pervContact) return;
    this.props.history.push(`/Contacts/` + pervContact._id);
  }
  async nextContactId() {
    const contacts = await contactService.getContacts();
    var index = contacts.findIndex(
      (contact) => contact._id === this.props.match.params.id
    );
    const nextContact = contacts[index + 1];
    if (!nextContact) return;
    this.props.history.push(`/Contacts/` + nextContact._id);
  }

  onTransferCoins = (ev, amount) => {
    ev.preventDefault();
    if (this.props.currUser.coins < amount) {
      toast.warn("Not enough coins in your balance.", {position: toast.POSITION.TOP_CENTER})
      return;
    }
    const move = {
      fromUser: this.props.currUser,
      toId: this.props.contactId,
      to: this.props.contact,
      at: new Date(),
      amount,
    };
    this.props.transferCoins(move);
  };

  render() {
    const { contact, contactId } = this.props;

    if (!contact)
      return <div className="loading">{this.state.errMsg || "Loading..."}</div>;
    return (
      <div className="contact-details">
        <ToastContainer />
        {contact && (
          <div className="details-container">
            <button
              className="back-btn"
              onClick={() => {
                this.props.history.push(`/Contacts`);
              }}
            >
              <img className="back-img" src={BackArrow} alt="" />
              Back
            </button>
            <h1>{contact.name}</h1>
            <img src={contact.img} alt="" />
            <p className="bio">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Repellendus ex ut quam aspernatur commodi iure ipsa! Odio
              obcaecati praesentium voluptatem soluta iure et, autem facere
              aliquam tempore velit voluptatum suscipit!
            </p>
            <p>
              <span className="contact-email">My E-Mail: </span>
              {contact.email}
            </p>
            <p>
              <span className="contact-phone">My Phone:</span> {contact.phone}
            </p>
            <TransferFund
              onTransferCoins={this.onTransferCoins}
              contact={contact}
            />
            <MoveList isContact={true} moves={contact.moves} />
            <button
              className="edit-contact-btn"
              onClick={() => {
                this.props.history.push(`/Contacts/edit/` + contactId);
              }}
            >
              <EditIcon />
              Edit
            </button>
            <div className="move-page">
              <button
                onClick={() => {
                  this.prevContactId();
                }}
              >
                <img className="left" src={LeftArrow} alt="" />
                Prev
              </button>
              <button
                onClick={() => {
                  this.nextContactId();
                }}
              >
                Next
                <img className="right" src={RightArrow} alt="" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contact: state.contactsReducer.currContact,
    contactId: state.contactsReducer.currContactId,
    currUser: state.userReducer.currUser,
  };
};
const mapDispatchToProps = {
  getContactById,
  transferCoins,
};

export const ContactDetailsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactDetailsPage);
