const getObjectId=(data)=>{
    const objectId = 'new ObjectId("649d7c4abfe94f5957506bba")';
    const pattern = /[a-fA-F0-9]{24}/;
    const extractedValue = objectId.match(pattern)[0];
    return extractedValue
}

module.exports =  getObjectId