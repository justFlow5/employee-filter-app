import React from 'react';
import styled from 'styled-components';
import { device } from '../../styles/mediaQuery';
import { formatDate } from '../../helpers/helpersFunctions';

const Modal = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    padding: 10px 60px;
    height: 95%;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    z-index: 999;
    background-color: ${(props) => props.theme.colors.primary};
    opacity: ${(props) => (props.isConfirmed ? 1 : 0)};
    transform: ${(props) =>
        props.isConfirmed
            ? `scale(1) translate(-50%, -50%)`
            : `scale(0) translate(-50%, -50%)`};

    transition: all 0.5s ease-in-out;

    @media ${device.laptop} {
        height: 80%;
        width: 60%;
    }
`;

const Header = styled.h3`
    font-size: 30px;
    font-weight: 600;
    text-transform: capitalize;
    letter-spacing: 1px;
    margin: 40px 0;
    color: ${(props) => props.theme.colors.bgSecondary};
    text-align: center;

    @media ${device.mobileL} {
        font-size: 38px;
    }

    @media ${device.laptop} {
        font-size: 42px;
    }
`;

const SubHeader = styled.h3`
    font-size: 20px;
    font-weight: 500;
    color: ${(props) => props.theme.colors.bgSecondary};
    text-align: left;
    white-space: nowrap;
    font-weight: 600;
    border-bottom: 1px solid white;
    padding-bottom: 10px;

    @media ${device.laptop} {
        font-size: 27px;
    }
`;
const ListItem = styled.li`
    display: flex;
    margin: 10px;
    padding-left: 10px;

    & > span {
        font-size: 19px;
        color: ${(props) => props.theme.colors.bgSecondary};
    }
`;

const Back = styled.span`
    position: absolute;
    font-size: 28px;
    color: ${(props) => props.theme.colors.bgSecondary};
    top: 10px;
    right: 20px;
    &:hover {
        cursor: pointer;
    }
`;

const ResultModal = ({ timeRange, workers, isConfirmed, setIsConfirmed }) => {
    return (
        <Modal isConfirmed={isConfirmed}>
            <Header>wybrani pracownicy</Header>
            <SubHeader>{`${formatDate(
                timeRange.startDate,
                'DD-MM-YYYY'
            )}/${formatDate(timeRange.endDate, 'DD-MM-YYYY')}`}</SubHeader>
            <ul>
                {workers.map((worker, index) => {
                    return (
                        <ListItem key={index}>
                            <span>{`- ${worker}`}</span>
                        </ListItem>
                    );
                })}
            </ul>
            <Back onClick={() => setIsConfirmed(false)}>&times;</Back>
        </Modal>
    );
};

export default ResultModal;
