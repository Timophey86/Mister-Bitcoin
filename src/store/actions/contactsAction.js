import contactService from "../../services/contactService";

//THUNK ACTION DISPACHER
export function loadContacts(filterBy) {
  return async (dispatch) => {
    const contacts = await contactService.getContacts(filterBy);
    const action = {
      type: "SET_CONTACTS",
      contacts,
    };
    dispatch(action);
  };
}

export function removeContact(contactId) {
  return async (dispatch) => {
    await contactService.deleteContact(contactId);
    const action = {
      type: "DELETE_CONTACT",
      contactId,
    };
    dispatch(action);
  };
}

export function getContactById(contactId) {
  return async (dispatch) => {
    const contact = await contactService.getContactById(contactId);
    const action = {
      type: "SET_CONTACT",
      contact,
      contactId,
    };
    dispatch(action);
  };
}

export function saveContact(contactToSave) {
  return async (dispatch) => {
    const updatedContact = await contactService.saveContact(contactToSave);
    const action = {
      type: "UPDATE_CONTACT",
      updatedContact,
    };
    dispatch(action);
  };
}
