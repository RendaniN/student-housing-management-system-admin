import React, { Component } from 'react';
import { Button, Container, Form, Header } from 'semantic-ui-react';
import axios from 'axios';
import qs from 'querystring';
import { env } from '../env';
import { toast } from 'react-toastify';


class CreateStudentTap extends Component {

  createStudnet = async (e) => {
    e.preventDefault();
    const name = this.props.state.studentName;
    const email = this.props.state.studentEmail;
    const password = this.props.state.studentPassword;
    const password_confirmation = this.props.state.studentPassword;
    this.props.setState({creatingStudentAccount: true});
    axios.post(`${env.url}/createStudentAccount`, qs.stringify({name, email, password, password_confirmation}))
    .then(response => {
      console.log(response.data);
      this.props.setState({
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
      this.props.setState({creatingStudentAccount: false});
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

  render() {
    // const { state, setState } = this.prosp;
    return (
      <Container text textAlign="left">
        <Header>Create Student Account</Header>
        <Form onSubmit={this.createStudnet}>
          <Form.Field>
            <label>Name</label>
            <input 
            placeholder='Name' 
            value={this.props.state.studentName} 
            onChange={e => {this.props.setState({studentName: e.target.value})}} 
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input 
            placeholder='Email' 
            type="email" 
            value={this.props.state.studentEmail} 
            onChange={e => {this.props.setState({studentEmail: e.target.value})}} 
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input 
            placeholder='Password' 
            type="password" 
            value={this.props.state.studentPassword} 
            onChange={e => {this.props.setState({studentPassword: e.target.value})}} 
            />
          </Form.Field>
          <Button loading={this.props.state.creatingStudentAccount} primary type='submit'>Create Student</Button>
        </Form>
      </Container>
    );
  }
}

export default CreateStudentTap;