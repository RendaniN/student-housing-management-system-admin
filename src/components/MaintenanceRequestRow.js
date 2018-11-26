import React, {Component} from 'react';
import { Table, TextArea, Button, Form, Label } from 'semantic-ui-react';
import axios from 'axios';
import qs from 'querystring';
import { env } from '../env';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { request } from 'https';

class MaintenanceRequestRow extends Component {

  closeRequest = () => {
    axios.post(`${env.url}/closeMaintenanceRequest`, qs.stringify({ request_id: this.props.request.id }))
    .then(() =>{
      this.props.fetchStuff();
      toast.success('Request has been closed', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  }

  renderStatusButtons = () => {
    const { request } = this.props;
    if (request.status === 'open') {
      return (
        <Button.Group>
          <Button 
            negative
            onClick={this.closeRequest}
          >
            Close
          </Button>
          <Button.Or text='or' />
          <Button 
            onClick={this.markRequestAsInProcess}
            positive
          >
            In Process
          </Button>
        </Button.Group> 
      );
    } else if (request.status === 'in_process') {
      return (
        <Button negative>
          Close 
        </Button>
      );
    } else {
      return <p>Request is closed.</p>
    }
  }

  renderCurrentStatus = () => {
    const { request } = this.props;
    if (request.status === 'open') {
      return (
        <Label as='a' color='green' tag>
          Open
        </Label>
      );
    } else if ( request.status === 'closed') {
      return (
        <Label as='a' color='red' tag>
          Closed
        </Label>
      );
    } else {
      return (
        <Label as='a' color='blue' tag>
          In Process
        </Label>
      );
    }
  }

  render () {
    const { request } = this.props; 

    return (
      <Table.Row key={request.id} disabled={(request.status === "closed")}>
        <Table.Cell><h4>{request.id}</h4></Table.Cell>
        <Table.Cell>{request.type}</Table.Cell>
        <Table.Cell><h3>{request.title}</h3></Table.Cell>
        <Table.Cell>{request.description}</Table.Cell>
        <Table.Cell>{request.created_at}</Table.Cell>
        <Table.Cell>{request.student.name}</Table.Cell>
        <Table.Cell>
          {this.renderCurrentStatus()}
        </Table.Cell>
        <Table.Cell>
          {this.renderStatusButtons()}
        </Table.Cell>

      </Table.Row>
    );
  }
  
}

export default MaintenanceRequestRow;