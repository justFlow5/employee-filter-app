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
        background: #fff;
        border: 1px solid #d3d3d3;

        & > svg {
            fill: #ff6b01;
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
    border: 1px solid #d3d3d3;
    border-radius: 4px;
    margin-right: 10px;
    background: #fff;
    transition: all 0.3s;
    &:hover {
        border: 1px solid #ff6b01;
    }
    & > svg {
        fill: #fff;
        position: relative;
        width: 70%;
        height: 70%;
        transition: all 0.3s;
    }
`;

const Person = styled.label`
    font-size: 17px;
    cursor: pointer;
`;

const Checkbox = ({ label, handleInputChange, value, id, checked }) => {
    const handleCheck = (e) => {
        console.log(e.target.checked);
        handleInputChange(e);
    };

    return (
        <>
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
        </>
    );
};

export default Checkbox;
