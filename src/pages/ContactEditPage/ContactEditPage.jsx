import { Component } from "react";
import { connect } from "react-redux";
import contactService from "../../services/contactService";
import {
  getContactById,
  saveContact,
} from "../../store/actions/contactsAction";

import "./ContactEditPage.scss";

class _ContactEditPage extends Component {
  state = {
    contact: null,
    errMsg: null,
  };

  async componentDidMount() {
    this.getContact(this.props.match.params.id);
  }

  async getContact(id) {
    if (id) {
      try {
        await this.props.getContactById(id);
        this.setState({ contact: this.props.contact });
      } catch {
        this.setState({ errMsg: `Couldn't find contact` });
      }
    } else {
      const contact = contactService.getEmptyContact();
      this.setState({ contact });
    }
  }

  handelChange = ({ target }) => {
    const field = target.name;
    const value = target.type === "number" ? +target.value : target.value;
    this.setState((prevState) => ({
      contact: { ...prevState.contact, [field]: value },
    }));
  };

  saveContact = async (ev) => {
    ev.preventDefault();
    await this.props.saveContact({ ...this.state.contact });
    this.props.history.push(`/Contacts/`);
  };

  render() {
    if (!this.state.contact)
      return <div className="loading">{this.state.errMsg || "Loading..."}</div>;
    const { name, email, phone } = this.state.contact;
    return (
      <form className="contact-edit" onSubmit={this.saveContact}>
        <label htmlFor="name">
          Name:
          <input
            required
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={this.handelChange}
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            required
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={this.handelChange}
          />
        </label>
        <label htmlFor="phone">
          Phone:
          <input
            required
            type="text"
            id="phone"
            name="phone"
            value={phone}
            onChange={this.handelChange}
          />
        </label>
        <button>Save Contact</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    contact: state.contactsReducer.currContact,
  };
};
const mapDispatchToProps = {
  getContactById,
  saveContact,
};
export const ContactEditPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactEditPage);
