import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import cellEditFactory from 'react-bootstrap-table2-editor';
import { alertService } from '../services/alert.service';
import clientService from "../services/client-service";



export default class ClientList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      client: [],
      autoClose: true,
      keepAfterRouteChange: false,
      columns: [{
        headerStyle: (colum, colIndex) => {
          return { width: '5%' };
        },
        dataField: 'id',
        text: 'R.br.',
        editable: false
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '10%' };
        },
        dataField: 'firstName',
        text: 'Ime',
        editor: {
          
        }
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '10%' };
        },
        dataField: 'lastName',
        text: 'Prezime',
        editor: {
          
        }
      }
      ,  {
        headerStyle: (colum, colIndex) => {
          return { width: '10%' };
        },
        dataField: 'jmbg',
        text: 'JMBG',
        editor: {
          
        }
      },
      {
        headerStyle: (colum, colIndex) => {
          return { width: '20%' };
        },
        dataField: 'address',
        text: 'Adresa',
        editor: {
          
        }
      },
      {
        headerStyle: (colum, colIndex) => {
          return { width: '10%' };
        },
        dataField: 'phone',
        text: 'Telefon',
        editor: {
          
        }
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '7%' };
        },
        dataField: 'actions',
        text: 'Akcije',
        editable: false,
        isDummyField: true,
        formatter: this.activateDeactivateAction,
        headerAlign: 'center'
      }
      ],
      showOutgoingCallTemplateCreate: false
    }
    this.editTemplateName = this.editTemplateName.bind(this);
    this.onDeleteTemplate = this.onDeleteTemplate.bind(this);
  };

    
getAllPrices() {
    clientService.getClients()
    .then(res => {
      this.setState({ client: res.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  onDeleteTemplate(event,row,rowIndex) {
    const { autoClose, keepAfterRouteChange } = this.state;
    clientService.deleteClient(row.id).then(res => {
      console.log("Response= ", res)
      if(res.data === 1) {
        let clientTemp = [...this.state.client]
        clientTemp.splice(rowIndex,1)
        this.setState({client : clientTemp})
        alertService.success('Uspesno obrisan klijent sa id= ' + row.id + '!!!', { autoClose, keepAfterRouteChange })
      }
      else {
        alert("Brisanje neuspesno, izabrani klijent ima ugovor!")
      }
    })
  }


  editTemplateName = (oldName, newName, template) => {
    if(newName !== ''){
    template.firstName = newName;
    clientService.updateClient(template);
    } else {
      newName = oldName;
    }
  }

  activateDeactivateAction = (cell, row, rowIndex, formatExtraData) => {
      return (
        <button  className="btn btn-danger btn-sm"
         onClick={(e) => {
           this.onDeleteTemplate(e,row,rowIndex);
         }}
       >
         Obrisi
       </button>
      );  
  };

  componentDidMount() {
    clientService.getClients()
    .then(res => {
      this.setState({ client: res.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  };



  render() {
    return (
      <div className="container col-md-7 ">
        <p className="Table-header">Korisnici</p>
        <br></br>
        <BootstrapTable
          keyField='id'
          data={this.state.client}
          columns={this.state.columns}
          cellEdit={ cellEditFactory({
            mode: 'dbclick',
            afterSaveCell: (oldValue, newValue, row, column) => {
             this.editTemplateName(oldValue,newValue, row) 
            }
          }) }
          striped
          bordered
          bootstrap4
          size="sm" />
      </div>
    );
  }
}


