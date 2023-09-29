import { io } from 'socket.io-client'

// eslint-disable-next-line no-undef
const socket = io(process.env.NODE_ENV === 'production' ? 'https://amaderdoctor.vercel.app' : 'http://localhost:8080')

export default socket