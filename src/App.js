// import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
// b3ae91950a744ab6926f4a5474f8dd84
import React, { Component } from 'react'

export default class App extends Component {
  render() {
    return (
      <div> 
        <Navbar/>
        <News pageSize = {6}/>
      </div>
    )
  }
}

