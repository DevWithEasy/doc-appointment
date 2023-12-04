const AppointmentStatusBangla = (value) => {
    switch (value) {
        case 'Confirmed':
            return 'নিশ্চিত করা হয়েছে'
        case 'Pending':
            return 'অপেক্ষামান রয়েছে'

        case 'Rejected':
            return 'ডাক্তার বাতিল করেছেন '
        case 'Canceled':
            return 'বাতিল করা হয়েছে '
        case 'Completed':
            return 'সম্পন্ন হয়েছে '
        default:
            return 'আপনি কোন তথ্য প্রবেশ করেননি '
    }
}

export default AppointmentStatusBangla;