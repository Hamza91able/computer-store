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
import Footer from './Components/Footer';

// Screens
import LandingPage from './Screens/LandingPage';
import ProductDetails from './Screens/ProductDetails';
import Register from './Screens/Register';
import Login from './Screens/Login';

class App extends React.Component {

  render() {

    return (
      <React.Fragment>
        <Router>
          <Appbar />
          <div style={{ height: 20 }}></div>
          <Switch>
            <Route path='/' exact component={LandingPage} />
            <Route path='/product-details' exact component={ProductDetails} />
            <Route path='/register' exact component={Register} />
            <Route path='/login' exact component={Login} />
          </Switch>
          <div style={{ height: 100 }}></div>
          <Footer />
        </Router>
      </React.Fragment>
    )
  }
}

export default App;
