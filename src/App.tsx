import React from 'react'
import {CssBaseline, AppBar, Toolbar, Typography, IconButton} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import './App.css'

function App() {
  return (
    <div className="App">
        <CssBaseline/>
        <AppBar>

          <Toolbar>
          <IconButton>
          <MenuIcon/>
          </IconButton>
            <Typography>fandomQUIZ</Typography>
          </Toolbar>
        </AppBar>
    </div>
  );
}

export default App;
