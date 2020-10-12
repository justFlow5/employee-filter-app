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

export function formatInputValue(
    selectedItems,
    isTimeInput,
    numberOfInputsToDisplay
) {
    if (!isTimeInput) {
        const inputLength = selectedItems.length;
        if (inputLength <= numberOfInputsToDisplay)
            return selectedItems.join(', ');
        const selectedLeft = inputLength - numberOfInputsToDisplay;
        const displayedValues = selectedItems
            .slice(0, numberOfInputsToDisplay)
            .join(', ');
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
