import React,{Component} from 'react';
//reactstrap is used to use bootstrap in react
import {Navbar,NavbarBrand} from 'reactstrap'
import './App.css';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>  
    );
  }
}

export default App;
