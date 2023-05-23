function getTimeValue(d) {
    var dateString = d
    var parts = dateString.split("-")
    var date = new Date(parts[2], parts[1] - 1, parts[0])

    date.setHours(23, 59, 0, 0)

    var time = date.getTime()

    return time
}

module.exports = getTimeValue