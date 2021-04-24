import contactService from "./contactService";

export const userService = {
  getUser,
  login,
  signup,
  addMove,
  getUsers
};

var gCurrUser = {
  name: "Reggie Wallace",
  coins: 100,
  password: 123,
  moves: [],
};

const gUsers = [
  {
    name: "Reggie Wallace",
    coins: 100,
    password: 123,
    moves: [],
  },
  {
    name: "Tubby White",
    coins: 100,
    password: 123,
    moves: [],
  },
];

async function addMove(move) {
  const contacts = await contactService.getContacts();
  const recivingContact = contacts.find((c) => c._id === move.toId);
  recivingContact.moves.push(move);
  const updatedContact = await contactService.saveContact(recivingContact);
  const userMakingMove = await getByUsername(move.fromUser.name);
  userMakingMove.moves.push(move);
  userMakingMove.coins = userMakingMove.coins - move.amount;
  const updatedUser = updateUser(userMakingMove);
  _saveLocalUser(updatedUser);
  const actionObj = {
    updatedUser,
    updatedContact,
  };
  return actionObj;
}

function getUser() {
  return { ...gCurrUser };
}

function getUsers() {
  const users = _getUsersFromStorage();
  if (!users) {
    _saveUsersList(gUsers)
    return [ ...gUsers ];
  }
  return users
}

async function login(username, password) {
  const user = await getByUsername(username);
  if (!user) return Promise.reject("Invalid username or password");
  const match = user.password === password ? true : false;
  if (!match) return Promise.reject("Invalid username or password");
  _saveLocalUser(user);
  return user;
}

async function signup(user) {
  if (!user.name || !user.password)
    return Promise.reject("fullname, username and password are required!");
  return Promise.resolve(addUser(user));
}

async function addUser(user) {
  try {
    const users = _getUsersFromStorage();
    if (!users) {
      gUsers.push(user);
      _saveLocalUser(user);
      _saveUsersList(gUsers);
    } else {
      users.push(user);
      _saveLocalUser(user);
      _saveUsersList(users);
    }
    return user;
  } catch (err) {
    throw err;
  }
}

function updateUser(user) {
  const users = _getUsersFromStorage();
  if (!users) {
    const index = gUsers.findIndex((u) => u.name === user.name);
    gUsers[index] = user;
    _saveUsersList(gUsers);
    return user;
  } else {
    const index = users.findIndex((u) => u.name === user.name);
    users[index] = user;
    _saveUsersList(users);
    return user;
  }
}

async function getByUsername(username) {
  try {
    var user;
    const users = _getUsersFromStorage();
    if (!users) {
      user = gUsers.find((user) => user.name === username);
    } else {
      user = users.find((user) => user.name === username);
    }
    return user;
  } catch (err) {
    throw err;
  }
}

function _saveLocalUser(user) {
  sessionStorage.setItem("loggedInUser", JSON.stringify(user));
  return user;
}
function _saveUsersList(users) {
  sessionStorage.setItem("users", JSON.stringify(users));
  return users;
}

function _getUsersFromStorage() {
  return JSON.parse(sessionStorage.getItem("users"));
}
