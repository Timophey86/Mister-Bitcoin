export default {
  getContacts,
  getContactById,
  deleteContact,
  saveContact,
  getEmptyContact,
};

const contacts = [
  {
    _id: "5a56640269f443a5d64b32ca",
    name: "Ochoa Hyde",
    email: "ochoahyde@renovize.com",
    phone: "+1 (968) 593-3824",
    img: "https://randomuser.me/api/portraits/men/0.jpg",
    moves: []
  },
  {
    _id: "5a5664025f6ae9aa24a99fde",
    name: "Hallie Mclean",
    email: "halliemclean@renovize.com",
    phone: "+1 (948) 464-2888",
    img: "https://randomuser.me/api/portraits/men/1.jpg",
    moves: []
  },
  {
    _id: "5a56640252d6acddd183d319",
    name: "Parsons Norris",
    email: "parsonsnorris@renovize.com",
    phone: "+1 (958) 502-3495",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
    moves: []
  },
  {
    _id: "5a566402ed1cf349f0b47b4d",
    name: "Rachel Lowe",
    email: "rachellowe@renovize.com",
    phone: "+1 (911) 475-2312",
    img: "https://randomuser.me/api/portraits/men/3.jpg",
    moves: []
  },
  {
    _id: "5a566402abce24c6bfe4699d",
    name: "Dominique Soto",
    email: "dominiquesoto@renovize.com",
    phone: "+1 (807) 551-3258",
    img: "https://randomuser.me/api/portraits/men/4.jpg",
    moves: []
  },
  {
    _id: "5a566402a6499c1d4da9220a",
    name: "Shana Pope",
    email: "shanapope@renovize.com",
    phone: "+1 (970) 527-3082",
    img: "https://randomuser.me/api/portraits/men/5.jpg",
    moves: []
  },
  {
    _id: "5a566402f90ae30e97f990db",
    name: "Faulkner Flores",
    email: "faulknerflores@renovize.com",
    phone: "+1 (952) 501-2678",
    img: "https://randomuser.me/api/portraits/men/6.jpg",
    moves: []
  },
  {
    _id: "5a5664027bae84ef280ffbdf",
    name: "Holder Bean",
    email: "holderbean@renovize.com",
    phone: "+1 (989) 503-2663",
    img: "https://randomuser.me/api/portraits/men/7.jpg",
    moves: []
  },
  {
    _id: "5a566402e3b846c5f6aec652",
    name: "Rosanne Shelton",
    email: "rosanneshelton@renovize.com",
    phone: "+1 (968) 454-3851",
    img: "https://randomuser.me/api/portraits/men/8.jpg",
    moves: []
  },
  {
    _id: "5a56640272c7dcdf59c3d411",
    name: "Pamela Nolan",
    email: "pamelanolan@renovize.com",
    phone: "+1 (986) 545-2166",
    img: "https://randomuser.me/api/portraits/men/9.jpg",
    moves: []
  },
  {
    _id: "5a5664029a8dd82a6178b15f",
    name: "Roy Cantu",
    email: "roycantu@renovize.com",
    phone: "+1 (929) 571-2295",
    img: "https://randomuser.me/api/portraits/men/10.jpg",
    moves: []
  },
  {
    _id: "5a5664028c096d08eeb13a8a",
    name: "Ollie Christian",
    email: "olliechristian@renovize.com",
    phone: "+1 (977) 419-3550",
    img: "https://randomuser.me/api/portraits/men/11.jpg",
    moves: []
  },
  {
    _id: "5a5664026c53582bb9ebe9d1",
    name: "Nguyen Walls",
    email: "nguyenwalls@renovize.com",
    phone: "+1 (963) 471-3181",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
    moves: []
  },
  {
    _id: "5a56640298ab77236845b82b",

    name: "Glenna Santana",
    email: "glennasantana@renovize.com",
    phone: "+1 (860) 467-2376",
    img: "https://randomuser.me/api/portraits/men/13.jpg",
    moves: []
  },
  {
    _id: "5a56640208fba3e8ecb97305",
    name: "Malone Clark",
    email: "maloneclark@renovize.com",
    phone: "+1 (818) 565-2557",
    img: "https://randomuser.me/api/portraits/men/14.jpg",
    moves: []
  },
  {
    _id: "5a566402abb3146207bc4ec5",
    name: "Floyd Rutledge",
    email: "floydrutledge@renovize.com",
    phone: "+1 (807) 597-3629",
    img: "https://randomuser.me/api/portraits/men/15.jpg",
    moves: []
  },
  {
    _id: "5a56640298500fead8cb1ee5",
    name: "Grace James",
    email: "gracejames@renovize.com",
    phone: "+1 (959) 525-2529",
    img: "https://randomuser.me/api/portraits/men/16.jpg",
    moves: []
  },
  {
    _id: "5a56640243427b8f8445231e",
    name: "Tanner Gates",
    email: "tannergates@renovize.com",
    phone: "+1 (978) 591-2291",
    img: "https://randomuser.me/api/portraits/men/17.jpg",
    moves: []
  },
  {
    _id: "5a5664025c3abdad6f5e098c",
    name: "Lilly Conner",
    email: "lillyconner@renovize.com",
    phone: "+1 (842) 587-3812",
    img: "https://randomuser.me/api/portraits/men/18.jpg",
    moves: []
  },
];

