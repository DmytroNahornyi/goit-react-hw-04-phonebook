// import React from 'react';
// import { nanoid } from 'nanoid';
// import { AppContainer, Title } from './phonebook/Phonebook.styled';
// import ContactForm from './phonebook/ContactForm/ContactForm';
// import ContactList from './phonebook/ContactList/ContactList';
// import Filter from './phonebook/Filter/Filter';

// class App extends React.Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

// componentDidMount() {
//   const savedContacts = localStorage.getItem('contacts');
//   if (savedContacts) {
//     this.setState({ contacts: JSON.parse(savedContacts) });
//   }
// }

// componentDidUpdate(prevProps, prevState) {
//   if (prevState.contacts !== this.state.contacts) {
//     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//   }
// }

//   addContact = ({ name, number }) => {
//     const { contacts } = this.state;
//     const contact = {
//       id: nanoid(),
//       name,
//       number,
//     };
//     const isExist = contacts.some((contact) => contact.name.toLowerCase() === name.toLowerCase());
//     if (isExist) {
//       alert(`${name} is already in contacts.`);
//       return;
//     }
//     this.setState((prevState) => ({
//       contacts: [...prevState.contacts, contact],
//     }));
//   };

//   deleteContact = (id) => {
//     this.setState((prevState) => ({
//       contacts: prevState.contacts.filter((contact) => contact.id !== id),
//     }));
//   };

//   changeFilter = ({ target }) => {
//     this.setState({ filter: target.value });
//   };

//   getFilteredContacts = () => {
//     const { contacts, filter } = this.state;
//     return contacts.filter((contact) =>
//       contact.name.toLowerCase().includes(filter.toLowerCase()),
//     );
//   };

//   render() {
//     const { filter } = this.state;
//     const filteredContacts = this.getFilteredContacts();
//     return (
//       <AppContainer>
//         <Title>Phonebook</Title>
//         <ContactForm onAddContact={this.addContact} />
//         <h2>Contacts</h2>
//         <Filter value={filter} onChange={this.changeFilter} />
//         <ContactList contacts={filteredContacts} onDeleteContact={this.deleteContact} />
//       </AppContainer>
//     );
//   }
// }

// export default App;

import React, { useState, useCallback, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { AppContainer, Title } from './phonebook/Phonebook.styled';
import ContactForm from './phonebook/ContactForm/ContactForm';
import ContactList from './phonebook/ContactList/ContactList';
import Filter from './phonebook/Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) ?? [
        { id: nanoid(), name: 'Mother', number: '34798436745986745' },
      ]
  );

  const [filter, setFilter] = useState('');
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = useCallback(
    ({ name, number }) => {
      const isExist = contacts.some(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );
      if (isExist) {
        alert(`${name} is already in contacts.`);
        return;
      }
      const contact = {
        id: nanoid(),
        name,
        number,
      };
      setContacts(prevContacts => [...prevContacts, contact]);
    },
    [contacts]
  );

  const deleteContact = useCallback(id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  }, []);

  const changeFilter = useCallback(({ target }) => {
    setFilter(target.value);
  }, []);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <AppContainer>
      <Title>Phonebook</Title>
      <ContactForm onAddContact={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </AppContainer>
  );
};