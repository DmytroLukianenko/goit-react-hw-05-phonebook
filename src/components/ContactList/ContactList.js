import React from 'react';
import PropTypes from 'prop-types';
import { Contact } from './Contact';
import styles from './ContactList.module.css';
import { TransitionGroup } from 'react-transition-group';


export const ContactList = ({ contacts, deleteHandler }) => {
    return (
        <TransitionGroup component="ul" className={styles.list}>
            {contacts.map(contact =>

                Contact({
                    id: contact.id,
                    name: contact.name,
                    phone: contact.number,
                    deleteHandler,
                })
            )}
        </TransitionGroup>
    );
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.object),
};

