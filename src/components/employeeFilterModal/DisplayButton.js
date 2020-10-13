import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { device } from '../../styles/mediaQuery';

const Button = styled.button`
    position: relative;
    font-size: 14px;
    width: 120px;
    color: ${(props) => props.theme.colors.bgSecondary};
    background: ${(props) => props.theme.colors.primary};
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    padding: 10px 8px;
    background: ${(props) =>
        props.isActive
            ? props.theme.colors.primary
            : props.theme.colors.primaryVeryLight};
    pointer-events: ${(props) => (props.isActive ? 'auto' : 'none')};
    letter-spacing: 1px;
    border: none;
    margin-bottom: 10px;
    font-size: 13px;
    transition: background 0.3s ease-in-out;

    @media ${device.mobileM} {
        font-size: 15px;
    }
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

DisplayButton.propTypes = {
    title: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    setIsConfirmed: PropTypes.func.isRequired,
};
