import React, { useState, useEffect, useRef } from 'react';

import TextInput from '../components/inputs/TextField';
import DateRangePicker from '../components/inputs/dateRangePicker/DateRangePicker';

import Header from '../components/employeeFilterModal/Header';
import CalendarIcon from '../icons/Calendar';
import styled from 'styled-components';

import { device } from '../styles/mediaQuery';

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: ${(props) => props.theme.colors.bgPrimary};
`;

const Modal = styled.div`
    position: relative;
    width: 30%;
    height: 75%;
    margin: 70px auto;
    background-color: ${(props) => props.theme.colors.bgSecondary};
    display: flex;
    flex-direction: column;
    padding: 20px;

    -webkit-box-shadow: 0px 0px 28px -16px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 28px -16px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 28px -16px rgba(0, 0, 0, 0.75);
`;

const DateRangeWrapper = styled.div`
    position: relative;
    width: 50%;
    height: 60px;
    & .calendar-icon {
        width: 25px;
        height: 25px;
        position: absolute;
        top: 10px;
        left: 15px;
        z-index: 500;
        transition: fill 0.4s;
        fill: ${(props) =>
            props.isActive
                ? props.theme.colors.primary
                : props.theme.colors.secondary};
    }
`;

function Home() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [isClickedOutside, setIsClickedOutside] = useState(true);
    const myRef = useRef();

    const handleClickOutside = (e) => {
        if (!myRef.current.contains(e.target)) {
            setIsClickedOutside(true);
        }
    };
    const handleClickInside = () => setIsClickedOutside(false);

    const handleDateChange = (e, picker) => {
        if (picker) {
            setStartDate(picker.startDate.toISOString());
            setEndDate(picker.endDate.toISOString());
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    });

    return (
        <ModalContainer>
            <Modal>
                <Header title="Wybierz pracowników" />
                {/* <DateRangeWrapper
                    onClick={handleClickInside}
                    ref={myRef}
                    isActive={!isClickedOutside}
                >
                    <DateRangePicker
                        handleDateChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <CalendarIcon className={'calendar-icon'} />
                    <TextInput
                        checkboxValues={{ startDate, endDate }}
                        isTimeInput={true}
                        clickedOutside={isClickedOutside}
                        labelText="okres"
                    />
                </DateRangeWrapper> */}
            </Modal>
        </ModalContainer>
    );
}

export default Home;
