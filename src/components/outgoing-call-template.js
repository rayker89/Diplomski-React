import React, { Component } from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.css";
import OutgoingCallService from "../services/outgoing-call.service";
import OutgoingCallTemplateCreate from "./outgoing-call-template-create";
import cellEditFactory from 'react-bootstrap-table2-editor';
import template_activated from "../icons/template_activated.png";
import template_deactivated from "../icons/template_deactivated.png";
import { alertService } from '../services/alert.service';



export default class OutgoingCallTemplate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      template: [],
      autoClose: true,
      keepAfterRouteChange: false,
      columns: [{
        headerStyle: (colum, colIndex) => {
          return { width: '6%' };
        },
        dataField: 'id',
        text: 'R.br.',
        editable: false
      },
      {
        headerStyle: (colum, colIndex) => {
          return { width: '8%' };
        },
        dataField: 'active',
        text: 'Status',
        editable: false,
        formatter: this.isActive
      }, {
        headerStyle: (colum, colIndex) => {
          return { width: '50%' };
        },
        dataField: 'name',
        text: 'Naziv',
        editor: {
          
        }
      }, {
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
    this.showHideTemplate = this.showHideTemplate.bind(this);
    this.onAddTemplate = this.onAddTemplate.bind(this);
    this.onActDeactTemplate = this.onActDeactTemplate.bind(this);
    this.onDeletePredefinedResult = this.onDeletePredefinedResult.bind(this);
    this.onAddPredefinedResult = this.onAddPredefinedResult.bind(this);
    this.editTemplateName = this.editTemplateName.bind(this);
    this.onDeleteTemplate = this.onDeleteTemplate.bind(this);
  };

  onActDeactTemplate = (event, row, rowIndex) => {
    event.preventDefault();
    console.log("template0: ", row)
    OutgoingCallService.deactivate_activateTemplate(row).then(res => {
      if(row.active === 1) {
        row.active = 0;
      }
      else {
        row.active = 1;
      } 
      this.onAddTemplate(); 
  });
}
    


  isActive = (cell, row, rowIndex, formatExtraData) => {
    if (row.active === 1) {
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

  onAddTemplate() {
    OutgoingCallService.getOutgoingCallTemplate()
      .then(res => {
        this.setState({ template: res.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onDeleteTemplate(event,row,rowIndex) {
    const { autoClose, keepAfterRouteChange } = this.state;
    OutgoingCallService.deleteTemplate(row.id).then(res => {
      console.log("Response= ", res)
      if(res.data === 1) {
        let template = [...this.state.template]
        template.splice(rowIndex,1)
        this.setState({template : template})
        alertService.success('Uspesno obrisan sablon sa id= ' + row.id + '!!!', { autoClose, keepAfterRouteChange })
      }
      else {
        alert("Brisanje neuspesno, izabrani sablon se koristi!")
      }
    })
  }

  onDeletePredefinedResult(templateId, resultIndex, template) {
    const { autoClose, keepAfterRouteChange } = this.state;
    let templ = [...this.state.template]
    console.log('KeyField: ', templateId)
    console.log('templejt', template)
    if(templ[templateId].predefinedResultList.length >/*  */ 2) {
    templ[templateId].predefinedResultList.splice(resultIndex, 1)
    this.setState({
      template: templ
    })
    OutgoingCallService.deletePredefinedResult(template);
    alertService.success('Uspesno obrisan odgovor!!!', { autoClose, keepAfterRouteChange })
  }
  else {
    alert("Sablon mora imati barem dva odgovora!")
  }
  }

  activateDeactivateAction = (cell, row, rowIndex, formatExtraData) => {
    if (row.active === 1) {
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

  onAddPredefinedResult = (event, templateId) => {
    console.log('Event: ', event);
    if (event.charCode === 13) {
      event.preventDefault();
      let templ = [...this.state.template]
      templ[templateId].predefinedResultList = [...templ[templateId].predefinedResultList, event.target.value];
      this.setState({ template: templ });
      OutgoingCallService.addPredefinedResult(templ[templateId]);
      event.target.value = '';
    }
  }

  showHideTemplate() {
    /* this.props.history.push('/outgoingCallTemplate/new'); */
    this.setState({ showOutgoingCallTemplateCreate: !this.state.showOutgoingCallTemplateCreate });
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
    OutgoingCallService.getOutgoingCallTemplate()
      .then(res => {
        this.setState({ template: res.data });
      })
      .catch(function (error) {
        console.log(error);
      })
  };



  render() {
    const expandRow = {
      showExpandColumn: true,
      onlyOneExpanding: true,
      expandByColumnOnly: true,
      expandColumnPosition: 'right',
      expandHeaderColumnRenderer: ({ isAnyExpands }) => {
        if (isAnyExpands) {
          return (
            <button className="btn btn-warning btn-sm">Nazad</button>
          );
        }
        return (
          <button className="btn btn-info btn-sm">Odgovori</button>
        );
      },
      expandColumnRenderer: ({ expanded }) => {
        if (expanded) {
          return (
            <button className="btn btn-warning btn-sm">Nazad</button>
          );
        }
        return (
          <button className="btn btn-info btn-sm">Odgovori</button>
        );
      },

      renderer: (row, rowIndex) =>
        <div>
          <table>
            <tbody>
              {row.predefinedResultList.map((item, index) =>
                <tr key={index}>
                  <td>{item}</td>
                  <td> <button
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      this.onDeletePredefinedResult(rowIndex, index, row);
                    }}> Ukloni</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div>
            <input placeholder="Novi odgovor..." type="text" id="New" onKeyPress={e => this.onAddPredefinedResult(e, rowIndex)} />
          </div>
        </div>


    }

    const { showOutgoingCallTemplateCreate } = this.state;
    console.log('showOutgoingCallTemplateCreate', showOutgoingCallTemplateCreate);
    return (
      <div className="container col-md-9 ">
        <p className="Table-header">Templejti odlaznih poziva</p>

        <div>
          {!showOutgoingCallTemplateCreate ?
            <button className="btn btn-primary" onClick={this.showHideTemplate}>Add Template</button> :
            <button className="btn btn-danger" onClick={this.showHideTemplate}>Cancel</button>}
        </div>
        <br></br>
        <div>
          {showOutgoingCallTemplateCreate && <OutgoingCallTemplateCreate onAddTemplate={this.onAddTemplate} showHideTempalte={this.showHideTemplate} />}
        </div>
        <BootstrapTable
          keyField='id'
          data={this.state.template}
          columns={this.state.columns}
          expandRow={expandRow}
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