function sort(arr) {
  return arr.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1;
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1;
    }

    return 0;
  });
}

function getContacts(filterBy = null) {
  return new Promise((resolve, reject) => {
    const contactList = _getContactFromStorage();
    var contactsToReturn;
    if (!contactList) {
      contactsToReturn = contacts;
      _saveContactList(contacts);
    } else {
      contactsToReturn = contactList;
    }
    if (filterBy && filterBy.name) {
      contactsToReturn = filter(filterBy.name);
    }
    resolve(sort(contactsToReturn));
  });
}

function getContactById(id) {
  return new Promise((resolve, reject) => {
    const contactList = _getContactFromStorage();
    if (!contactList) {
      const contact = contacts.find((contact) => contact._id === id);
      contact ? resolve(contact) : reject(`Contact id ${id} not found!`);
      _saveContactList(contacts);
    } else {
      const contact = contactList.find((contact) => contact._id === id);
      contact ? resolve(contact) : reject(`Contact id ${id} not found!`);
    }
  });
}

function deleteContact(id) {
  return new Promise((resolve, reject) => {
    const contactList = _getContactFromStorage();
    if (!contactList) {
      const index = contacts.findIndex((contact) => contact._id === id);
      if (index !== -1) {
        contacts.splice(index, 1);
      }
      _saveContactList(contacts);
      resolve(contacts);
    } else {
      const index = contactList.findIndex((contact) => contact._id === id);
      if (index !== -1) {
        contactList.splice(index, 1);
      }
      _saveContactList(contactList);
      resolve(contactList);
    }
  });
}

function _updateContact(contact) {
  return new Promise((resolve, reject) => {
    const contactList = _getContactFromStorage();
    if (!contactList) {
      const index = contacts.findIndex((c) => contact._id === c._id);
      if (index !== -1) {
        contacts[index] = contact;
      } else {
        reject();
      }
      _saveContactList(contacts);
      resolve(contact);
    } else {
      const index = contactList.findIndex((c) => contact._id === c._id);
      if (index !== -1) {
        contactList[index] = contact;
      } else {
        reject();
      }
      _saveContactList(contactList);
      resolve(contact);
    }
  });
}

function _addContact(contact) {
  return new Promise((resolve, reject) => {
    const contactList = _getContactFromStorage();
    if (!contactList) {
      contact._id = _makeId();
      contacts.push(contact);
      _saveContactList(contacts);
      resolve(contact);
    } else {
      contact._id = _makeId();
      contactList.push(contact);
      _saveContactList(contactList);
      resolve(contact);
    }
  });
}

function saveContact(contact) {
  return contact._id ? _updateContact(contact) : _addContact(contact);
}

function getEmptyContact() {
  return {
    name: "",
    email: "",
    phone: "",
    img: "https://randomuser.me/api/portraits/men/38.jpg",
    moves: []
  };
}

function filter(term) {
  term = term.toLocaleLowerCase();
  return contacts.filter((contact) => {
    return (
      contact.name.toLocaleLowerCase().includes(term) ||
      contact.phone.toLocaleLowerCase().includes(term) ||
      contact.email.toLocaleLowerCase().includes(term)
    );
  });
}

function _makeId(length = 10) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function _saveContactList(contacts) {
  sessionStorage.setItem("contacts", JSON.stringify(contacts));
  return contacts;
}

function _getContactFromStorage() {
  return JSON.parse(sessionStorage.getItem("contacts"));
}
