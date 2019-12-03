import React , { Component } from 'react';
import './App.css';
import {Menu, Button} from 'semantic-ui-react';
import Home from './Components/Home';
import MyMeter from './Components/MyMeter';
import Settings from './Components/Settings';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
 } from "react-router-dom";

import firebase from 'firebase';



class SignInScreen extends Component{
    // Configure FirebaseUI.
    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you ca n provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/',
        'credentialHelper': 'none',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.EmailAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            //   this.props.setUser(firebase.auth().currentUser);
            //   return true;
            // }.bind(this)
        }
    }

    render(){
        return (
            <div id="sign_in">
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
        );
    }
    
}


class PrivateRoute extends Component {
    render(){
        let { children, ...rest } = this.props;
        let user = firebase.auth().currentUser;
        return (
            <Route
                {...rest}
                render={() =>
                    user? (
                    children
                ) : (
                    <Redirect
                    to={{
                        pathname: "/sign_in",
                    }}
                    />
                )
                }
            />
        );
    }
  }


class Navigation extends Component{
    // constructor(props) {
    //     super(props);
    //     this.state = {user: firebase.auth().currentUser};
    // }
    logOutUser = ()=>{
       
        firebase.auth().signOut();
        // this.setState({user:null})
    }
    // setUser = (user) =>{
    //     console.log(user);
    //     this.setState({user})
    // }
    render(){ 
        // let {user} = this.state;
        return(
            <Router>
                <div id="nav">
                <Menu inverted pointing attached>
                    <Menu.Item as={Link} name='home' to='/home'/>
                    <Menu.Item as={Link} name='my meter' to='/my_meter'/>
                    <Menu.Menu position='right'>
                        <Menu.Item as={Link} name={'User'} to='/settings'/>
                        {/* {user? */}
                            <Menu.Item as={Link} name='Logout' to='/home' onClick={this.logOutUser}/>:""
                        {/* } */}
                       
                    </Menu.Menu>
                </Menu>
                </div>
                <Switch>
                    <Route exact path="/">
                        <Home/>
                    </Route>
                    <Route path="/home">
                        <Home/>
                    </Route>
                    <PrivateRoute  path="/my_meter">
                        <MyMeter/>
                    </PrivateRoute>
                    <PrivateRoute path="/settings">
                        <Settings/>
                    </PrivateRoute>
                    <Route path="/sign_in">
                        <SignInScreen/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}
class App extends Component{
  
    render() {
        return (
            <div id="App">
                <Navigation/>
            </div>
        )
    }
  
}

export default App;
