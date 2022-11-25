import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import {
  Container,
  TitlePhonebook,
  TitleContacts,
  Description,
} from './App.styled';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(() => {return JSON.parse(localStorage.getItem('contacts')) || []});
  const [filter, setFilter] = useState('');

  useEffect(() => {
  localStorage.setItem('contacts', JSON.stringify(contacts))
    }, [contacts]);

  function addContacts (name, number) {
    const contactEl = {
      id: nanoid(),
      name,
      number,
    };

    const isDublicate = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    isDublicate
      ? alert(`${name} is already in contacts list`)
      : setContacts ([contactEl, ...contacts]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };
    const normalizeFilter = filter.toLowerCase();
    const visibleContacts = contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(normalizeFilter) ||
        contact.number.includes(filter)
    );

    return (
      <Container>
        <TitlePhonebook>Phonebook</TitlePhonebook>
        <ContactForm addContacts={addContacts} />
        <TitleContacts>Contacts</TitleContacts>
        {contacts.length === 0 ? (
          <Description>Please, enter your first contact</Description>
        ) : (
          <>
            <Filter valueFilter={filter} onChangeFilter={changeFilter} />
            <ContactList
              visible={visibleContacts}
              onDeleteContact={deleteContact}
            />
          </>
        )}
      </Container>
    );
  }
