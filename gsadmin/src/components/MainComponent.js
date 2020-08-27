import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDishes} from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
//import { TransitionGroup, CSSTransition } from 'react-transition-group';

import HeaderComponent from './HeaderComponent';
import HomeComponent from './HomeComponent';
import MenuComponet from './MenuComponent';
import LoginComponent from './Login';
import SignUp from './SignUp';

import {DISHES} from '../shared/dishes';
import Footer from './Footer';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={(props) => (
//       this.props.auth.isAuthenticated
//         ? <Component {...props} />
//         : <Redirect to={{
//             pathname: '/home',
//             state: { from: props.location }
//           }} />
//     )} />
//   );
import {signin, signup, fetchMenu} from '../redux/ActionCreators';

const mapStateToProps =(state)=>{
  return{
  auth: state.auth,
  menu: state.menu
  }
}


const mapDispatchToProps=(dispatch)=>({
signin: (creds)=> dispatch(signin(creds)),
signup: (creds)=> dispatch(signup(creds)),
fetchMenu: (cafeId)=>dispatch(fetchMenu(cafeId))
});

class Main extends Component {
  render(){
    const dishes = DISHES;
      return (
        <div>
          <HeaderComponent />  
          <Switch>
                <Route path="/home" component={HomeComponent} />
                <Route exact path="/menu" component={()=><MenuComponet menu={this.props.menu} user={this.props.auth.user} fetchMenu={this.props.fetchMenu} />} />
                <Route exaxt path ="/login" component={()=><LoginComponent signin={this.props.signin} signup={this.props.signup} />} />
                <Redirect to="/home" />
          </Switch>
              <Footer />
        </div>
      );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));