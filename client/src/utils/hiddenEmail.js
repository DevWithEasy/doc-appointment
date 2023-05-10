const hiddenEmail=(email)=>{
    if(email){
        const e= email.split("@")
        const address = e[0]
        const domain = e[1]
        const last1 = address.charAt(address.length - 1)
        const last2 = address.charAt(address.length - 2)
        const last3 = address.charAt(address.length - 3)
        const last4 = address.charAt(address.length - 4)
        const mail= `********${last4+''+last3+''+last2+''+last1+'@'+domain}`
        return mail
    }
}
export default hiddenEmail