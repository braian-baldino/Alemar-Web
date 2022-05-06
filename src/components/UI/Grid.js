import React from 'react';
import styles from './Grid.module.scss';

const Grid = props => {
  const { firstChild, secondChild } = props;
  return (
    <section>
      <div className={styles.row}>
        <div className={styles['grid-col']}>{firstChild}</div>
        <div className={styles['grid-col']}>{secondChild}</div>
      </div>
    </section>
  );
};

export default Grid;
