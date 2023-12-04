export default function statusColor(status){
    if (status === 'Approved'){
        return 'text-blue-500'
    }else if (status === 'Confirmed'){
        return 'text-blue-500'
    }else if (status === 'Completed'){
        return 'text-green-500'
    }else if (status === 'Rejected'){
        return 'text-red-500'
    }
}