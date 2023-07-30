function dayNameBangla(day) {
  switch (day) {
    case "Saturday":
      return "শনিবার";

    case "Sunday":
      return "রবিবার";

    case "Monday":
      return "সোমবার";

    case "Tuesday":
      return "মঙ্গলবার";

    case "Wednesday":
      return "বুধবার";

    case "Thursday":
      return "বৃহস্পতিবার";

    case "Friday":
      return "শুক্রবার";

    default:
      return "আপনি কোন দিন প্রবেশ করান নি।";
  }
}
export default dayNameBangla;