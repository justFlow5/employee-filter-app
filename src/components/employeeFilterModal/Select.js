import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Checkbox from '../inputs/Checkbox';
import TextField from '../inputs/TextField';
import { arrayEquals } from '../../helpers/helpersFunctions';

const DropDownContainer = styled('div')`
    width: 100%;
    position: relative;
    margin: 5px 0;
    & ~ svg {
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
    position: absolute;
    width: 100%;
    z-index: 100;
    max-height: 160px;

    overflow-y: scroll;
    border: 1px solid #d0d0d0;
    opacity: ${(props) => (props.isReady ? 1 : 0)};
    transition: opacity 0.3s;
    &::-webkit-scrollbar {
        width: 7px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
        background: #d0d0d0;
        transition: background 0.3s;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #bebebe;
    }
`;

const ListItem = styled('li')`
    width: 100%;
    list-style: none;
    background-color: #fff;
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

export default function Select({
    items,
    updateFilters,
    selectedData,
    setSelectedData,
    id,
    type,
    selectAll,
    isAllFiltersFilled = true,
}) {
    const [clickedOutside, setClickedOutside] = useState(true);
    const myRef = useRef();

    const handleClickOutside = (e) => {
        if (!myRef.current.contains(e.target)) {
            setClickedOutside(true);
        }
    };
    const handleClickInside = () => setClickedOutside(false);

    const renderSelectAllCheckbox = () => {
        if (type === 'pracownicy' && items.length > 0) {
            return (
                <ListItem className="selectAll">
                    <Checkbox
                        label="Wszyscy"
                        handleInputChange={selectAll}
                        value={items}
                        checked={arrayEquals(selectedData, items)}
                        id={Math.random()}
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

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    });

    return (
        <DropDownContainer
            ref={myRef}
            onClick={handleClickInside}
            open={!clickedOutside && isAllFiltersFilled}
        >
            <DropdownInputContainer>
                <TextField
                    selectedData={selectedData}
                    clickedOutside={clickedOutside}
                    id={id}
                    labelText={type}
                    isAllFiltersFilled={isAllFiltersFilled}
                />
            </DropdownInputContainer>

            {!clickedOutside && (
                <DropDownListContainer>
                    <DropDownList isReady={items.length > 0}>
                        {renderSelectAllCheckbox()}
                        {items.map((item, index) => {
                            return (
                                <ListItem
                                    isOpen={clickedOutside}
                                    key={Math.random()}
                                    id={id}
                                >
                                    <Checkbox
                                        label={item}
                                        handleInputChange={handleInputChange}
                                        value={item}
                                        checked={selectedData.includes(item)}
                                        id={item + '_' + index}
                                    />
                                </ListItem>
                            );
                        })}
                    </DropDownList>
                </DropDownListContainer>
            )}
        </DropDownContainer>
    );
}
