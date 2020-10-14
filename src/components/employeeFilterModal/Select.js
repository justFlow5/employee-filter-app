import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import CaretIcon from '../../icons/Caret';
import Checkbox from '../inputs/Checkbox';
import TextField from '../inputs/TextField';
import { arrayEquals } from '../../helpers/helpersFunctions';
import { useComponentVisible } from '../../customHooks/useComponentVisible';
import { device } from '../../styles/mediaQuery';
import { styledScrollbar } from '../../styles/sharedStyle';

const DropDownContainer = styled('div')`
    width: 100%;
    position: relative;
    margin: 5px 0;
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
        transform: ${(props) =>
            props.open
                ? `translateY(-50%) rotate(180deg)`
                : `translateY(-50%) rotate(0deg)`} !important;
    }
`;

const DropdownInputContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const DropDownListContainer = styled('div')``;

const DropDownList = styled('ul')`
    ${styledScrollbar}
    position: absolute;
    width: 100%;
    z-index: 100;
    overflow-y: scroll;
    border: 1px solid #d0d0d0;
    opacity: ${(props) => (props.isReady ? 1 : 0)};
    max-height: ${(props) => (props.workerList ? '150px' : '120px')};
    transition: opacity 0.3s;

    @media ${device.laptop} {
        max-height: 120px;
    }
`;

const ListItem = styled('li')`
    width: 100%;
    list-style: none;
    background-color: ${(props) => props.theme.colors.bgSecondary};
    border-bottom: 1px solid #e8e8e8;
    height: 40px;
    padding: 15px 0;
    display: flex;
    align-items: center;
    opacity: ${(props) => (props.isOpen ? 0 : 1)};
    transition: opacity 0.3s;
    &:last-child {
        border-bottom: none;
    }
    &.selectAll {
        border-width: 3px;
    }
`;

function Select({
    items,
    updateFilters,
    selectedData,
    setSelectedData,
    type,
    selectAll,
    isFeedback,
}) {
    const {
        ref,
        isComponentVisible,
        setIsComponentVisible,
    } = useComponentVisible(false);

    const renderSelectAllCheckbox = () => {
        if (type === 'pracownicy' && items.length > 1) {
            return (
                <ListItem className="selectAll">
                    <Checkbox
                        label="Wszyscy"
                        handleInputChange={selectAll}
                        value={items}
                        checked={arrayEquals(selectedData, items)}
                        id={uuidv4()}
                    />
                </ListItem>
            );
        }
    };

    const handleInputChange = (e) => {
        let checked = e.target.checked;
        let checkedValue = e.target.value;
        let selectedFilters;
        if (checked) {
            selectedFilters = [...selectedData, checkedValue];
        } else {
            selectedFilters = selectedData.filter(
                (selectedFilter) => selectedFilter !== checkedValue
            );
        }
        setSelectedData(selectedFilters);
        if (type !== 'pracownicy') updateFilters(type, selectedFilters);
    };

    return (
        <DropDownContainer
            ref={ref}
            onClick={() => setIsComponentVisible(true)}
            open={isComponentVisible && !isFeedback}
        >
            <DropdownInputContainer>
                <TextField
                    selectedData={selectedData}
                    clickedOutside={!isComponentVisible}
                    id={uuidv4()}
                    labelText={type}
                    isFeedback={isFeedback}
                />
            </DropdownInputContainer>

            {isComponentVisible && (
                <DropDownListContainer>
                    <DropDownList
                        isReady={items.length > 0}
                        workerList={type === 'pracownicy'}
                    >
                        {renderSelectAllCheckbox()}
                        {items.map((item) => (
                            <ListItem
                                isOpen={!isComponentVisible}
                                key={uuidv4()}
                            >
                                <Checkbox
                                    label={item}
                                    handleInputChange={handleInputChange}
                                    value={item}
                                    checked={selectedData.includes(item)}
                                    id={uuidv4()}
                                />
                            </ListItem>
                        ))}
                    </DropDownList>
                </DropDownListContainer>
            )}
            <CaretIcon />
        </DropDownContainer>
    );
}

export default Select;

Select.propTypes = {
    items: PropTypes.array.isRequired,
    updateFilters: PropTypes.func.isRequired,
    selectedData: PropTypes.array.isRequired,
    setSelectedData: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    selectAll: PropTypes.func,
    isFeedback: PropTypes.bool,
};
