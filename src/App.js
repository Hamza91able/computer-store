import React from 'react';
import 'typeface-roboto';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

//Components
import Appbar from './Components/Appbar';

// Screens
import LandingPage from './Screens/LandingPage';

class App extends React.Component {

  render() {

    return (
      <React.Fragment>
        <Router>
          <Appbar />
          <div style={{ height: 20 }}></div>
          <Switch>
            <Route path='/' exact component={LandingPage} />
          </Switch>
        </Router>
        <div style={{ height: 300 }}></div>
      </React.Fragment>
    )
  }
}

export default App;
