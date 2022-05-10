import { useState, useRef, useEffect } from 'react';
import Header from './Components/Header/index';
import Body from './Components/Body/index';
import Footer from './Components/Footer/index';

function App() {
    return (
        <div className="wrapper">
            <div className="container">
                <Header />
                <Body />
                <Footer />
            </div>
        </div>
    );
}

export default App;
