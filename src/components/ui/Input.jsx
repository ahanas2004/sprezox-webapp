import React from 'react';
import styles from './Input.module.css';

export const Input = ({ label, type = 'text', ...props }) => (
  <div className={styles.field}>
    {label && <label className={styles.label}>{label}</label>}
    <input type={type} className={styles.input} {...props} />
  </div>
);

export const Textarea = ({ label, ...props }) => (
    <div className={styles.field}>
        {label && <label className={styles.label}>{label}</label>}
        <textarea className={styles.textarea} {...props}></textarea>
    </div>
);

export const Select = ({ label, children, ...props }) => (
    <div className={styles.field}>
        {label && <label className={styles.label}>{label}</label>}
        <select className={styles.input} {...props}>
            {children}
        </select>
    </div>
);