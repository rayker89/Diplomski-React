import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import { alertService } from '../services/alert.service';
import operatorService from "../services/operator-service";



export default class OperatortsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      operators: [],
      autoClose: true,
      keepAfterRouteChange: false,
      columns: [{
        headerStyle: (colum, colIndex) => {
          return { width: '6%' };
        },
        dataField: 'id',
        text: 'R.br.',
        editable: false
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '20%' };
        },
        dataField: 'username',
        text: 'Korisnicko ime',
        editor: {
          
        }
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '20%' };
        },
        dataField: 'email',
        text: 'Email',
        editor: {
          
        }
      }
      ,  {
        headerStyle: (colum, colIndex) => {
          return { width: '25%' };
        },
        dataField: 'roles[0].name',
        text: 'Uloga',
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
  };

    
  onDeleteTemplate(event,row,rowIndex) {
    const { autoClose, keepAfterRouteChange } = this.state;
    operatorService.deleteOperator(row.id).then(res => {
      console.log("Response= ", res)
      if(res.data === 1) {
        let operatorTemp = [...this.state.operators]
        operatorTemp.splice(rowIndex,1)
        this.setState({operators : operatorTemp})
        alertService.success('Uspesno obrisan operator sa id= ' + row.id + '!!!', { autoClose, keepAfterRouteChange })
      }
      else {
        alert("Brisanje neuspesno, doslo je do greske!")
      }
    })
  }

  activateDeactivateAction = (cell, row, rowIndex, formatExtraData) => {
    return (
      <button  className="btn btn-danger btn-sm"
       onClick={(e) => {
          this.onDeleteTemplate(e, row, rowIndex);
       }}
     >
       Obrisi
     </button>
    );  
};



  componentDidMount() {
    operatorService.getAllOperators()
    .then(res => {
      this.setState({ operators: res.data });
    })
    .catch(function (error) {
      console.log(error);
    })
  };



  render() {
    return (
      <div className="container col-md-9 ">
        <p className="Table-header">Operateri</p>
        <br></br>
        <BootstrapTable
          keyField='id'
          data={this.state.operators}
          columns={this.state.columns}
          striped
          bordered
          bootstrap4
          size="sm" />
      </div>
    );
  }
}


