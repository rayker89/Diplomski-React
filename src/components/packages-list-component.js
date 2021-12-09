import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import OutgoingCallService from "../services/outgoing-call.service";
import cellEditFactory from 'react-bootstrap-table2-editor';
import template_activated from "../icons/template_activated.png";
import template_deactivated from "../icons/template_deactivated.png";
import { alertService } from '../services/alert.service';
import PackageService from "../services/package-service";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory , { PaginationProvider, PaginationListStandalone, PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';




export default class PackageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      package: [],
      autoClose: true,
      keepAfterRouteChange: false,
      columns: [{
        headerStyle: (colum, colIndex) => {
          return { width: '6%' };
        },
        dataField: 'id',
        text: 'R.br.',
        filter: textFilter(),
        editable: false
      },
      {
        headerStyle: (colum, colIndex) => {
          return { width: '8%' };
        },
        dataField: 'status',
        text: 'Status',
        editable: false,
        formatter: this.isActive
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '20%' };
        },
        dataField: 'name',
        text: 'Naziv',
        filter: textFilter(),
        editor: {
          
        }
      },{
        headerStyle: (colum, colIndex) => {
          return { width: '10%' };
        },
        dataField: 'service.name',
        text: 'Servis',
        filter: textFilter(),
        editor: {
          
        }
      },{
        headerStyle: (colum, colIndex) => {
          return { width: '10%' };
        },
        dataField: 'price.amount',
        text: 'Cena(RSD)',
        filter: textFilter(),
        editor: {
          
        }
      },{
        headerStyle: (colum, colIndex) => {
          return { width: '10%' };
        },
        dataField: 'durationMonths',
        text: 'Trajanje(meseci)',
        filter: textFilter(),
        editor: {
          
        }
      },{
        headerStyle: (colum, colIndex) => {
          return { width: '22%' };
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
    this.onActDeactTemplate = this.onActDeactTemplate.bind(this);
    this.editTemplateName = this.editTemplateName.bind(this);
    this.onDeleteTemplate = this.onDeleteTemplate.bind(this);
  };

  onActDeactTemplate = (event, row, rowIndex) => {
    event.preventDefault();
    console.log("template0: ", row)
    PackageService.deactivate_activatePackage(row).then(res => {
      if(row.status === 1) {
        row.status = 0;
      }
      else {
        row.status = 1;
      } 
      this.getAllPackages(); 
  });
}

    
getAllPackages() {
    PackageService.getAllPackages()
    .then(res => {
      this.setState({ package: res.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  isActive = (cell, row, rowIndex, formatExtraData) => {
    if (row.status === 1) {
      return (
        <img src={template_activated} alt="Aktivan" >
        </img>
      );
    } else {
      return (
        <img src={template_deactivated} alt="Neaktivan" >
        </img>
      );
    }

  };


  onDeleteTemplate(event,row,rowIndex) {
    const { autoClose, keepAfterRouteChange } = this.state;
    PackageService.deletePackage(row.id).then(res => {
      console.log("Response= ", res)
      if(res.data === 1) {
        let pack = [...this.state.package]
        pack.splice(rowIndex,1)
        this.setState({package : pack})
        alertService.success('Uspesno obrisan paket sa id= ' + row.id + '!!!', { autoClose, keepAfterRouteChange })
      }
      else {
        alert("Brisanje neuspesno, izabrani paket se koristi!")
      }
    })
  }


  activateDeactivateAction = (cell, row, rowIndex, formatExtraData) => {
    if (row.status === 1) {
      return (
        <div className="d-flex justify-content-between" align="center" >
        <button className="btn btn-danger btn-sm"
          onClick={(e) => {
            this.onActDeactTemplate(e,row,rowIndex);
          }}
        >
          Deaktiviraj
        </button>
         <button  className="btn btn-danger btn-sm"
         onClick={(e) => {
           this.onDeleteTemplate(e,row,rowIndex);
         }}
       >
         Obrisi
       </button>
       </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-between" align="center" >
        <button className="btn btn-success btn-sm"
          onClick={(e) => {
            this.onActDeactTemplate(e,row,rowIndex);
          }}
        >
          Aktiviraj
        </button>
         <button  className="btn btn-danger btn-sm"
         onClick={(e) => {
           this.onDeleteTemplate(e,row,rowIndex);
         }}
       >
         Obrisi
       </button>
       </div>
      );
    }
  };

  editTemplateName = (oldName, newName, template) => {
    if(newName !== ''){
    template.name = newName;
    OutgoingCallService.addPredefinedResult(template);
    } else {
      newName = oldName;
    }
  }

  componentDidMount() {
    PackageService.getAllPackages()
    .then(res => {
      this.setState({ package: res.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  };



  render() {
    const paginationOption = {
      custom: true,
      totalSize: this.state.package.length,
    };

    return (
      
      <div className="container col-md-9 ">
        <p className="Table-header">Paketi</p>
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
          data={this.state.package}
          columns={this.state.columns}
          cellEdit={ cellEditFactory({
            mode: 'dbclick',
            afterSaveCell: (oldValue, newValue, row, column) => {
             this.editTemplateName(oldValue,newValue, row) 
            }
          }) }
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


