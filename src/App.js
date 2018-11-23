import React, { Component } from 'react';
import './App.css';
import { Button, Menu } from 'semantic-ui-react';
import axios from 'axios';
import { env } from './env';
import CreateStudentTap from './components/CreateStudentTap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ComplaintsTap from './components/ComplaintsTap';

class App extends Component {
  state = { 
    navActiveItem: 'home',
    menuActiveItem: 'complaints',
    studentName: '',
    studentEmail: '',
    studentPassword: '',
    creatingStudentAccount: false,
    complaints: [],
  }

  handleNaveItemClick = (e, { name }) => this.setState({ navActiveItem: name })
  handleMenuItemClick = (e, { name }) => this.setState({ menuActiveItem: name })

  async componentWillMount() {
    this.fetchStuff();
  }

  fetchStuff = async () => {
    const complaints = await axios.post(`${env.url}/getAllComplaints`);
    this.setState({
      complaints: complaints.data,
    });
    console.log(this.state);
  }

  renderMaintenanceMenu = () => {
    return (
      <div>Mentainance</div>
    );
  }

  renderBody = () => {
    switch (this.state.menuActiveItem) {
      case 'maintenance requests':
        return this.renderMaintenanceMenu();
      case 'create student': 
        return <CreateStudentTap state={this.state} setState={(state) => {this.setState(state)}} />
      default: 
        return <ComplaintsTap state={this.state} setState={(state) => {this.setState(state)}} fetchStuff={this.fetchStuff}/>
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
        <ToastContainer />
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
