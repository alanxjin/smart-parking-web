import React , { Component } from 'react';
//import './Menu.css';
import { Menu, Segment } from 'semantic-ui-react';

export default class App extends Component{
  
    render() {
      const { activeMenuItem, handleMenuItemClick} = this.props;
      return (
        <Segment attached inverted>
          <Menu inverted pointing secondary>
            <Menu.Item
              name='home'
              active={activeMenuItem === 'home'}
              onClick={handleMenuItemClick}
            />
            <Menu.Item
              name='my meter'
              active={activeMenuItem === 'my meter'}
              onClick={handleMenuItemClick}
            />
            <Menu.Item
              name='settings'
              active={activeMenuItem === 'settings'}
              onClick={handleMenuItemClick}
            />
          </Menu>
        </Segment>
      )
    }
  
}

