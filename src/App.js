import React , { Component } from 'react';
import './App.css';
import {Menu} from 'semantic-ui-react';
import Home from './Components/Home';
import MyMeter from './Components/MyMeter';
import Settings from './Components/Settings';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
 } from "react-router-dom";

import firebase from 'firebase';


// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/signedIn',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ]
  };

class App extends Component{
  
    render() {
      
        return (
            <div id="App">
                <Router>
                    <div id="nav">
                    <Menu inverted pointing attached>
                        <Menu.Item as={Link} name='home' to='/home'/>
                        <Menu.Item as={Link} name='my meter' to='/my_meter'/>
                        <Menu.Item as={Link} name='settings' to='/settings'/>
                    </Menu>
                    </div>
                    <Switch>
                        <Route path="/home">
                            <Home/>
                        </Route>
                        <Route path="/my_meter">
                            <MyMeter/>
                        </Route>
                        <Route path="/settings">
                            <Settings/>
                        </Route>
                    </Switch>
                </Router>
            </div>
        )
    }
  
}

export default App;
