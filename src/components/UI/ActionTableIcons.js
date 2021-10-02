import React from 'react';
import EditIcon from '@material-ui/icons/Edit';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocalGroceryStoreIcon from '@material-ui/icons/LocalGroceryStore';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Divider from '@material-ui/core/Divider';
import styles from './ActionTableIcons.module.scss';

const ActionTableIcons = props => {
  return (
    <div className={styles.ActionIcons}>
      <span>
        <EditIcon
          fontSize='medium'
          className={styles.Edit}
          onClick={props.onEdit}
        />
      </span>
      <span>
        <Divider orientation='vertical' />
      </span>
      <span>
        <MonetizationOnIcon
          onClick={props.onEditBalance}
          fontSize='medium'
          className={styles.Currency}
        />
      </span>
      <span>
        <Divider orientation='vertical' />
      </span>
      <span>
        <LocalGroceryStoreIcon fontSize='medium' className={styles.View} />
      </span>
      <span>
        <Divider orientation='vertical' />
      </span>
      <span>
        <BackspaceIcon
          fontSize='medium'
          className={styles.Delete}
          onClick={props.onDelete}
        />
      </span>
    </div>
  );
};

export default ActionTableIcons;
