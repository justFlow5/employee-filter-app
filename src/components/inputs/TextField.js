import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const FormField = styled('div')`
    display: block;
    margin-bottom: 16px;
    width: 100%;
    position: relative;
    z-index: 0;

    &.isActive {
        & > .control {
            &::after {
                border-bottom: 2px solid
                    ${(props) => props.theme.colors.primary};

                transform: scaleX(150);
            }
        }
        & label {
            color: ${(props) => props.theme.colors.primary};
            font-size: 0.75rem;
            transform: translateY(-14px);
        }
    }

    &.isFilled {
        & label {
            font-size: 0.75rem;
            transform: translateY(-14px);
        }
    }

    &.timeType {
        position: absolute;
        top: 0;
        left: 0;

        & input,
        & label {
            padding-left: 50px;
        }
    }
`;

const FormFieldControl = styled('div')`
    background: ${(props) => props.theme.colors.bgSecondary};
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    position: relative;
    width: 100%;

    &::after {
        border-bottom: 2px solid ${(props) => props.theme.colors.primary};
        bottom: 0;
        content: '';
        display: block;
        left: 0;
        margin: 0 auto;
        position: absolute;
        right: 0;
        transform: scaleX(0);
        transition: all 0.4s;
        width: 1%;
    }
`;

const FormFieldLabel = styled('label')`
    display: block;
    font-size: 18px;
    font-weight: normal;
    left: 0;
    margin: 0;
    padding: 18px 12px 0;
    position: absolute;
    top: 0;
    transition: all 0.4s;
    width: 100%;
    text-transform: capitalize;
`;

const FormFieldInput = styled('input')`
    appearance: none;
    background: transparent;
    border: 0;
    border-bottom: 1px solid ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.black};
    display: block;
    font-size: 18px;
    margin-top: 24px;
    outline: 0;
    padding: 0 12px 5px 12px;
    width: 100%;
`;

const TextField = ({
    selectedData,
    clickedOutside,
    id,
    isTimeInput,
    labelText,
    isAllFiltersFilled = true,
}) => {
    const formatDate = (date) => {
        return moment(date).format('DD.MM');
    };

    const formatInputValue = (selectedItems) => {
        if (!isTimeInput) {
            const inputLength = selectedItems.length;
            if (inputLength < 3) return selectedItems.join(', ');
            const selectedLeft = inputLength - 2;
            const displayedValues = selectedItems.slice(0, 2).join(', ');
            return `${displayedValues} + ${selectedLeft}`;
        } else {
            const { startDate, endDate } = selectedItems;
            if (startDate && endDate)
                return `${formatDate(startDate)} - ${formatDate(endDate)}`;
            else return '';
        }
    };

    const [isActive, setIsActive] = useState('');
    const [isFilled, setIsFilled] = useState('');
    const inputRef = useRef();

    useEffect(() => {
        if (!clickedOutside && isAllFiltersFilled) setIsActive('isActive');
        else setIsActive('');
    }, [clickedOutside]);

    useEffect(() => {
        inputRef.current.value.length > 0
            ? setIsFilled('isFilled')
            : setIsFilled('');
    }, [selectedData]);

    return (
        <FormField
            className={`${isFilled} ${isActive} ${
                isTimeInput ? 'timeType' : ''
            } `}
        >
            <FormFieldControl className="control">
                <FormFieldLabel htmlFor={id}>{labelText}</FormFieldLabel>
                <FormFieldInput
                    id={id}
                    value={formatInputValue(selectedData)}
                    readOnly={true}
                    ref={inputRef}
                />
            </FormFieldControl>
        </FormField>
    );
};
export default TextField;
