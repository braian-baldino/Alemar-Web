import React from 'react';

const ListItem = props => {
  const { item, keys } = props;
  return (
    <div
      style={{
        borderRadius: '12px',
        backgroundColor: '#eee',
        display: 'flex',
        justifyContent: 'space-around',
      }}
    >
      {keys.map((key, i) => {
        return <p key={i}>{item[key]}</p>;
      })}
    </div>
  );
};

export default ListItem;
