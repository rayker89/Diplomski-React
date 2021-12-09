import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory , { PaginationProvider, PaginationListStandalone, PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';
import agreementService from "../services/agreement-service";
import { alertService } from '../services/alert.service';
import authService from "../services/auth.service";



export default class AgreementList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      agreements: [],
      autoClose: true,
      keepAfterRouteChange: false,
      columns: [{
        headerStyle: (colum, colIndex) => {
          return { width: '5%' };
        },
        dataField: 'id',
        text: 'Br. ug.',
        filter: textFilter(),
        formatter: (cell, row) => <a href={"#/agreementInfo/" + row.id}> {cell} </a>,
        editable: false
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '7%' };
        },
        dataField: 'client.firstName',
        text: 'Ime korisnika',
        filter: textFilter(),
        editor: {
          
        }
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '7%' };
        },
        dataField: 'client.lastName',
        text: 'Prezime korisnika',
        filter: textFilter(),
        editor: {
          
        }
      }
      ,  {
        headerStyle: (colum, colIndex) => {
          return { width: '12%' };
        },
        dataField: 'client.jmbg',
        text: 'JMBG klijenta',
        filter: textFilter(),
        editor: {
          
        }
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '15%' };
        },
        dataField: 'pack.name',
        text: 'Naziv paketa',
        filter: textFilter(),
        editor: {
          
        }
      }
      , {
        headerStyle: (colum, colIndex) => {
          return { width: '7%' };
        },
        dataField: 'agreementStatus.name',
        text: 'Status ugovora',
        filter: textFilter(),
        editor: {
          
        }
      }
      , {
        headerStyle: (colum, colIndex) => {
          return { width: '10%' };
        },
        dataField: 'actions',
        text: 'Akcije',
        editable: false,
        isDummyField: true,
        formatter: this.activateDeactivateAction,
        headerAlign: 'center'
      }
      ]
    }
    this.onDeleteTemplate = this.onDeleteTemplate.bind(this);
  };


getAllPrices() {
    agreementService.getAgreements()
    .then(res => {
      this.setState({ agreements: res.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  onDeleteTemplate(event,row,rowIndex) {
    const { autoClose, keepAfterRouteChange } = this.state;
    agreementService.deleteAgreement(row.id).then(res => {
      console.log("Response= ", res)
      if(res.data === 1) {
        let agreementTemp = [...this.state.agreements]
        agreementTemp.splice(rowIndex,1)
        this.setState({agreements : agreementTemp})
        alertService.success('Uspesno obrisan ugovor sa id= ' + row.id + '!!!', { autoClose, keepAfterRouteChange })
      }
      else {
        alert("Brisanje neuspesno, izabrani ugovor je u statusu STARTED ili SIGNED!")
      }
    })
  }



  activateDeactivateAction = (cell, row, rowIndex, formatExtraData) => {
      const user = authService.getCurrentUser();
      if(user.roles.includes("ROLE_ADMIN") || user.roles.includes("ROLE_SALES")) {
      return (
      <button  className="btn btn-danger btn-sm" onClick={(e) => {this.onDeleteTemplate(e,row,rowIndex)}}>
         Obrisi
       </button> 
      );
      }  
  };

  componentDidMount() {
    agreementService.getAgreements()
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
        <p className="Table-header">Ugovori</p>
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


