const handleChange=(e,value,setValue)=>{
    
    const newValue = {...value}

    if(e.target.name === 'dob' || e.target.name === 'donateDate'){
        newValue[e.target.name] = `${e.target.value}T00:00:00.000Z`
        return setValue(newValue)
    }
    
    newValue[e.target.name] = e.target.value

    setValue(newValue)

}
export default handleChange;