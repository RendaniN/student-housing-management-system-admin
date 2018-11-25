import React, {Component} from 'react';
import { Table, TextArea, Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import qs from 'querystring';
import { env } from '../env';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { request } from 'https';

class MaintenanceRequestRow extends Component {
  render () {
    const { request } = this.props; 
    return (
      <Table.Row key={request.id}>
        <Table.Cell><h4>{request.id}</h4></Table.Cell>
        <Table.Cell>{request.type}</Table.Cell>
        <Table.Cell><h3>{request.title}</h3></Table.Cell>
        <Table.Cell>{request.description}</Table.Cell>
        <Table.Cell>{request.created_at}</Table.Cell>
        <Table.Cell>{request.student.name}</Table.Cell>
      </Table.Row>
    );
  }
  
}

export default MaintenanceRequestRow;