import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const FormField = styled('div')`
    display: block;
    margin-bottom: 16px;
    width: 100%;
    position: relative;
    z-index: 0;

    &.isActive {
        & > .control {
            &::after {
                border-bottom: 2px solid #ff6b01;
                transform: scaleX(150);
            }
        }
        & label {
            color: #ff6b01;
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
    background: #fff;
    border-radius: 8px 8px 0 0;
    overflow: hidden;
    position: relative;
    width: 100%;

    &::after {
        border-bottom: 2px solid #ff6b01;
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
    font-size: 1.2rem;
    font-weight: normal;
    left: 0;
    margin: 0;
    padding: 18px 12px 0;
    position: absolute;
    top: 0;
    transition: all 0.4s;
    width: 100%;
`;

const FormFieldInput = styled('input')`
    appearance: none;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #999;
    color: #333;
    display: block;
    font-size: 1.2rem;
    margin-top: 24px;
    outline: 0;
    padding: 0 12px 10px 12px;
    width: 100%;
`;

const TextField = ({ checkboxValues, clickedOutside, id, isTimeInput }) => {
    const renderValue = (selectedItems) => {
        if (!isTimeInput) {
            const selectedLength = selectedItems.length;
            if (selectedLength < 3) return selectedItems.join(', ');

            const selectedLeft = selectedLength - 2;
            const displayedValues = selectedItems.slice(0, 2).join(', ');
            return `${displayedValues} + ${selectedLeft}`;
        } else {
            const { startDate, endDate } = selectedItems;
            if (startDate && endDate) return `${startDate} - ${endDate}`;
            else return '';
        }
    };

    const [isActive, setIsActive] = useState('');
    const [isFilled, setIsFilled] = useState('');

    useEffect(() => {
        if (!clickedOutside) setIsActive('isActive');
        else setIsActive('');
    }, [clickedOutside]);

    useEffect(() => {
        checkboxValues.length > 0 ? setIsFilled('isFilled') : setIsFilled('');
    }, [checkboxValues]);

    return (
        <FormField
            className={`${isFilled} ${isActive} ${
                isTimeInput ? 'timeType' : ''
            }`}
        >
            <FormFieldControl className="control">
                <FormFieldLabel htmlFor={id}>asasas</FormFieldLabel>
                <FormFieldInput
                    id={id}
                    value={renderValue(checkboxValues)}
                    readOnly={true}
                />
            </FormFieldControl>
        </FormField>
    );
};
export default TextField;
