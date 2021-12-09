import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory , { PaginationProvider, PaginationListStandalone, PaginationTotalStandalone} from 'react-bootstrap-table2-paginator';
import agreementService from "../services/agreement-service";
import { alertService } from '../services/alert.service';



export default class SalesSigningAgreementList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agreements: [],
      autoClose: true,
      keepAfterRouteChange: false,
      columns: [{
        headerStyle: (colum, colIndex) => {
          return { width: '3%' };
        },
        dataField: 'id',
        text: 'Br. ug.',
        filter: textFilter(),
        formatter: (cell, row) => <a href={"#/agreementInfo/" + row.id}> {cell} </a>,
        editable: false
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '5%' };
        },
        dataField: 'client.firstName',
        text: 'Ime korisnika',
        filter: textFilter(),
        editor: {
          
        }
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '5%' };
        },
        dataField: 'client.lastName',
        text: 'Prezime korisnika',
        filter: textFilter(),
        editor: {
          
        }
      }
      ,  {
        headerStyle: (colum, colIndex) => {
          return { width: '10%' };
        },
        dataField: 'client.jmbg',
        text: 'JMBG klijenta',
        filter: textFilter(),
        editor: {
          
        }
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '10%' };
        },
        dataField: 'pack.name',
        text: 'Naziv paketa',
        filter: textFilter(),
        editor: {
          
        }
      }
      , {
        headerStyle: (colum, colIndex) => {
          return { width: '10%' };
        },
        dataField: 'technicianStatus.name',
        text: 'Tech Status',
        filter: textFilter(),
        editor: {
          
        }
      }
      , {
        headerStyle: (colum, colIndex) => {
          return { width: '10%' };
        },
        dataField: 'actions',
        text: 'Promena statusa',
        editable: false,
        isDummyField: true,
        formatter: this.columnActions,
        headerAlign: 'center'
      }
      ]
    }
    this.onSendSigningCheck = this.onSendSigningCheck.bind(this);
  };

    
getAllAgreements() {
    agreementService.getAllAgreementsByTechStatusSigning()
    .then(res => {
      this.setState({ agreements: res.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  onSendSigningCheck = (event, row, newStatus) => {
    event.preventDefault();
    const { autoClose, keepAfterRouteChange } = this.state;
    agreementService.changeTechStatus(row, newStatus).then(res => {
      console.log("Response= ", res)
      if(res.data === 1) {
       this.getAllAgreements();
        alertService.success('Uspesno promenjen status, ugovor sa rednim brojem = ' + row.id + '!!!', { autoClose, keepAfterRouteChange })
      }
      else {
        alert("Neuspela promena statusa!")
      }
    })
  }



  columnActions = (cell, row, rowIndex, formatExtraData) => {
    if(row.technicianStatus.id === 2) {
      return (
        <div className="d-flex justify-content-between" align="center">
          <button className="btn btn-primary btn-sm"
            onClick={(e) => {
              this.onSendSigningCheck(e, row, 4);
            }}
          >
            Posalji na potpisivanje
          </button>
          </div>
          );
    } else if (row.technicianStatus.id === 4) {
      return (
        <div className="d-flex justify-content-between" align="center">

          <button className="btn btn-primary btn-sm"
            onClick={(e) => {
              this.onSendSigningCheck(e, row, 5);
            }}
          >
            Potpisan
          </button>

          <button className="btn btn-primary btn-sm"
            onClick={(e) => {
              this.onSendSigningCheck(e, row, 6);
            }}
          >
            Nije potpisan
          </button>
        </div>
      );  
    } else if (row.technicianStatus.id === 5) {
      return (
        <div>
          Potpisivanje je zavrseno
        </div>
      );
    } else if (row.technicianStatus.id === 6) {
        return (
            <div>
                Potpisivanje odbijeno, ugovor otkazan
            </div>
        )
    } 

  };

  componentDidMount() {
    agreementService.getAllAgreementsByTechStatusSigning()
    .then(res => {
      this.setState({ agreements: res.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  };



  render() {
    const paginationOption = {
        custom: true,
        totalSize: this.state.agreements.length,
      };
    return (
      <div className="container col-md-9 ">
        <p className="Table-header">Potpisivanje</p>
        <br></br>
        <PaginationProvider pagination={ paginationFactory(paginationOption) }>
        {
    ({
      paginationProps,
      paginationTableProps
    }) => (<div> 

      <PaginationTotalStandalone { ...paginationProps } />
        <BootstrapTable
          keyField='id'
          data={this.state.agreements}
          columns={this.state.columns}
          filter={ filterFactory() }
          striped
          bordered
          bootstrap4
          size="sm" 
          { ...paginationTableProps }/>

    <PaginationListStandalone { ...paginationProps } />
          </div>)
        }
      </PaginationProvider>
      </div>
    );
  }
}


