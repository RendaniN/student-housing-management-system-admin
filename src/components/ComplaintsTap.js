import React, { Component } from 'react';
import { Table, } from 'semantic-ui-react';
import ComplaintRow from './ComponentRow';

class ComplaintsTap extends Component {
  render() {
    const complaints = this.props.state.complaints.map((complaint) => {
      return (
        <ComplaintRow complaint={complaint} key={complaint.id} fetchStuff={this.props.fetchStuff} />
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

export default ComplaintsTap;