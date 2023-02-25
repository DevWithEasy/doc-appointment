const passwordView=(type,setType)=>{
    if(type === 'password'){
        setType('text')
    }else{
        setType('password')
    }
}
export default passwordView;