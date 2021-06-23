import React, { Component } from "react";
import OutgoingCallService from "../services/outgoing-call.service";
import { alertService } from '../services/alert.service';

export default class OutgoingCallTemplateCreate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            predefinedResultList: [''],
            errors: {},
            errorsResults:[''],
            autoClose: true,
            keepAfterRouteChange: false

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.saveTemplate = this.saveTemplate.bind(this);
        this.addClick = this.addClick.bind(this);
    }

    componentDidMount() {

    }

    createUI() {
        return this.state.predefinedResultList.map((el, i) =>
            <div className="form-group" key={i}>
                <div className="form-row">
                <span style={{color: "red"}}>{this.state.errorsResults[i]}</span>
                    <div className="col">
                        <input
                            type="text" value={el || ''}
                            onChange={this.handleChange.bind(this, i)}
                            className="form-control"
                            required />
                    </div>


                    <button
                        className="btn btn-danger"
                        onClick={this.removeClick.bind(this, i)}>
                        Ukloni
                        </button>
                </div>

            </div>
        )
    }

    handleValidation(){
        let name = this.state.name;
        let resultList = [...this.state.predefinedResultList]
        let errors = {};
        let formIsValid = true;
        let errorsResults = [...this.state.errorsResults]
        //Name
        if(!name){
           formIsValid = false;
           errors["name"] = "Novi templejt mora da sadrzi Naziv!";
        }
        if(this.state.predefinedResultList.length < 2) {
            formIsValid = false;
            errors["results"] = "Unesite najmanje 2 odgovora";
        }
        console.log('Result List:', this.state.predefinedResultList);
        resultList.forEach((result,index) => {
            
            if(result === '') {
                console.log('result:', index);
                errorsResults[index] =  "Unesite odgovor";
                this.setState({
                    errorsResults:errorsResults
                });
                formIsValid = false;
            } else {
                errorsResults[index] = "";
                this.setState({
                    errorsResults:errorsResults
                });
            }
        })
       console.log('ErrorResults:', this.state.errorsResults);
       this.setState({errors: errors});
       return formIsValid;
   }

    saveTemplate = (templ) => {
        const { autoClose, keepAfterRouteChange } = this.state;
        templ.preventDefault();
        if(this.handleValidation()){
            let template = { name: this.state.name, predefinedResultList: this.state.predefinedResultList };
            console.log('template => ' + JSON.stringify(template));
            
                OutgoingCallService.createTemplate(template).then(res => {
                    this.props.onAddTemplate();
                    this.props.showHideTempalte();
                }); 
                alertService.success('Uspesno kreiran sablon!!!', { autoClose, keepAfterRouteChange })
         }else{
            
         }

    }

    changeNameHandler = (event) => {
        event.preventDefault();
        let errors = {}
        errors["name"] = "";
        this.setState({ name: event.target.value, errors: errors });
    }


    handleChange(i, event) {
        event.preventDefault();
        let predefinedResultList = [...this.state.predefinedResultList];
        predefinedResultList[i] = event.target.value;
        let errorsResults = [...this.state.errorsResults];
        errorsResults[i] = "";
        this.setState({ predefinedResultList, errorsResults });
    }

    addClick = (event) => {
        event.preventDefault();
        let predefinedResultList = this.state.predefinedResultList;
        let errorsResults = this.state.errorsResults;
        let errors = {};
        errors = '';
        predefinedResultList = [...predefinedResultList, ''];
        errorsResults = [...errorsResults, ''];
        this.setState({ predefinedResultList, errors:errors, errorsResults});
    }

    removeClick(i, event) {
        event.preventDefault();
        let predefinedResultList = [...this.state.predefinedResultList];
        let errorsResults = [...this.state.errorsResults];
        errorsResults.splice(i,1);
        predefinedResultList.splice(i, 1);
        this.setState({ predefinedResultList, errorsResults });
    }


    getTitle() {

        return <h3 className="text-center">Dodaj novi sablon</h3>

    }
    render() {
        return (
            <div>
                <br></br>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-8">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Naziv: </label>
                                        <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                                        <input placeholder="Naziv" name="name" className="form-control"
                                            value={this.state.name} onChange={this.changeNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label > Odgovori: </label>
                                        <button className="btn btn-primary" onClick={this.addClick}> Dodaj </button>
                                        <span style={{color: "red"}}>{this.state.errors["results"]}</span>
                                    </div>

                                    {this.createUI()}

                                    <button className="btn btn-success" onClick={this.saveTemplate}>Save</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}