import React from 'react';

const styles = {
  cursor: 'pointer',
};

const SvgWrapper = props => {
  return (
    <div style={styles} onClick={props.onClick}>
      {props.children}
    </div>
  );
};

export default SvgWrapper;
