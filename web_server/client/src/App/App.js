import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.js';

import React from 'react';
import './App.css';
import logo from './news.jpg';
import NewsPanel from '../NewsPanel/NewsPanel.js';

class App extends React.Component {
    render() {
        return (
            <div >
                <img className = 'logo' src={logo} alt='logo' />
                <div className='container'>
                    <NewsPanel />
                </div>
            </div>
        );
    }
}

export default App;