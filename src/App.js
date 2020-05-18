import React from 'react';
// import logo from './logo.svg';
//reactstrap is used to use bootstrap in react
import {Navbar,NavbarBrand} from 'reactstrap'
import './App.css';
import Menu from './components/menu'
import {DISHES} from './shared/dishes'
function App() {
  React.createElement('<h1>Hello</h1>',{});
  return (
    <div className="App">
      <Navbar dark color='primary'>
        <div className='container'>
          <NavbarBrand href='/'>Restaurant confusion</NavbarBrand>
        </div>
      </Navbar>
      <Menu dishes ={DISHES} />
    </div>
  );
}

export default App;
