import React from 'react';
import DeleteIcon from './Icons/DeleteIcon';
import EditIcon from './Icons/EditIcon';
import styles from './ActionTableIcons.module.scss';

const ActionTableIcons = props => {
  return (
    <div className={styles.ActionIcons}>
      <span>
        <EditIcon className={styles.Edit} onClick={props.onEdit} />
      </span>
      <span> | </span>
      <span>
        <DeleteIcon className={styles.Delete} onClick={props.onDelete} />
      </span>
    </div>
  );
};

export default ActionTableIcons;
