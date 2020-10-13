import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

function DatePicker({ handleDateChange, startDate, endDate }) {
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
                <input type="text" className="form-control" readOnly={true} />
            </DateRangePicker>
        </Wrapper>
    );
}

export default DatePicker;

DatePicker.propTypes = {
    handleDateChange: PropTypes.func.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
};
