import React, { useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';

const Modal = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    padding: 10px 60px;
    height: 80%;
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    z-index: 999;
    background-color: ${(props) => props.theme.colors.primary};
    opacity: ${(props) => (props.isConfirmed ? 1 : 0)};
    transform: ${(props) =>
        props.isConfirmed
            ? `scale(1) translate(-50%, -50%)`
            : `scale(0) translate(-50%, -50%)`};

    transition: all 0.5s ease-in-out;
`;

const Header = styled.h3`
    font-size: 42px;
    font-weight: 600;
    text-transform: capitalize;
    letter-spacing: 1px;
    margin: 40px 0;
    color: ${(props) => props.theme.colors.bgSecondary};
    text-align: center;
`;

const SubHeader = styled.h3`
    font-size: 27px;
    font-weight: 500;
    letter-spacing: 1px;
    color: ${(props) => props.theme.colors.bgSecondary};
    text-align: left;
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
    const formatDate = (date) => {
        return moment(date).format('DD-MM-YYYY');
    };
    return (
        <Modal isConfirmed={isConfirmed}>
            <Header>wybrani pracownicy</Header>
            <SubHeader>{`Okres: ${formatDate(timeRange.startDate)}/${formatDate(
                timeRange.endDate
            )}`}</SubHeader>
            <ul>
                {workers.map((worker, index) => {
                    return (
                        <ListItem key={index}>
                            {' '}
                            <span>{`Pracownik: ${worker}`}</span>
                        </ListItem>
                    );
                })}
            </ul>
            <Back onClick={() => setIsConfirmed(false)}>&times;</Back>
        </Modal>
    );
};

export default ResultModal;
