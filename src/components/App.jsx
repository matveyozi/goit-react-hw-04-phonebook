import React, { Component, useState } from 'react'
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList'
import Title from './Title/Title';
import Section from './Section/Section';

import {useLocalStorage} from '../hooks/useLocalStorage'

const initialContacts = [
  {name: 'dsadsa',
  number:12312312}
]

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', initialContacts)
  const [filter, setFilter] = useState()

  const filterContact = (event) => {
    setFilter(
      event.target.value
    )
  }

  const handleFilterContact = () => {
    return contacts.filter(item => {
      return item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase().trim()) || item.number.toLocaleLowerCase().includes(filter.toLocaleLowerCase().trim())
    })
  }

  const addContact = (contact) => {
    if (contact.name && contact.number) {
      if (!contacts.some(({ name }) => name === contact.name)) {
        setContacts(prevState => [...prevState, contact])
      } else {
        alert(`${contact.name} is already in contacts`);
        return;
      }
      
    } else {
      alert('Need add Name or Number')
      return;
    }
  }
  const deleteContacts = (id) => {
    setContacts(prevState => {
      return prevState.filter(contact => contact.id !== id)
          })
  }
  
  
  
  const filteredContact = handleFilterContact()
    return (
      <Section>
        <Title title={'Phonebook'}></Title>
        <ContactForm addContact={addContact} />
        <Filter handleChange={filterContact} value={filter} />
        <Title title={'Contacts'}/>
        <ContactList deleteContacts={deleteContacts} contacts={filteredContact} />

    </Section>
    )
}


// export default class App extends Component {
//   state = {
//     contacts: [
      
//     ],
//     filter: ''
//   };

//   componentDidMount() {
//     const localData = localStorage.getItem('contacts');
//     if (localData) {
//       this.setState({ contacts: JSON.parse(localData) })
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {

//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
//     }
//   }

//   filterContact = (event) => {
//     this.setState({
//       filter: event.target.value
//     })
//   }

//   handleFilterContact = () => {
//     return this.state.contacts.filter(item => {
//       return item.name.toLocaleLowerCase().includes(this.state.filter.toLocaleLowerCase().trim()) || item.number.toLocaleLowerCase().includes(this.state.filter.toLocaleLowerCase().trim())
//     })
//   }

//   addContact = (contact) => {
//     if (contact.name && contact.number) {
//       if (!this.state.contacts.some(({ name }) => name === contact.name)) {
//         this.setState(prevState => {
//           return {
//             contacts: [...prevState.contacts, contact]
//           }
//         })
//       } else {
//         alert(`${contact.name} is already in contacts`);
//         return;
//       }
      
//     } else {
//       alert('Need add Name or Number')
//       return;
//     }
//   }
//   deleteContacts = (id) => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(contact => contact.id !== id)
//       }
//     })
//   }
//   render() {
//     const filteredContact = this.handleFilterContact()
//     return (
//       <Section>
//         <Title title={'Phonebook'}></Title>
//         <ContactForm addContact={this.addContact} />
//         <Filter handleChange={this.filterContact} value={this.state.filter} />
//         <Title title={'Contacts'}/>
//         <ContactList deleteContacts={this.deleteContacts} contacts={filteredContact} />

//       </Section>
//     )
//   }
// }

