import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import DateRangeInput from '../components/inputs/dateRangeInput/DateRangeInput';
import DisplayButton from '../components/employeeFilterModal/DisplayButton';
import Header from '../components/employeeFilterModal/Header';
import ResultView from '../components/employeeFilterModal/ResultView';
import Select from '../components/employeeFilterModal/Select';

import { arrayEquals } from '../helpers/helpersFunctions';
import { device } from '../styles/mediaQuery';

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
        width: 45%;
    }

    @media ${device.laptop} {
        width: 30%;
        padding: 20px;
    }
    @media ${device.desktop} {
        width: 40%;
    }
`;

const SelectWrapper = styled.div`
    width: 100%;
    position: relative;
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
    const {
        workers,
        positionsFilters,
        contractTypesFitlers,
        locationsFilters,
    } = config;

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
                    <DateRangeInput
                        handleDateChange={handleDateChange}
                        startDate={startDate}
                        endDate={endDate}
                    />
                    <Select
                        items={positionsFilters}
                        type="stanowiska"
                        updateFilters={updateFilters}
                        selectedData={selectedPositions}
                        setSelectedData={setSelectedPositions}
                    />
                    <Select
                        items={contractTypesFitlers}
                        type="warunki zatrudnienia"
                        updateFilters={updateFilters}
                        selectedData={selectedContractTypes}
                        setSelectedData={setSelectedContractTypes}
                    />

                    <Select
                        items={locationsFilters}
                        type="lokalizacje"
                        updateFilters={updateFilters}
                        selectedData={selectedLocations}
                        setSelectedData={setSelectedLocations}
                    />

                    <SelectWrapper onClick={() => checkFieldsState()}>
                        <Select
                            items={filteredWorkers}
                            updateFilters={updateFilters}
                            selectedData={selectedWorkers}
                            setSelectedData={setSelectedWorkers}
                            type="pracownicy"
                            selectAll={selectAll}
                            isAllFiltersFilled={isAllFiltersFilled}
                        />
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

Home.propTypes = {
    config: PropTypes.shape({
        workers: PropTypes.array,
        positionsFilters: PropTypes.array,
        contractTypesFitlers: PropTypes.array,
        locationsFilters: PropTypes.array,
    }),
};
