import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import TextInput from '../components/inputs/TextField';
import DateRangePicker from '../components/inputs/dateRangePicker/DateRangePicker';

import Header from '../components/employeeFilterModal/Header';
import CalendarIcon from '../icons/Calendar';
import CaretIcon from '../icons/Caret';

import Select from '../components/employeeFilterModal/Select';
import { arrayEquals } from '../helpers/helpersFunctions';

import { device } from '../styles/mediaQuery';

import DisplayButton from '../components/employeeFilterModal/DisplayButton';

import ResultView from '../components/employeeFilterModal/ResultView';

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    background-color: ${(props) => props.theme.colors.bgPrimary};
`;

const Modal = styled.div`
    width: 90%;
    height: 90%;
    position: relative;
    width: 90%;
    margin: 30px auto;
    background-color: ${(props) => props.theme.colors.bgSecondary};
    display: flex;
    flex-direction: column;
    padding: 20px;
    -webkit-box-shadow: 0px 0px 28px -16px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 0px 28px -16px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 0px 28px -16px rgba(0, 0, 0, 0.75);
    @media ${device.mobileM} {
        height: 85%;
        height: 75%;
        margin: 40px auto;
    }
    @media ${device.mobileL} {
        width: 70%;
        height: 75%;
        margin: 70px auto;
    }

    @media (min-width: 500px) {
        width: 55%;
        height: 80%;
    }
    @media ${device.tablet} {
        width: 40%;
    }

    @media ${device.laptop} {
        width: 30%;
        padding: 20px;
    }
    @media ${device.desktop} {
        width: 40%;
    }
`;

const DateRangeWrapper = styled.div`
    position: relative;
    min-height: 60px;
    width: 65%;

    @media ${device.mobileL} {
        width: 50%;
    }

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

const SelectWrapper = styled.div`
    width: 100%;
    position: relative;

    & > svg {
        margin-right: 20px;
        fill: ${(props) => props.theme.colors.black};
        position: absolute;
        right: 0;
        width: 15px;
        height: 15px;
        z-index: 2;
        top: 50%;
        transform: translateY(-50%);
    }
`;

const ButtonWrapper = styled.div`
    text-align: right;
    margin-top: auto;
    position: relative;
`;

const ErrorText = styled.p`
    font-size: 13px;
    color: red;
    text-align: left;
    opacity: ${(props) => (props.isShown ? 1 : 0)};
`;

