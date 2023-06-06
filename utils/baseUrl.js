const api_url = process.env.NODE_ENV === 'production' ? 'https://amaderdoctor.onrender.com' : 'http://localhost:8080'
const ui_url = process.env.NODE_ENV === 'production' ? 'https://amaderdoctor.onrender.com' : 'http://localhost:3000'

module.exports = {api_url, ui_url}