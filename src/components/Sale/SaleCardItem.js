import React from 'react';

const SaleCardItem = (props) => {
    const {className, label, text } = props;
    return (
        <div className={className}>
            <label>{label}</label>
            <p>{text}</p>
        </div>
    );
}

export default SaleCardItem;