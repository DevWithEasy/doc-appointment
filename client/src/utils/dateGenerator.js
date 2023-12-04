export default function dateGenerator(value){
    const date = new Date(value);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return (`${day.toString().padStart(2, "0")}-${month.toString().padStart(2, "0")}-${year}`)
}