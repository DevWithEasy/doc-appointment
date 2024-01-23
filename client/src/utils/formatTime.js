import {toBengaliNumber} from 'bengali-number'

export default function formatTime(inputTime) {
  const [hours, minutes] = inputTime.split(':');
  const parsedHours = parseInt(hours, 10);
  const formattedHours = (parsedHours % 12 || 12).toString().padStart(2, '0');
  const formattedMinutes = minutes.padStart(2, '0');
  const period = parsedHours < 12 ? 'am' : 'pm';

  return toBengaliNumber(`${formattedHours}:${formattedMinutes} ${period}`)
}