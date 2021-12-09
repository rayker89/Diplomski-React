import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import OutgoingCallService from "../services/outgoing-call.service";
import cellEditFactory from 'react-bootstrap-table2-editor';
import { alertService } from '../services/alert.service';
import priceService from "../services/price-service";
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory , { PaginationProvider, PaginationListStandalone, PaginationTotalStandalone } from 'react-bootstrap-table2-paginator';



export default class PriceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      price: [],
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
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '50%' };
        },
        dataField: 'name',
        text: 'Naziv',
        filter: textFilter(),
        editor: {
          
        }
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '15%' };
        },
        dataField: 'amount',
        filter: textFilter(),
        text: 'Iznos (RSD)',
        editor: {
          
        }
      },  {
        headerStyle: (colum, colIndex) => {
          return { width: '15%' };
        },
        dataField: 'service.name',
        filter: textFilter(),
        text: 'Servis',
        editor: {
          
        }
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '15%' };
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
  }

    
getAllPrices() {
    priceService.getPrices()
    .then(res => {
      this.setState({ price: res.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  onDeleteTemplate(event,row,rowIndex) {
    const { autoClose, keepAfterRouteChange } = this.state;
    priceService.deletePrice(row.id).then(res => {
      console.log("Response= ", res)
      if(res.data === 1) {
        let price = [...this.state.price]
        price.splice(rowIndex,1)
        this.setState({price : price})
        alertService.success('Uspesno obrisan cenovnik sa id= ' + row.id + '!!!', { autoClose, keepAfterRouteChange })
      }
      else {
        alert("Brisanje neuspesno, izabrani cenovnik se koristi!")
      }
    })
  }


  editTemplateName = (oldName, newName, template) => {
    if(newName !== ''){
    template.name = newName;
    OutgoingCallService.addPredefinedResult(template);
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
    priceService.getPrices()
    .then(res => {
      this.setState({ price: res.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  };



  render() {
    const paginationOption = {
      custom: true,
      totalSize: this.state.price.length,
    };
    return (
      <div className="container col-md-9 ">
        <p className="Table-header">Cenovnici</p>
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
          data={this.state.price}
          columns={this.state.columns}
          cellEdit={ cellEditFactory({
            mode: 'dbclick',
            afterSaveCell: (oldValue, newValue, row, column) => {
             this.editTemplateName(oldValue,newValue, row) 
            }
          }) }
          striped
          bordered
          filter={ filterFactory() }
          bootstrap4
          size="sm"
          { ...paginationTableProps } />
           <PaginationListStandalone { ...paginationProps } />
          </div>)
        }
      </PaginationProvider>
      </div>
    );
  }
}


