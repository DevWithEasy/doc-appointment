import React from 'react';
import handleChange from '../utils/handleChange';

const D_Input = (props) => {
    const {label,type,name,c_value,value,setValue} = props
    return (
        <div className=" space-y-1">
            <label>{label} </label>
            <input 
                type={type ? type : 'text'} 
                name={name}
                value={c_value ? c_value : ''}
                onChange={(e)=>handleChange(e,value,setValue)}
                className="w-full p-2 border-b focus:outline-none focus:border-blue-300"
            />
        </div>
    );
};

export default D_Input;