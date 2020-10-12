import styled from 'styled-components';
import React from 'react';
import moment from 'moment';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import './bootstrap.css';
import './daterangepicker.css';

const Wrapper = styled('div')`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 5;
    width: 100%;
    height: 100%;
    opacity: 0;
`;

export default function DatePicker({ handleDateChange, startDate, endDate }) {
    return (
        <Wrapper>
            <DateRangePicker
                className="date-container"
                startDate={startDate}
                endDate={endDate}
                initialSettings={{
                    startDate: moment(),
                }}
                onApply={handleDateChange}
            >
                <input
                    type="text"
                    className="form-control"
                    value={`${startDate} - ${endDate}`}
                    readOnly={true}
                />

            </DateRangePicker>
        </Wrapper>
    );
}
