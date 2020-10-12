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

export function formatInputValue(selectedItems, isTimeInput) {
    if (!isTimeInput) {
        const inputLength = selectedItems.length;
        if (inputLength < 3) return selectedItems.join(', ');
        const selectedLeft = inputLength - 2;
        const displayedValues = selectedItems.slice(0, 2).join(', ');
        return `${displayedValues} + ${selectedLeft}`;
    } else {
        const { startDate, endDate } = selectedItems;
        if (startDate && endDate)
            return `${formatDate(startDate, 'DD.MM')} - ${formatDate(
                endDate,
                'DD.MM'
            )}`;
        else return '';
    }
}
