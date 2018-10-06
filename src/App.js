import React, { Component } from 'react';
import './App.css';
import { Button, Menu, TextArea, Table, Form, } from 'semantic-ui-react';
import axios from 'axios';
import qs from 'querystring';
import { env } from './env';
import ComplaintRow from './components/ComponentRow';

class App extends Component {
  state = { 
    navActiveItem: 'home',
    menuActiveItem: 'complaints',
    complaints: [],
  }

  handleNaveItemClick = (e, { name }) => this.setState({ navActiveItem: name })
  handleMenuItemClick = (e, { name }) => this.setState({ menuActiveItem: name })

  componentWillMount() {
    this.fetchStuff();
  }

  fetchStuff = async () => {
    const complaints = await axios.post(`${env.url}/getAllComplaints`);
    this.setState({
      complaints: complaints.data,
    });
    console.log(this.state);
  }

  ////////////////////////////////////////////////////////////////////////////////////// Complaint Menu
  renderComplaintsMenu = () => {
    const complaints = this.state.complaints.map((complaint) => {
      return (
        <ComplaintRow complaint={complaint} key={complaint.id} fetchStuff={this.fetchStuff} />
      );
    })
    return (
      <Table celled style={styles.table} textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Replay</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {complaints}
        </Table.Body>
      </Table>
    );
  }
  ////////////////////////////////////////////////////////////////////////////////////// END Complaint Menu

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

        {/* Meru Body Section */}
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
  },
  tableTextArea: {
    borderRadius: 5, 
    width: '100%',
  }
}

export default App;
