import React from 'react';
import styled from 'styled-components';
import CheckIcon from '../../icons/Check';

const CheckboxContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
`;

const Input = styled.input`
    visibility: hidden;
    &.checked + label {
        background: ${(props) => props.theme.colors.bgSecondary};
        border: 1px solid ${(props) => props.theme.colors.secondary};

        & > svg {
            fill: ${(props) => props.theme.colors.primary};
        }
    }
`;

const IconHolder = styled.label`
    display: inline-block;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border: 1px solid ${(props) => props.theme.colors.secondary};
    border-radius: 4px;
    margin-right: 10px;
    background: ${(props) => props.theme.colors.bgSecondary};
    transition: all 0.3s;
    &:hover {
        border: 1px solid ${(props) => props.theme.colors.primary};
    }
    & > svg {
        fill: ${(props) => props.theme.colors.bgSecondary};
        position: relative;
        width: 70%;
        height: 70%;
    }
`;

const Person = styled.label`
    font-size: 17px;
    cursor: pointer;
    width: 100%;
`;

const Checkbox = ({ label, handleInputChange, value, id, checked }) => {
    const handleCheck = (e) => {
        handleInputChange(e);
    };

    return (
        <CheckboxContainer>
            <Input
                type="checkbox"
                className={checked && 'checked'}
                id={id}
                value={value}
                checked={checked}
                onChange={handleCheck}
            />{' '}
            <IconHolder htmlFor={id}>
                <CheckIcon />
            </IconHolder>{' '}
            <Person htmlFor={id}>{label}</Person>
        </CheckboxContainer>
    );
};

export default Checkbox;
