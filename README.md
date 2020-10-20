# Zadanie Rekrutacyjne - Michał Skrzypczyński

Plusy:
- Wersja live
- Readme
- Fajne użycie styled-components z propsami
- Proptypes
- Custom hooks, np. z wielkością okna


Minusy:
- config z pracownikami w App.js ?
- Zero testów
- Zakomentowany kod - np w useWindowsSize.js
- Komponent funkcyjny Home, w którym dużo się dzieje, bardzo dużo hooków, zasadne by tu było użycie klasy i wywalenie większości metod na zewnątrz. Tutaj mocno widać brak Reduxa czym skutkuje.
- Jak jesteśmy przy Home.js:
    -   funkcja getFilteredWorkers - długa z komentarzami, idealny kandydat do rozbijania na mniejsze, czytelniejsze funkcje. Dlaczego tak robimy? Po pierwsze, mniejsze funkcje są czytelniejsze i łatwiejsze w testowaniu. W dodatku używając ładnych, opisowych nazw możemy przekazać dużo więcej niż zostawiając komentarze. U nas np jest zasada, że komentarze są zakazane (chyba, że jest ekstremalnie potrzebny). Dlatego właśnie, aby zmuszać naszych devów do przemyślenia funkcji, rozbijania i nazwenictwa. 

```javascript=
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
    
    
    // ja bym to rozbił tak (trochę na szybko, więc niektóre rzeczy pominąłem)
    const workerFilterValueMatch = () => {}
    
    const matchWorkersWithFilters = (defaultFilters, selectedFilters, workers) => {
        return defaultFilters.every((filter) => {
            const workerFilterValue = worker[filter];
            const selectedFilterVal = selectedFilters[filter];

            if (workerFilterValueMatch(workerFilterValue)) {
                return selectedFilterVal.some((filterValue) =>
                    workerFilterValue.includes(filterValue)
                );
            }
            return selectedFilterVal.some(filterValue => filterValue === workerFilterValue);
        });
    }
    
    const getFilteredWorkers = (defaultFilters, selectedFilters, workers) => {
        const selected = workers.reduce(
            (array, worker) => {
                const hasMatch = matchWorkersWithFilters(defaultFilters, selectedFilters, workers);
                if (hasMatch) {
                    return [
                        ...array,
                        `${worker.imie} ${worker.nazwisko}`
                    ]
                }
                return array;
            }, [])

        setFilteredWorkers(selected);
    };

```

Pytania:
- Na przykładzie home albo text-field - poupychane są styled components? 
- Czasem używane są do definiowania funkcji function a czasem () => , czy jest za tym jakaś logika

- plik TextField.js 

```javascript=
    const [isActive, setIsActive] = useState('');
    const [isFilled, setIsFilled] = useState('');
```
Czemu tutaj jest string zamiast np. boolean.
Rozumiem, że niżej jest to używane jako klasa css , ale np clickedOutside jest już boolean i warunkowe wyświetlenie klasy?
```jsx=
 <FormField
            className={`${isFilled} ${isActive} ${
                isTimeInput ? 'timeType' : ''
            } ${clickedOutside ? 'inactive' : ''} `}
        >
```

- package.json
Do czego używany jest jquery? Dlaczego @testing-library jest używane jako dependencies?
```json
  "dependencies": {
    "@testing-library/jest-dom": "^4.2.4",
    "@testing-library/react": "^9.3.2",
    "@testing-library/user-event": "^7.1.2",
    "bootstrap-daterangepicker": "^3.1.0",
    "jquery": "^3.5.1",
```

- plik helpersFunctions.js
Else w tych przypadkach nie są potrzebne - ale dlaczego taka funkcja? Głównie chodzi o isTimeInput , dlaczego  tego nie rozbić na dwie mniejsze funkcje?
Wtedy otrzymamy dwie funkcje, z czego jedna ma dwa parametry, a druga jeden.
```javascript=
export function formatInputValue(
    selectedItems,
    isTimeInput,
    numberOfInputsToDisplay
) {
    if (!isTimeInput) {
        const inputLength = selectedItems.length;
        if (inputLength <= numberOfInputsToDisplay)
            return selectedItems.join(', ');
        const selectedLeft = inputLength - numberOfInputsToDisplay;
        const displayedValues = selectedItems
            .slice(0, numberOfInputsToDisplay)
            .join(', ');
        return `${displayedValues} + ${selectedLeft}`;
    } else {
        const { startDate, endDate } = selectedItems;
        if (startDate && endDate)
            return `${formatDate(startDate, 'DD.MM')} - ${formatDate(
                endDate,
                'DD.MM'
            )}`;
        else return '';
    }
}
```
