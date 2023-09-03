import { promises as fs } from "fs";
import { nanoid } from "nanoid";

import getContactsPath from "./db/index.js";

const contactsPath = getContactsPath();

async function listContacts() {
  const data = await fs.readFile(contactsPath);

  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contactsList = await listContacts();
  const contact = contactsList.find((contact) => contact.id === contactId);
  if (contact) {
    return contact;
  }

  return null;
}

async function removeContact(contactId) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }

  const [result] = contactsList.splice(index, 1);

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return result;
}

async function addContact(data) {
  const contactsList = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };

  contactsList.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));

  return newContact;
}

export { listContacts, getContactById, removeContact, addContact };