function Home({ config }) {
    const { workers } = config;
    const [selectedPositions, setSelectedPositions] = useState([]);
    const [selectedContractTypes, setSelectedContractTypes] = useState([]);
    const [selectedLocations, setSelectedLocations] = useState([]);
    const [selectedWorkers, setSelectedWorkers] = useState([]);

    const [filteredWorkers, setFilteredWorkers] = useState([]);

    const [isAllDataFilled, setIsAllDataFilled] = useState(false);
    const [isAllFiltersFilled, setIsAllFiltersFilled] = useState(false);

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [isConfirmed, setIsConfirmed] = useState(false);

    const [isFeedback, setIsFeedback] = useState(false);

    const checkFieldsState = () => {
        if (!isAllFiltersFilled) setIsFeedback(true);
        else setIsFeedback(false);
    };
    const handleDateChange = (e, picker) => {
        if (picker) {
            setStartDate(picker.startDate.toISOString());
            setEndDate(picker.endDate.toISOString());
        }
    };

    const [selectedFilters, setSelectedFilters] = useState({
        stanowiska: [],
        'warunki zatrudnienia': [],
        lokalizacje: [],
    });

    const positionsFilters = ['kucharz', 'kelner', 'kierownik', 'sprzątaczka'];

    const contractTypesFitlers = [
        'umowa o pracę',
        'umowa zlecenie',
        'umowa o dzieło',
    ];

    const locationsFilters = [
        'Arkady',
        'Magnolia',
        'Pasaż Grunwaldzki',
        'Wroclavia',
    ];

    const selectAll = (e) => {
        const selectAllCheckboxWorkers = e.target.value.split(',');
        if (arrayEquals(selectAllCheckboxWorkers, selectedWorkers))
            setSelectedWorkers([]);
        else setSelectedWorkers(selectAllCheckboxWorkers);
    };

    const updateFilters = (filterType, filterContent) => {
        setSelectedFilters((selectedFilters) => {
            const selectedFilters__copy = { ...selectedFilters };
            selectedFilters__copy[filterType] = filterContent;
            return selectedFilters__copy;
        });
    };

    // Returns all workers that fulfill given criteria
    const getFilteredWorkers = (defaultFilters, selectedFilters, workers) => {
        const selected = workers
            .filter((worker) => {
                //  iterate through each type of filter
                return defaultFilters.every((filter) => {
                    const workerFilterValue = worker[filter];
                    const selectedFilterVal = selectedFilters[filter];

                    if (
                        Object.prototype.toString.call(workerFilterValue) ===
                        '[object Array]'
                    )
                        //    if at least one selected filter's value matches worker's filter value - locations
                        return selectedFilterVal.some((filterValue) =>
                            workerFilterValue.includes(filterValue)
                        );
                    // workerFilterValue is a string - contract type and position
                    else
                        return selectedFilterVal.some(
                            (filterValue) => filterValue === workerFilterValue
                        );
                });
            })
            .map((filteredWorker) => {
                return `${filteredWorker.imie} ${filteredWorker.nazwisko}`;
            });

        setFilteredWorkers(selected);
    };

    const [isClickedOutside, setIsClickedOutside] = useState(true);
    const myRef = useRef();

    const handleClickOutside = (e) => {
        if (!myRef.current.contains(e.target)) {
            setIsClickedOutside(true);
        }
    };
    const handleClickInside = () => setIsClickedOutside(false);

    // const checkErrors = () => {
    //     if
    // }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    });

    useEffect(() => {
        if (selectedWorkers.length > 0 && startDate && endDate)
            setIsAllDataFilled(true);
        else setIsAllDataFilled(false);
    }, [selectedWorkers, startDate, endDate, isAllDataFilled]);

    useEffect(() => {
        if (isAllFiltersFilled) setIsFeedback(false);
        if (
            selectedPositions.length > 0 &&
            selectedContractTypes.length > 0 &&
            selectedLocations.length > 0
        ) {
            setIsAllFiltersFilled(true);
            getFilteredWorkers(
                ['stanowiska', 'warunki zatrudnienia', 'lokalizacje'],
                selectedFilters,
                workers
            );
        } else {
            setIsAllFiltersFilled(false);
            setFilteredWorkers([]);
            setSelectedWorkers([]);
        }
    }, [
        selectedPositions,
        selectedContractTypes,
        selectedLocations,
        isAllFiltersFilled,
        selectedFilters,
        workers,
    ]);

    return (
        <>
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
                            selectedData={{ startDate, endDate }}
                            isTimeInput={true}
                            clickedOutside={isClickedOutside}
                            labelText="okres"
                        />
                    </DateRangeWrapper>
                    <SelectWrapper>
                        <Select
                            key={'abc123'}
                            id={'abc123'}
                            items={positionsFilters}
                            type="stanowiska"
                            updateFilters={updateFilters}
                            selectedData={selectedPositions}
                            setSelectedData={setSelectedPositions}
                        />
                        <CaretIcon />
                    </SelectWrapper>

                    <SelectWrapper>
                        <Select
                            key={'obyoby'}
                            id={'obyoby'}
                            items={contractTypesFitlers}
                            type="warunki zatrudnienia"
                            updateFilters={updateFilters}
                            selectedData={selectedContractTypes}
                            setSelectedData={setSelectedContractTypes}
                        />
                        <CaretIcon />
                    </SelectWrapper>
                    <SelectWrapper>
                        <Select
                            key={'jesione'}
                            id={'jesione'}
                            items={locationsFilters}
                            type="lokalizacje"
                            updateFilters={updateFilters}
                            selectedData={selectedLocations}
                            setSelectedData={setSelectedLocations}
                        />
                        <CaretIcon />
                    </SelectWrapper>
                    <SelectWrapper onClick={() => checkFieldsState()}>
                        <Select
                            key={'jesione2'}
                            id={'jesione2'}
                            items={filteredWorkers}
                            updateFilters={updateFilters}
                            selectedData={selectedWorkers}
                            setSelectedData={setSelectedWorkers}
                            type="pracownicy"
                            selectAll={selectAll}
                            isAllFiltersFilled={isAllFiltersFilled}
                        />
                        <CaretIcon />
                    </SelectWrapper>
                    <ErrorText isShown={isFeedback}>
                        All fields must be filled
                    </ErrorText>
                    <ButtonWrapper>
                        <DisplayButton
                            title="wyświetl"
                            isActive={isAllDataFilled}
                            setIsConfirmed={setIsConfirmed}
                        />
                    </ButtonWrapper>
                </Modal>
            </ModalContainer>
            <ResultView
                isConfirmed={isConfirmed}
                setIsConfirmed={setIsConfirmed}
                timeRange={{ startDate, endDate }}
                workers={selectedWorkers}
            />
        </>
    );
}

export default Home;
