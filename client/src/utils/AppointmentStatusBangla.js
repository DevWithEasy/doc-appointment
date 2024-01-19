const AppointmentStatusBangla = (value) => {
    switch (value) {
        case 'Confirmed':
            return 'নিশ্চিত করা হয়েছে'
            break;
        case 'Pending':
            return 'অপেক্ষামান রয়েছে'
            break;
        case 'Rejected':
            return 'ডাক্তার বাতিল করেছেন '
            break;
        case 'Canceled':
            return 'বাতিল করা হয়েছে '
            break;
        case 'Completed':
            return 'সম্পন্ন হয়েছে '
            break;
        default:
            return 'আপনি কোন তথ্য প্রবেশ করেননি '
    }
}

export default AppointmentStatusBangla;