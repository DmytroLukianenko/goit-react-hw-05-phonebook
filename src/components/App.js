import React, { Component } from 'react';
import { v4 as uniqueId } from 'uuid';
import ContactForm from './ContactForm/ContacForm';
import { ContactList } from './ContactList/ContactList';
import { Container } from './Container/Container';
import { Filter } from './Filter/Filter';
import Section from './Section/Section';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// const initialState = [
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
// ];

class App extends Component {
    state = {
        contacts: [],
        filter: '',
    };

    componentDidMount() {
        const storageContacts = JSON.parse(localStorage.getItem('contacts'));
        if (storageContacts) {
            this.setState({ contacts: storageContacts });
        }
    }

    componentDidUpdate() {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }

    addContact = (name, number) => {
        const { contacts } = this.state;

        if (
            contacts.find(
                contact => contact.name.toLowerCase() === name.toLowerCase(),
            )
        ) {
            toast.error('😲 Contact is already exist!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        const newContact = {
            id: uniqueId(),
            name,
            number,
        };

        this.setState(({ contacts }) => ({
            contacts: [...contacts, newContact],
        }));
    };

    handleFilter = e => {
        this.setState({ filter: e.currentTarget.value });
    };

    getFilteredContacts = () => {
        const { contacts, filter } = this.state;
        const normalizedFilter = filter.toLowerCase().trim();

        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(normalizedFilter),
        );
    };

    deleteContact = e => {
        const deletedId = e.currentTarget.dataset.id;

        this.setState(prevState => ({
            contacts: prevState.contacts.filter(contact => contact.id !== deletedId),
        }));
        e.currentTarget.blur();
    };

    render() {
        const { contacts, filter } = this.state;
        const filteredContacts = this.getFilteredContacts();

        return (

            <Container>

                <Section title="PHONEBOOK">
                    <ContactForm onSubmit={this.addContact} />
                </Section>
                <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Section title="Contacts">
                    <Filter value={filter} onChange={this.handleFilter} />
                    {filter.trim() ? (
                        <ContactList
                            contacts={filteredContacts}
                            deleteHandler={this.deleteContact}
                        />
                    ) : (
                            <ContactList
                                contacts={contacts}
                                deleteHandler={this.deleteContact}
                            />
                        )}
                </Section>

            </Container >
        );
    }
}

export default App;
