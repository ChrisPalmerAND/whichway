import React from 'react';
import AreaSummary from './components/areaSummary';
import Instructions from './components/instructions';
import RenderMap from './components/map';

function App() {
    return (
        <>
            <Instructions />
            <RenderMap />
            <AreaSummary />
        </>
    );
}

export default App;
