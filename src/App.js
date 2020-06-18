import React,{Component} from 'react';
import './App.css';
import Main from './components/MainComponent';
import {BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux';
import {ConfigStore} from './redux/ConfigureStore'

import c from './assets/images/zucchipakoda.png'
import b from './assets/images/elaicheesecake.png'
import a from './assets/images/alberto.png'
console.log(a)

console.log(b)
console.log(c)
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
