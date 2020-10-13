import React from 'react';
import Home from './pages/Home';
import ResetCss from './styles/reset';
import Theme from './styles/theme';

const config = {
    workers: [
        {
            imie: 'Mariusz',
            nazwisko: 'Maro',
            stanowiska: 'kucharz',
            'warunki zatrudnienia': 'umowa o pracę',
            lokalizacje: ['Arkady'],
        },
        {
            imie: 'Tomasz',
            nazwisko: 'Taro',
            stanowiska: 'kelner',
            'warunki zatrudnienia': 'umowa o pracę',
            lokalizacje: ['Magnolia', 'Pasaż Grunwaldzki'],
        },
        {
            imie: 'Jarosław',
            nazwisko: 'Jaro',
            stanowiska: 'kierownik',
            'warunki zatrudnienia': 'umowa o pracę',
            lokalizacje: ['Wroclavia'],
        },
        {
            imie: 'Dorota',
            nazwisko: 'Dor',
            stanowiska: 'kelner',
            'warunki zatrudnienia': 'umowa o pracę',
            lokalizacje: ['Arkady', 'Magnolia'],
        },
        {
            imie: 'Agata',
            nazwisko: 'Agat',
            stanowiska: 'kelner',
            'warunki zatrudnienia': 'umowa o pracę',
            lokalizacje: ['Wroclavia', 'Magnolia'],
        },
        {
            imie: 'Julia',
            nazwisko: 'Jul',
            stanowiska: 'kucharz',
            'warunki zatrudnienia': 'umowa zlecenie',
            lokalizacje: ['Arkady', 'Pasaż Grunwaldzki'],
        },
        {
            imie: 'Janusz',
            nazwisko: 'Polak',
            stanowiska: 'kucharz',
            'warunki zatrudnienia': 'umowa zlecenie',
            lokalizacje: ['Wroclavia'],
        },
        {
            imie: 'Karolina',
            nazwisko: 'Buta',
            stanowiska: 'kierownik',
            'warunki zatrudnienia': 'umowa zlecenie',
            lokalizacje: ['Arkady'],
        },
        {
            imie: 'Przemysław',
            nazwisko: 'Stodoła',
            stanowiska: 'kierownik',
            'warunki zatrudnienia': 'umowa o pracę',
            lokalizacje: ['Wroclavia'],
        },
        {
            imie: 'Arkadiusz',
            nazwisko: 'Rydwański',
            stanowiska: 'kelner',
            'warunki zatrudnienia': 'umowa o dzieło',
            lokalizacje: ['Magnolia'],
        },
        {
            imie: 'Marta',
            nazwisko: 'Trytka',
            stanowiska: 'Sprzątaczka',
            'warunki zatrudnienia': 'umowa o dzieło',
            lokalizacje: ['Arkady', 'Magnolia', 'Pasaż Grunwaldzki'],
        },
        {
            imie: 'Zbigniew',
            nazwisko: 'Topolski',
            stanowiska: 'kucharz',
            'warunki zatrudnienia': 'umowa o dzieło',
            lokalizacje: ['Arkady'],
        },
    ],

    positionsFilters: ['kucharz', 'kelner', 'kierownik', 'sprzątaczka'],

    contractTypesFitlers: ['umowa o pracę', 'umowa zlecenie', 'umowa o dzieło'],

    locationsFilters: ['Arkady', 'Magnolia', 'Pasaż Grunwaldzki', 'Wroclavia'],
};

function App() {
    return (
        <Theme>
            <ResetCss />
            <Home config={config} />
        </Theme>
    );
}

export default App;
