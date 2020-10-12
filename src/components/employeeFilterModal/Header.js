import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
    position: relative;
    font-size: 24px;
    color: ${(props) => props.theme.colors.black};
    text-align: left;
    margin-bottom: 20px;
`;

function Header({ title }) {
    return (
        <>
            <HeaderContainer>{title}</HeaderContainer>
        </>
    );
}

export default Header;
