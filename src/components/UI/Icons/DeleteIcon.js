import React from 'react';
import SvgWrapper from './SvgWrapper';

const DeleteIcon = props => {
  return (
    <SvgWrapper onClick={props.onClick}>
      <svg className={props.className} viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M17,13H7V11H17M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
        />
      </svg>
    </SvgWrapper>
  );
};

export default DeleteIcon;
