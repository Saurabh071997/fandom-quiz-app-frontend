import React from 'react'
import {CssBaseline} from '@material-ui/core'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import {Navigation} from './components/Navigation'
import {Footer} from './components/Footer'

const App = () => {
  return (
    <div className="App">
        <CssBaseline/>

        <Navigation />
        <div style={{minHeight: "100vh"}}>
          
        </div>
        <Footer/>

    </div>
  );
}

export default App;
