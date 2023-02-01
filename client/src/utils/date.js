export const convertDateToHumanReadable = (date, format) => {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yy: date.getFullYear().toString().slice(-2),
        yyyy: date.getFullYear()
    };
    return format.replace(/mm|dd|yy|yyyy/gi, (matched) => map[matched]);
}