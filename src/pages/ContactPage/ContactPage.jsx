import { Component } from "react";
import { ContactList } from "../../components/ContactList";
import "./ContactPage.scss";
import { ContactFilter } from "../../components/ContactFilter";
import { connect } from "react-redux";
import AddUser from "../../assets/images/add-user-svgrepo-com.svg"
import {
  loadContacts,
  removeContact,
} from "../../store/actions/contactsAction";

class _ContactPage extends Component {
  state = {
    filterBy: null,
  };

  async componentDidMount() {
    this.props.loadContacts(this.state.filterBy);
  }

  getContacts(filterBy = this.state.filterBy) {
    this.props.loadContacts(filterBy);
  }

  removeContact = async (contactId) => {
    await this.props.removeContact(contactId);
    this.props.history.push(`/Contacts/`);
  };

  onChangeFilterBy = (filterBy) => {
    this.setState({ filterBy: filterBy }, this.getContacts);
  };

  render() {
    const { contacts } = this.props;
    return (
      <div className="contactPage-container">
        {
          <div className="contactPage">
            <ContactFilter onChangeFilterBy={this.onChangeFilterBy} />
            <ContactList
              contacts={contacts}
              removeContact={this.removeContact}
            />
            <button className="add-contact-btn"
              onClick={() => {
                this.props.history.push(`/Contacts/edit/`);
              }}
            >
              <img className="add-user-img" src={AddUser} alt=""/>
              Add Contact
            </button>
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contacts: state.contactsReducer.contacts,
  };
};
const mapDispatchToProps = {
  loadContacts,
  removeContact,
};
export const ContactPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactPage);
