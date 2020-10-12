import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    position: relative;
    font-size: 15px;
    width: 120px;
    height: 30px;
    color: ${(props) => props.theme.colors.bgSecondary};
    background: ${(props) => props.theme.colors.primary};
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    padding: 6px 8px;
    background: ${(props) =>
        props.isActive
            ? props.theme.colors.primary
            : props.theme.colors.primaryVeryLight};
    pointer-events: ${(props) => (props.isActive ? 'auto' : 'none')};
    letter-spacing: 1px;
    border: none;
    transition: background 0.3s ease-in-out;
    &:focus {
        outline: none;
    }
    &:hover {
        background: ${(props) => props.theme.colors.primaryLight};
    }
`;

function DisplayButton({ title, isActive, setIsConfirmed }) {
    return (
        <>
            <Button isActive={isActive} onClick={() => setIsConfirmed(true)}>
                {title}
            </Button>
        </>
    );
}

export default DisplayButton;
