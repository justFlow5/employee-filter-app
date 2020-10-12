import React, {useState, useEffect, useRef} from 'react';

import TextInput from './components/inputs/TextField'
import DateRangePicker from './components/inputs/dateRangePicker/DateRangePicker'

import Header from './components/employeeFilterModal/Header'
import CalendarIcon from './icons/Calendar'
import styled from 'styled-components';


const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: #f5f5f5;
`;

const Modal = styled.div`
    position: relative;
    width: 30%;
    height: 75%;
    margin: 70px auto;
    background-color: #ffffff;
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
        fill: ${(props) => (props.isActive ? '#ff6b01' : '#999')};
    }
`;


function App() {

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


    return <div className="App">

<ModalContainer>
                    <Modal>
                        <Header title="Wybierz pracowników" />
                        <DateRangeWrapper
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
                        </DateRangeWrapper>
                        </Modal>
               
                </ModalContainer>
    </div>;
}

export default App;
