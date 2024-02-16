import React from 'react';

const CustomSelector = ({selectorIdName, labelName, options, unit, onChange, value }) => {
    return (
        <>
        <label htmlFor={selectorIdName}>{labelName}</label>
            <select id={selectorIdName} name={selectorIdName} onChange={onChange} value={value} >
                {options.map((item, index) => (
                    <option key={index} value={item.value}>{item.value}</option>
                ))}
            </select>
            {unit?<span className="input-unit">{unit}</span> : null}
        </>
    )
}

export default CustomSelector;