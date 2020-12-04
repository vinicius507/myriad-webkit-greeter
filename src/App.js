import React, { Component } from 'react';
import './App.css';
import mock from './js/mock2';
import LoginContainer from './LoginContainer/LoginContainer';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      width: 0,
      height: 0,
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.outerWidth, height: window.outerHeight });
  }

  render() {
    return (
      <LoginContainer />
    );
  }
}

export default App;
