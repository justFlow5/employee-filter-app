import { css } from 'styled-components';

export const hideScroll = css`
    &::-webkit-scrollbar {
        display: none;
    }
    & {
        -ms-overflow-style: none;
        scrollbar-width: none;
    }
`;

export const styledScrollbar = css`
    overflow-y: scroll;
    scrollbar-color: #d0d0d0 #f1f1f1;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        width: 7px;
    }
    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }
    &::-webkit-scrollbar-thumb {
        background: #d0d0d0;
    }
    &::-webkit-scrollbar-thumb:hover {
        background: #bebebe;
    }
`;
