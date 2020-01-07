import React from 'react';
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';
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
import SearchPage from './Screens/SearchPage';
import CategoriePage from './Screens/CategoriePage';
import Cart from './Screens/Cart';
import Checkout from './Screens/Checkout';
import UserAccount from './Screens/UserAccount';
import Admin from './Screens/AdminPanel/Admin';

const styles = theme => ({
  placeHodlerDiv: {
    height: 182,
    [theme.breakpoints.up('md')]: {
      height: 128,
    }
  }
});

class App extends React.Component {

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Router>
          <Appbar />
          <div className={classes.placeHodlerDiv} />
          <Switch>
            <Route path='/' exact component={LandingPage} />
            <Route path='/product-details' exact component={ProductDetails} />
            <Route path='/register' exact component={Register} />
            <Route path='/login' exact component={Login} />
            <Route path='/s/:k' exact component={SearchPage} />
            <Route path='/c' exact component={CategoriePage} />
            <Route path='/cart' exact component={Cart} />
            <Route path='/buy/addressselect' exact component={Checkout} />
            <Route path='/account' exact component={UserAccount} />
            <Route path='/admin' exact component={Admin} />
          </Switch>
          <div style={{ height: 100 }}></div>
          <Footer />
        </Router>
      </React.Fragment>
    )
  }
}

export default withStyles(styles)(App);
