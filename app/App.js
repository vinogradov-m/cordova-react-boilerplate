import React, { Component } from 'react';
import logo from './logo.svg';
import * as styles from './App.css';

export default class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <div className={styles.appHeader}>
          <img src={logo} className={styles.appLogo} alt="logo" />
          <h2>Welcome to Cordova React Boilerplate</h2>
        </div>
      </div>
    );
  }
}
