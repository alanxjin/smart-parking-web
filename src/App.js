import React , { Component } from 'react';
import './App.css';
import Menu from './Components/Menu';
import Home from './Components/Home';
import MyMeter from './Components/MyMeter';
import Settings from './Components/Settings';

class App extends Component{
    state = { 
        activeMenuItem: 'home', // home, my meter, settings
        time: 0 // This will be fetched from database 
    }
    componentDidMount(){
        this.interval = setInterval(this.increaseTime, 1000)
    }
    increaseTime = () => { 
        this.setState((preState)=> ({time: preState.time +1}))
    }

    handleMenuItemClick = (e, { name }) => this.setState({ activeMenuItem: name })
    
    getContent = (activeMenuItem) => {
        switch(activeMenuItem) {
            case 'home':
                return <Home/>
            case 'my meter':
                return <MyMeter time={this.state.time}/>
            default:
                return <Settings/>;
          }
    }

    render() {
        const {activeMenuItem} = this.state;
        return (
            <div id="App">
            <Menu attached activeMenuItem={activeMenuItem} handleMenuItemClick={this.handleMenuItemClick}/>
            {this.getContent(activeMenuItem)}
            </div>
        )
    }
  
}

export default App;
