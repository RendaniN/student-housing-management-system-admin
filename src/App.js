import React, { Component } from 'react';
import './App.css';
import { Button, Menu, Table, Container, Form, Header } from 'semantic-ui-react';
import axios from 'axios';
import qs from 'querystring';
import { env } from './env';
import ComplaintRow from './components/ComponentRow';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  createStudnet = async (e) => {
    e.preventDefault();
    const name = this.state.studentName;
    const email = this.state.studentEmail;
    const password = this.state.studentPassword;
    const password_confirmation = this.state.studentPassword;
    this.setState({creatingStudentAccount: true});
    axios.post(`${env.url}/createStudentAccount`, qs.stringify({name, email, password, password_confirmation}))
    .then(response => {
      console.log(response.data);
      this.setState({
        creatingStudentAccount: false,
        studentEmail: '',
        studentName: '',
        studentPassword: '',
      });
      toast.success('New student has been created', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    })
    .catch(error => {
      this.setState({creatingStudentAccount: false});
      toast.error(`${error}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    })
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
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>By</Table.HeaderCell>
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
      <Container text textAlign="left">
        <Header>Create Student Account</Header>
        <Form onSubmit={this.createStudnet}>
          <Form.Field>
            <label>Name</label>
            <input 
            placeholder='Name' 
            value={this.state.studentName} 
            onChange={e => {this.setState({studentName: e.target.value})}} 
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input 
            placeholder='Email' 
            type="email" 
            value={this.state.studentEmail} 
            onChange={e => {this.setState({studentEmail: e.target.value})}} 
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input 
            placeholder='Password' 
            type="password" 
            value={this.state.studentPassword} 
            onChange={e => {this.setState({studentPassword: e.target.value})}} 
            />
          </Form.Field>
          <Button loading={this.state.creatingStudentAccount} primary type='submit'>Create Student</Button>
        </Form>
      </Container>
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
