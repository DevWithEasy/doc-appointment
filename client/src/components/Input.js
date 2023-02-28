import handleChange from "../utils/handleChange";

export default function Input(props){
    const {label,type,name,value,setValue} = props
    return (
        <div className=" space-y-1">
            <label>{label} : </label>
            <input type={type} name={name} onChange={(e)=>handleChange(e,value,setValue)} className='w-full p-2 border rounded focus:outline-none focus:ring-2'/>
        </div>
    )
}