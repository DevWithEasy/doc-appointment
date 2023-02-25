const handleChange=(e,value,setValue)=>{
    const newValue = {...value}
    newValue[e.target.name] = e.target.value
    setValue(newValue)
}
export default handleChange;