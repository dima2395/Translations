import React, { Component } from "react";
import Translations from "layout/pages/Translations";
import GlobalMessages from "layout/messages";
import "assets/css/styles.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="app">
          <div className="wrapper">
            <Translations />
          </div>
        </div>
        <GlobalMessages />
      </React.Fragment>
    );
  }
}

export default App;
