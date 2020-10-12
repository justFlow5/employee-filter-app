import React from 'react';
import styled from 'styled-components';
import { device } from '../../styles/mediaQuery';

const HeaderContainer = styled.header`
    position: relative;
    font-size: 25px;
    margin-top: 10px;
    color: ${(props) => props.theme.colors.black};
    text-align: left;
    margin-bottom: 20px;

    @media ${device.desktop} {
        font-size: 27px;
    }
`;

function Header({ title }) {
    return <HeaderContainer>{title}</HeaderContainer>;
}

export default Header;
