import React from 'react';
import styles from './Label.module.scss';

interface ILabel {
  text: string,
  required: boolean
}

export default function Label({ text, required = false }: ILabel) {
  return (
    <div className={styles.labelContainer}>
      {/*  eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label title={text}>
        {text}
        {required ? <sup> *</sup> : null}
      </label>
    </div>
  );
}
