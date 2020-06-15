import React,{Component} from 'react';
//reactstrap is used to use bootstrap in react
import {Navbar,NavbarBrand} from 'reactstrap'
import './App.css';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import {ConfigStore} from './redux/ConfigureStore'
const store=ConfigStore()
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <Main />
          </div>
        </BrowserRouter> 
      </Provider> 
    );
  }
}

export default App;
