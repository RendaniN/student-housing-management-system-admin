import React, { Component } from 'react';
import { Table, TextArea, Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import qs from 'querystring';
import { env } from '../env';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class ComplaintRow extends Component {
  state = {
    replay: null,
  }

  closeComplaint = () => {
    axios.post(`${env.url}/closeComplaint`, qs.stringify({ complaint_id: this.props.complaint.id }))
    .then((response) =>{
      this.props.fetchStuff();
      toast.success('Complaint has been closed', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  }

  replayToComplaint = () => {
    axios.post(`${env.url}/replayToComplaint`, qs.stringify({ complaint_id: this.props.complaint.id, replay: this.state.replay }))
    .then((response) =>{
      this.props.fetchStuff();
      toast.success('Reply submitted to the complaint', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    });
  }

  render() {
    const { complaint } = this.props;
    return(
      <Table.Row key={complaint.id} disabled={(complaint.status === "closed")}>
        <Table.Cell><h4>{complaint.id}</h4></Table.Cell>
        <Table.Cell><h3>{complaint.title}</h3></Table.Cell>
        <Table.Cell>{complaint.description}</Table.Cell>
        <Table.Cell>{complaint.created_at}</Table.Cell>
        <Table.Cell>{complaint.student.name}</Table.Cell>
        <Table.Cell>
          {
            (complaint.replay) ? 
            complaint.replay : 
            <div>
              <Form onSubmit={(data) => {this.replayToComplaint(complaint.id, data)}}>
                <TextArea rows="2" autoHeight onChange={(e) => {this.setState({replay: e.target.value})}} style={styles.tableTextArea}/>
                <Button type="submit" size="small" fluid>Replay</Button>
              </Form>

            </div>
          }
        </Table.Cell>
        <Table.Cell>
          {
            (complaint.status === "open") ?
            <Button inverted size="large" color="red" onClick={this.closeComplaint}>Close</Button> :
            <Button inverted size="large" disabled color="red">Closed</Button>
          }
        </Table.Cell>
      </Table.Row>
    );
  }
}

const styles = {
  tableTextArea: {
    borderRadius: 5, 
    width: '100%',
  }
}

export default ComplaintRow;