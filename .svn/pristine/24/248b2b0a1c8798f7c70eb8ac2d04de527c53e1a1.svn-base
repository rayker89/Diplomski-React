import React, { Component } from "react";
import { Form, InputGroup, Button, FormControl } from "react-bootstrap";
import OutgoingCallService from "../services/outgoing-call.service";

import Template from "./../template-files/Template.xlsx";

import './../styles/errors.css'
import './../styles/form.css'

//const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);


export default class OutgoingCallListImport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      welcomeMessage:"Kreiranje liste odlaznih poziva",
      message: "",
      status:"",
      selectedFile:null,
      templateList:[],
      selectedTemplate:0,
      listName:"",
      note:"",
      oldList:false,
      oldListNames:[],
      errorMessage:"",
      errorFile:"",
      errorTemplate:"",
    };
    this.fileSelectedHandler = this.fileSelectedHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.handleTemplateOnChange=this.handleTemplateOnChange.bind(this)
    this.handleTextInputOnChange=this.handleTextInputOnChange.bind(this)
    this.radioBtnOnChange=this.radioBtnOnChange.bind(this)
    this.showOldLists=this.showOldLists.bind(this)
    this.handleOldOnChange=this.handleOldOnChange.bind(this)
    this.resetErrorMessages=this.resetErrorMessages.bind(this)
  }

  /*Loading template list*/
  componentDidMount() {
    OutgoingCallService.getOutgoingCallTemplateListImport().then(
      (res) => {
        this.setState({
          templateList: res.data,
        });
      },
      (error) => {
        this.setState({
          message:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString(),
        });
      }
    );
  }

  /*Event on file selecting*/
  fileSelectedHandler(event) {
    this.setState({
      selectedFile: event.target.files[0],
    });
  }

  /*Resets error messages which were displayed earlier*/
  resetErrorMessages(){
    this.setState({
      errorMessage:"",
      errorTemplate:"",
      errorFile:"",
    })
  }


  /*Submitting form with all data*/
  submitForm(event) {
    event.preventDefault();  //da se forma submituje iz prvog pokusaja
    this.resetErrorMessages();

    const formData = new FormData();

    formData.append("file", this.state.selectedFile);
    formData.append("templateId", this.state.selectedTemplate);
    formData.append("name",this.state.listName);
    formData.append("note",this.state.note);
    formData.append("oldList",this.state.oldList);

    if(this.state.selectedFile===null){ //Kada fajl nije ucitan
      this.setState({
        errorFile:"Niste uvezli fajl.",
      })
    }
    if(this.state.selectedTemplate===0){ //Kada templejt nije izabran
      this.setState({
        errorTemplate:"Izaberite templejt.",
      })
    }
    if(this.state.listName.length===0){ //Kada je prazno polje za naziv liste
       this.setState({
        errorMessage:"Popunite polje za naziv liste.",
      })
    }
    if(this.state.selectedFile!=null && this.state.listName.length>0 && this.state.selectedTemplate>0){ //Kada su popunjeni svi podaci
      this.resetErrorMessages();
      OutgoingCallService.postFormData(formData).then(
        (response) => {
          this.setState({
            message: response.data.message,
            status:response.status,
          });
        },
        (error) => {
        const resMessage =
        (error.response &&
        error.response.data &&
        error.response.data.message) ||
        error.message ||
        error.toString();
        this.setState({
          message: resMessage,
        });
        }
      );
    }

  }

  /*Handling select onChange*/
  handleTemplateOnChange(event){
    this.setState({
      selectedTemplate:event.target.value,
    })
  }

  handleOldOnChange(event){
    event.preventDefault(); 
    this.setState({
      listName:event.target.value,
    })
  }

  /*Handling text fields onChange*/
  handleTextInputOnChange(event){
    this.setState({
      [event.target.name]:event.target.value,
    })
  }

  /*Handling radio button onChange*/
  radioBtnOnChange(event){
    const oldList = event.currentTarget.value === 'true' ? true: false;
    this.setState({
      oldList
    })
  }

  /*Getting old list names based on the selected template*/
  showOldLists(){
    let templateId=0;
    if(this.state.selectedTemplate===0){ //default vrednost za template
      templateId=1;
    }
    else{
      templateId=this.state.selectedTemplate;
      OutgoingCallService.sendTemplateId(templateId).then(
      (response)=>{
        this.setState({
          oldListNames:response.data,
        });
      },
      (error)=>{
        const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.setState({
            message: resMessage,
          });
        }
      );
    }
  }

  //U return() metodi moze da postoji samo jedan roditeljski <div>
  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.welcomeMessage}</h3>
        </header>

        {/*Kada su podaci uspesno poslati*/}
        {this.state.status===200 && 
        (
        <div className="alert alert-success keep-new-lines">
          {this.state.message}
        </div>
        )}

        {/*Kada se dogodila neka greska*/}
        {this.state.status===207 && 
        (
        <div className="alert alert-danger keep-new-lines">
          {this.state.message}
        </div>
        )}

        <Form onSubmit={(event) => this.submitForm(event)}>
          <Form.Row>
            <Form.Group controlId="template">
              <Form.Label className="field-label">Tip odlaznog poziva *</Form.Label>
              <Form.Control as="select" onChange={this.handleTemplateOnChange}  value={this.state.selectedTemplate} onClick={this.showOldLists} name="selectedTemplate">
                <option value="" hidden>Izaberi templejt</option>
                {this.state.templateList &&
                this.state.templateList.length > 0 &&
                this.state.templateList.map(templateList => {
                  return <option key={templateList.id} value={templateList.id}>{templateList.name}</option>;
              })}
              </Form.Control>
              <span className="error-message">{this.state.errorTemplate}</span>
            </Form.Group>
          </Form.Row>

          <Form.Row>    
          <Form.Group controlId="formGridPassword" value={this.state.oldList}>
            <input type="radio" name="list" value="false" 
              onChange={this.radioBtnOnChange} /> Nova lista
              <br></br>
              <input type="radio" name="list" value="true" 
              onChange={this.radioBtnOnChange} /> Dopuni listu
          </Form.Group>
          </Form.Row>  


          {this.state.oldList && this.state.oldListNames.length>0 &&  //ako je izabrano "Dopuni listu" i spisak listi za templejt nije prazan
          (
            <Form.Group controlId="template">
              <Form.Label className="field-label">Liste odabranog šablona *</Form.Label>
                <Form.Control as="select" onChange={this.handleOldOnChange}  value={this.state.listName}>
                  <option value="" hidden>Izaberi listu</option>
                  {this.state.oldListNames &&
                  this.state.oldListNames.length > 0 &&
                  this.state.oldListNames.map(oldListName => {
                    return <option key={oldListName} value={oldListName}>{oldListName}</option>;
                  })}
              </Form.Control>
            </Form.Group>
          )
          }

          {this.state.oldList && this.state.oldListNames.length===0 &&  //ako je izabrano "Dopuni listu" a spisak listi za templejt je prazan
          (
            <Form.Group controlId="template">
              <Form.Label>Nema postojećih listi za odabrani šablon.</Form.Label>
              <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text className="field-label">Naziv liste *</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="text input" onChange={this.handleTextInputOnChange} value={this.state.listName} name="listName" required/>
            </InputGroup>
            <span className="error-message">{this.state.errorMessage}</span>
            </Form.Group>
          )
          }

          {!this.state.oldList &&  //ako je odabrano "Nova lista"
          (
          <Form.Group controlId="description">
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text className="field-label">Naziv liste *</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl aria-label="text input" onChange={this.handleTextInputOnChange} value={this.state.listName} name="listName" />
            </InputGroup>
            <span className="error-message has-errors">{this.state.errorMessage}</span>
          </Form.Group>
          )
          }

          <Form.Group controlId="description"> 
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text className="field-label">Napomena</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" aria-label="With textarea" onChange={this.handleTextInputOnChange} value={this.state.note} name="note"/>
            </InputGroup>
          </Form.Group>

          <Form.Row>
            <Form.Group controlId="xlsFile">
              <Form.Label className="field-label">Spisak za zvanje *</Form.Label>
              <input
                type="file"
                name="file"
                onChange={this.fileSelectedHandler}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
          <span className="error-message">{this.state.errorFile}</span>
          </Form.Row>
          <br></br>
          <Form.Row>
            <Button variant="success" type="submit">
              Kreiraj
            </Button>
          </Form.Row>
          <br></br>

          <Form.Row>
          <Form.Group>
            <a href={Template} download="template.xlsx" target="_blank">
              <Button>Preuzmi šablon</Button>
            </a>
          </Form.Group>
          </Form.Row>
        </Form>
      </div>
    );
  }
}
