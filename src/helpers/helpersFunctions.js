import moment from 'moment';

export function formatDate(date, formatType) {
    return moment(date).format(formatType);
}

export function arrayEquals(a, b) {
    return (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index])
    );
}
