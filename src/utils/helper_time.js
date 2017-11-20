/// helper function that will return how long its been since a particular timestamp
// this is helpful to display things like an object was updated x seconds/minutes/hours/days ago
export const calcTimeSince = (timestamp) => {
    const timeDifference = Date.now() - timestamp
    const timeInSeconds = timeDifference / 1000
    const timeInMinutes = timeInSeconds / 60
    const timeInHours = timeInMinutes / 60
    const timeInDays = timeInHours / 24
    const timeInMonths = timeInDays/30   ////use with caution: generalizes a month being 30 days.
    const timeInYears = timeInDays/365   /// doesn't check for leap year

    if (timeInSeconds < 60) {
        return `${Math.trunc(timeInSeconds)} seconds ago`
    } if (timeInSeconds >= 60 && timeInSeconds < 3600) {
        return `${Math.trunc(timeInMinutes)} minutes ago`
    } if (timeInMinutes >= 60 && timeInMinutes < 1440) {
        return `${Math.trunc(timeInHours)} hours ago`
    } if (timeInHours >= 24 && timeInHours<=43200) {
        return `${Math.trunc(timeInDays)} days ago`
    } if (timeInDays >= 30) {
        return `${Math.trunc(timeInMonths)} months ago`
    } if (timeInDays > 365) {
        return `${Math.trunc(timeInYears)} year(s) ago`
    }

}