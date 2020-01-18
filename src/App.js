import React from 'react';
import 'typeface-roboto';
import { withStyles } from '@material-ui/core/styles';
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button";

import axios from 'axios';
import swal from 'sweetalert2';

import connectionString from './Static/Utilities/connectionString';

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
import ReviewItems from './Screens/ReviewItems';
import PaymentPage from './Screens/PaymentPage';
import PaymentMethod from './Screens/PaymentMethod';
import PlaceOrder from './Screens/PlaceOrder';
import PaymentCompletionPage from './Screens/PaymentCompletionPage';
import ErrorFourZeroFour from './Screens/ErrorFourZeroFour';
import ContactUs from './Screens/ContactUs';

const styles = theme => ({
  placeHodlerDiv: {
    height: 210,
    [theme.breakpoints.up('md')]: {
      height: 128,
    }
  }
});

class App extends React.Component {

  state = {
    isAuth: false,
    token: null,
    userId: null,
    user: null,
    appBarCategories: [],
    categories: [],
  }

  componentDidMount() {
    this.getAppBarCategories();
    this.getCategories();
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expiryDate = localStorage.getItem('expiryDate');

    if (token && userId && expiryDate) {
      this.setState({
        isAuth: true,
        token,
        userId,
      }, () => {
        this.getUser();
      })
    }
  }

  getUser = () => {
    const { token, userId, isAuth } = this.state;

    if (isAuth) {
      axios({
        url: `${connectionString}/user/get-user`,
        method: 'POST',
        data: {
          userId,
        },
        headers: {
          Authorization: 'bearer ' + token,
        }
      }).then(res => {
        console.log(res.data);
        this.setState({
          user: res.data.user
        })
      }).catch(err => {
        console.log(err);
        this.logoutHandler();
      })
    }
  }

  loginHandler = (authData, origin) => {
    const { email, password } = authData;

    axios({
      url: `${connectionString}/auth/login`,
      method: 'POST',
      data: {
        email,
        password
      }
    }).then(res => {
      console.log(res.data);
      if (res.data.message === "Invalid Password") {
        swal.fire({
          icon: 'error',
          title: `Invalid Password`,
          text: "Password is invalid",
        })
      } else {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        this.setState({
          isAuth: true,
          token: res.data.token,
          userId: res.data.userId
        });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userId', res.data.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
        this.getUser();
        this.props.history.replace('/');
      }
    }).catch(err => {
      console.log(err);
    })
  }

  signupHandler = authData => {
    const { email, password, confirmPassword, name } = authData;

    if (password === confirmPassword) {
      axios({
        url: `${connectionString}/auth/signup`,
        method: 'PUT',
        data: {
          email,
          password,
          name
        }
      }).then(res => {
        console.log(res.data);
        swal.fire({
          icon: 'success',
          title: 'User Registered',
        }).then(() => {
          this.props.history.replace('/login');
        })
      }).catch(err => {
        console.log(err);
      })
    } else {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Password doesn't match`,
      })
    }
  }

  getAppBarCategories = () => {

    axios({
      url: `${connectionString}/categories/get-appbar-categories`,
      method: 'GET',
    })
      .then(res => {
        this.setState({
          appBarCategories: res.data.categories
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  getCategories = () => {

    axios({
      url: `${connectionString}/categories/get-categories`,
      method: 'GET',
    })
      .then(res => {
        this.setState({
          categories: res.data.categories
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    window.location.reload();
  };

  render() {
    const { classes } = this.props;
    const { appBarCategories, categories, user, isAuth } = this.state;

    return (
      <React.Fragment>
        <ScrollUpButton
          ShowAtPosition={150}
          EasingType='easeOutCubic'
          AnimationDuration={500}
          style={{ zIndex: 9999 }}
        />
        <Appbar isAuth={isAuth} categories={categories} appBarCategories={appBarCategories} user={this.state.user} logoutHandler={this.logoutHandler} />
        <div className={classes.placeHodlerDiv} />
        <Switch>
          <Route path='/' exact component={LandingPage} />
          <Route path='/product-details/:id' exact render={props => (<ProductDetails {...props} isAuth={isAuth} userId={this.state.userId} token={this.state.token} />)} />
          <Route path='/register' exact render={props => (<Register {...props} onRegister={this.signupHandler} />)} />
          <Route path='/login' exact render={props => (<Login {...props} onLogin={this.loginHandler} />)} />
          <Route path='/s/:k' exact render={props => (<SearchPage {...props} userId={this.state.userId} token={this.state.token} />)} />
          <Route path='/c/:categoryName' exact render={props => (<CategoriePage {...props} userId={this.state.userId} token={this.state.token} />)} />
          <Route path='/cart' exact render={props => (<Cart {...props} isAuth={isAuth} userId={this.state.userId} token={this.state.token} />)} />
          <Route path='/buy/addressselect' exact render={props => (<Checkout {...props} isAuth={isAuth} userId={this.state.userId} token={this.state.token} />)} />
          <Route path='/account' exact render={props => (<UserAccount {...props} isAuth={isAuth} userId={this.state.userId} token={this.state.token} />)} />
          <Route path='/account/:option' exact render={props => (<UserAccount {...props} isAuth={isAuth} userId={this.state.userId} token={this.state.token} />)} />
          <Route path='/admin/:tab' exact render={props => (<Admin {...props} user={user} userId={this.state.userId} token={this.state.token} />)} />
          <Route path='/review-items' exact render={props => (<ReviewItems {...props} isAuth={isAuth} userId={this.state.userId} token={this.state.token} />)} />
          <Route path='/pay' exact render={props => (<PaymentPage {...props} userId={this.state.userId} token={this.state.token} />)} />
          <Route path='/buy/payselect' exact render={props => (<PaymentMethod {...props} isAuth={isAuth} userId={this.state.userId} token={this.state.token} />)} />
          <Route path='/buy/placeorder/:n/:c/:m/:y' exact render={props => (<PlaceOrder {...props} isAuth={isAuth} userId={this.state.userId} token={this.state.token} />)} />
          <Route path='/buy/complete/:id' exact render={props => (<PaymentCompletionPage {...props} userId={this.state.userId} token={this.state.token} />)} />
          <Route path='/contact-us' exact render={props => (<ContactUs {...props} userId={this.state.userId} token={this.state.token} />)} />
          <Route path='/404' render={props => (<ErrorFourZeroFour />)} />
          <Route path='/*' render={props => (<ErrorFourZeroFour />)} />
        </Switch>
        <div style={{ height: 80 }}></div>
        <Footer isAuth={isAuth} appBarCategories={appBarCategories} />
      </React.Fragment>
    )
  }
}

export default withRouter(withStyles(styles)(App));
