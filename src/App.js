import React from 'react';
import 'typeface-roboto';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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
          <Switch>
            <Route path='/' exact component={LandingPage} />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

export default App;
