import React, { Component } from "react";
import { alertService } from '../services/alert.service';
import clientService from "../services/client-service";

export default class ClientCreate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            jmbg: '',
            errors: {},
            errorsResults:[''],
            autoClose: true,
            keepAfterRouteChange: false

        }
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changePhoneHandler = this.changePhoneHandler.bind(this);
        this.changeJmbgHandler = this.changeJmbgHandler.bind(this);
        this.saveClient = this.saveClient.bind(this);
    }

    componentDidMount() {

    }

    handleValidation(){
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let address = this.state.address;
        let phone = this.state.phone;
        let jmbg = this.state.jmbg;
        let errors = {};
        let formIsValid = true;
        //Name
        if(!firstName){
           formIsValid = false;
           errors["firstName"] = "Novi korisnik mora da ima Ime!";
        }

        if(!lastName){
          formIsValid = false;
          errors["lastName"] = "Novi korisnik mora da ima Prezime";
        }

        if(!address){
            formIsValid = false;
            errors["address"] = "Novi korisnik mora da ima Adresu!";
         }

         if(!phone) {
             formIsValid = false;
             errors["phone"] = "Novi korisnik mora da ima Telefon!";
         }

         if(!jmbg) {
             formIsValid = false;
             errors["jmbg"] = "Novi korisnik mora da ima JMBG";
         }

       this.setState({errors: errors});
       return formIsValid;
   }

    saveClient = (event) => {
        const { autoClose, keepAfterRouteChange } = this.state;
        event.preventDefault();
        if(this.handleValidation()){
            let newClient = { firstName: this.state.firstName, 
                lastName: this.state.lastName,
                address: this.state.address,
                phone: this.state.phone,
                jmbg: this.state.jmbg};
            console.log('template => ' + JSON.stringify(newClient));
                clientService.createClient(newClient);
                this.setState( {firstName: '',
                lastName: '',
                address: '',
                phone: '',
                jmbg: ''});
                alertService.success('Uspesno kreiran korisnik !!!', { autoClose, keepAfterRouteChange });
         }else{
            
         }

    }


    changeFirstNameHandler = (event) => {
      let errors = {...this.state.errors};
      let error = {...errors["firstName"]};
      error = '';
      errors["firstName"] = error;
      this.setState({ firstName: event.target.value, errors: errors });
    }


    changeLastNameHandler = (event) => {
    let errors = {...this.state.errors};
    let error = {...errors["lastName"]};
    error = '';
    errors["lastName"] = error;
    this.setState({lastName: event.target.value, errors: errors});
    }

    changeAddressHandler = (event) => {
        let errors = {...this.state.errors};
        let error = {...errors["address"]};
        error = '';
        errors["address"] = error;
        this.setState({address: event.target.value, errors: errors});
    }

    changePhoneHandler = (event) => {
        let errors = {...this.state.errors};
        let error = {...errors["phone"]};
        error = '';
        errors["phone"] = error;
        this.setState({phone: event.target.value, errors: errors});
    }

    changeJmbgHandler = (event) => {
        let errors = {...this.state.errors};
        let error = {...errors["jmbg"]};
        error = '';
        errors["jmbg"] = error;
        this.setState({jmbg: event.target.value, errors: errors});
    }

    getTitle() {

        return <h3 className="text-center">Dodaj novog korisnika</h3>

    }
    render() {
        return (
            <div>
                {/* <br></br> */}
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6">
                            {
                                this.getTitle()
                            }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Ime: </label>
                                        <span style={{color: "red"}}>{this.state.errors["firstName"]}</span>
                                        <input placeholder="Ime" name="firstName" className="form-control"
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                    </div>   

                                    <div className="form-group">
                                        <label> Prezime: </label>
                                        <span style={{color: "red"}}>{this.state.errors["lastName"]}</span>
                                        <input placeholder="Prezime" name="lastName" className="form-control"
                                            value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label> Adresa: </label>
                                        <span style={{color: "red"}}>{this.state.errors["address"]}</span>
                                        <input placeholder="Adresa" name="address" className="form-control"
                                            value={this.state.address} onChange={this.changeAddressHandler} />
                                    </div>

                                    <div className="form-group">
                                        <label> Telefon: </label>
                                        <span style={{color: "red"}}>{this.state.errors["phone"]}</span>
                                        <input placeholder="Telefon" name="phone" className="form-control"
                                            value={this.state.phone} onChange={this.changePhoneHandler} />
                                    </div>
                                    
                                    <div className="form-group">
                                        <label> JMBG: </label>
                                        <span style={{color: "red"}}>{this.state.errors["jmbg"]}</span>
                                        <input placeholder="JMBG" name="jmbg" className="form-control"
                                            value={this.state.jmbg} onChange={this.changeJmbgHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.saveClient}>Save</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

