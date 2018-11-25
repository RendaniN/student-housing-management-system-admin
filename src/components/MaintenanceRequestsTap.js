import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import MaintenanceRequestsRow from './MaintenanceRequestRow';

class MaintenanceRequests extends Component {

  render() {
    const requests = this.props.state.requests.map((request) => {
      return (
        <MaintenanceRequestsRow request={request} key={request.id} fetchStuff={this.props.fetchStuff} />
      );
    })
    return (
      <Table celled style={styles.table} textAlign="center">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Description</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>By</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {requests}
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

export default MaintenanceRequests;