import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styles from './Section.module.css';
import './section.css'

export const Section = ({ title, children }) => {
    return (
        <section className={styles.section} >

            <CSSTransition
                in={true}
                timeout={500}
                classNames='mainTitle'
                appear
                unmountOnExit
            >
                <p className={styles.title}>{title}</p>
            </CSSTransition>
            {children}
        </section >
    );
}

export default Section;