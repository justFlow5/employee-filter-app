import React from 'react';

const CalendarIcon = ({ className }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className={className}
        >
            <path d="M18 13.2h-6v6h6v-6zM16.8 0v2.4H7.2V0H4.8v2.4H3.6c-1.32 0-2.4 1.08-2.4 2.4v16.8c0 1.32 1.08 2.4 2.4 2.4h16.8c1.32 0 2.4-1.08 2.4-2.4V4.8c0-1.32-1.08-2.4-2.4-2.4h-1.2V0h-2.4zm3.6 21.6H3.6V8.4h16.8v13.2z" />
        </svg>
    );
};

export default CalendarIcon;
