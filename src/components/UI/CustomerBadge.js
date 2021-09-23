import React from 'react';
import Chip from '@material-ui/core/Chip';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import colors from './../../utilities/colors.module.scss';

const CustomerBadge = props => {
  const { text, color } = props;
  return (
    <Chip
      icon={<AccountCircleRoundedIcon style={{ color: colors[color] }} />}
      label={text}
      variant='outlined'
      style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}
    />
  );
};

export default CustomerBadge;
