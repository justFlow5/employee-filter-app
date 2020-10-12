import React from 'react';
import Home from './pages/Home';
import ResetCss from './styles/reset';
import Theme from './styles/theme';

function App() {
    return (
        <Theme>
            <ResetCss /> <Home />
        </Theme>
    );
}

export default App;
