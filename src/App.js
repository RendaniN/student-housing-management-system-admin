import React, { Component } from 'react';
import './App.css';
import { Button, Menu, Grid, Segment, Container, Card, Table } from 'semantic-ui-react';
import axios from 'axios';

class App extends Component {
  state = { 
    navActiveItem: 'home',
    menuActiveItem: 'complaints',
  }

  handleNaveItemClick = (e, { name }) => this.setState({ navActiveItem: name })
  handleMenuItemClick = (e, { name }) => this.setState({ menuActiveItem: name })

  async componentDidMount() {
     axios.post('https://student-housing-backend-wadahesam.c9users.io/api/getAllRooms')
     .then(response => {
       console.log(response.data);
     });
  }

  renderComplaintsMenu = () => {
    return (
      <Table style={styles.table}>
        <Table.Header>
          <Table.Row>
            <Table.Cell>Hello World</Table.Cell>
          </Table.Row>
        </Table.Header>
      </Table>
    );
  }

  renderMaintenanceMenu = () => {
    return (
      <div>Mentainance</div>
    );
  }

  renderCreateStudentMenu = () => {
    return (
      <div>Create Student</div>
    );
  }

  renderBody = () => {
    switch (this.state.menuActiveItem) {
      case 'maintenance requests':
        return this.renderMaintenanceMenu();
      case 'create student': 
        return this.renderCreateStudentMenu();
      default: 
        return this.renderComplaintsMenu();
    }
  }

  render() {
    const { activeItem, menuActiveItem } = this.state

    return (
      <div className="App">
        {/* Nav Section */}
        <div>
          <Menu inverted fixed="top" size='large'>
            <Menu.Item name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
            <Menu.Menu position='right'>
              <Menu.Item>
                <Button color="green">Admin Panel</Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
        </div>

        {/* Menu Section */}
        <div style={styles.menu}>
          <Menu pointing>
            <Menu.Item 
              name='complaints' 
              active={menuActiveItem === 'complaints'} 
              onClick={this.handleMenuItemClick} 
            />
            <Menu.Item
              name='maintenance requests'
              active={menuActiveItem === 'maintenance requests'}
              onClick={this.handleMenuItemClick}
            />
            <Menu.Item
              name='create student'
              active={menuActiveItem === 'create student'}
              onClick={this.handleMenuItemClick}
            />
          </Menu>
        </div>

        <div style={styles.menuBody}>
          {this.renderBody()}
        </div>

      </div>
    );
  }
}

const styles = {
  menu: {
    marginTop: 60,
    padding: 20,
  },
  menuBody: {
    padding: 20,
    marginTop: -20,
  }
}

export default App;
