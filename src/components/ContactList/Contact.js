import React from 'react';
import PropTypes from 'prop-types';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import styles from './Contact.module.css';
import { CSSTransition } from 'react-transition-group';
import './Contact.css'

export const Contact = ({ id, name, phone, deleteHandler }) => {
    return (
        <CSSTransition
            key={id}
            timeout={250}
            classNames="contactList"
            unmountOnExit
        >
            <li key={id} className={styles.contact}>
                <span className={styles.name}>
                    <AccountBoxIcon className={styles.icon} />
                    {name}
                </span>

                <span className={styles.phone}>
                    <SmartphoneIcon className={styles.icon} />
                    {phone}
                </span>

                <button className={styles.btn} onClick={deleteHandler} data-id={id}>
                    Delete
      </button>
            </li>
        </CSSTransition >
    );
}

Contact.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    deleteHandler: PropTypes.func.isRequired,
};

