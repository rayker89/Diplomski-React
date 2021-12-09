import React, { Component } from "react";
import { alertService } from '../services/alert.service';
import clientService from "../services/client-service";
import serviceService from "../services/service-service";
import Select from 'react-select';
import packageService from "../services/package-service";
import agreementService from "../services/agreement-service";

export default class AgreementCreate extends Component {
    constructor(props) {
        super(props)

        this.state = {
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            jmbg: '',
            service: {id: '', name: '', description: ''},
            serviceEmpty: '',
            installationAddress: '',
            installationPhone: '',
            agreementStatus: {id:1},
            technicianStatus: {id:10},
            client: {id:''},
            services: [],
            package: null,
            packageJson: {id: '', name: ''},
            packages: [],
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
        this.saveAgreement = this.saveAgreement.bind(this);
        this.checkClient = this.checkClient.bind(this);
    }

    componentDidMount() {
        serviceService.getServices()
        .then(response => {
          console.log(response.data);
        const data = response.data;
        const options = data.map(d => ({
            "value" : d.id,
            "label" : d.name,
            "description" : d.description
          }))
          this.setState({ services: options });
        })
        .catch(error => console.log(error.response));
    }

    handleValidation(){
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let address = this.state.address;
        let phone = this.state.phone;
        let jmbg = this.state.jmbg;
        let installationAddress = this.state.installationAddress;
        let installationPhone = this.state.installationPhone;
        let serviceEmpty = this.state.serviceEmpty;
        let packageEmpty = this.state.package;
        let errors = {};
        let formIsValid = true;
        //Name
        if(!firstName){
           formIsValid = false;
           errors["firstName"] = "Novi ugovor mora da ima Ime klijenta!";
        }

        if(!lastName){
          formIsValid = false;
          errors["lastName"] = "Novi ugovor mora da ima Prezime klijenta";
        }

        if(!address){
            formIsValid = false;
            errors["address"] = "Novi ugovor mora da ima Adresu klijenta!";
         }

         if(!phone) {
             formIsValid = false;
             errors["phone"] = "Novi ugovor mora da ima Telefon klijenta!";
         }

         if(!jmbg) {
             formIsValid = false;
             errors["jmbg"] = "Novi ugovor mora da ima JMBG klijenta";
         }

         
         if(!installationAddress) {
            formIsValid = false;
            errors["installationAddress"] = "Novi ugovor mora da sadrzi Adresu instalacije";
        }

        if(!serviceEmpty){
            formIsValid = false;
            errors["service"] = "Novi ugovor mora da sadrzi Servis";
          }

        if(!packageEmpty){
            formIsValid = false;
            errors["package"] = "Novi ugovor mora da sadrzi Paket";
          }

          if(!installationPhone){
            formIsValid = false;
            errors["installationPhone"] = "Novi ugovor mora da sadrzi Telefon instalacije";
          }

       this.setState({errors: errors});
       return formIsValid;
   }


    checkClient = (event) => {
        const { autoClose, keepAfterRouteChange } = this.state;
        event.preventDefault();
        if(this.handleValidation()){
            clientService.getClientByJmbg(this.state.jmbg)
            .then(response => {
              console.log(response.data);
              if(response.data !== '') {
                let editedClient = { id: response.data.id,
                    firstName: this.state.firstName, 
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phone: this.state.phone,
                    jmbg: this.state.jmbg};
               clientService.updateClient(editedClient).then((response) => {
                    this.saveAgreement(event, response.data);
               })
               alertService.success('Korisnik postoji, uspesno promenjeni podaci !!!', { autoClose, keepAfterRouteChange });
            } else {
                let newClient = { firstName: this.state.firstName, 
                    lastName: this.state.lastName,
                    address: this.state.address,
                    phone: this.state.phone,
                    jmbg: this.state.jmbg};
                    clientService.createClient(newClient).then((response) => {
                        this.saveAgreement(event, response.data);
                   })
                  alertService.success('Uspesno kreiran novi korisnik !!!', { autoClose, keepAfterRouteChange });
              }
            })
            .catch(error => console.log(error.response));
        }
       
    }

    saveAgreement = (event, client) => {
    const { autoClose, keepAfterRouteChange } = this.state;
    event.preventDefault();
                let newAgreement = { client: client, 
                    pack: this.state.packageJson,
                    dateCreated: new Date(),
                    agreementStatus: this.state.agreementStatus,
                    technicianStatus: this.state.technicianStatus,
                    installationAddress: this.state.installationAddress,
                    phone: this.state.installationPhone};
                console.log('template => ' + JSON.stringify(newAgreement));
                    agreementService.createAgreement(newAgreement); 
                    this.setState( {firstName: '',
                    lastName: '',
                    address: '',
                    phone: '',
                    jmbg: '',
                    service: null,
                    package: null,
                    installationAddress: '',
                    installationPhone: ''
                });
                    alertService.success('Uspesno kreiran ugovor !!!', { autoClose, keepAfterRouteChange });
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

    changeInstallationAddress = (event) => {
        let errors = {...this.state.errors};
        let error = {...errors["installationAddress"]};
        error = '';
        errors["installationAddress"] = error;
        this.setState({installationAddress: event.target.value, errors: errors});
    }

    handleServiceChange(e){
        packageService.getPackagesByService(e.value)
        .then(response => {
          console.log(response.data);
        const data = response.data;
        const options = data.map(d => ({
            "value" : d.id,
            "label" : d.name
          }))
          this.setState({ packages: options });
        })
        .catch(error => console.log(error.response));

        let errors = {...this.state.errors};
        let error = {...errors["service"]};
        error = '';
        errors["service"] = error;
          this.setState({
              service: {
                ...this.state.service,
                id: e.value,
              },
              package: null,
              serviceEmpty: e.value,
              errors: errors
            });
    }

    handlePackageChange(e){
        let errors = {...this.state.errors};
        let error = {...errors["package"]};
        error = '';
        errors["package"] = error;
          this.setState({
            packageJson: {
                ...this.state.packageJson,
                id: e.value,
              },
              package: e,
              errors: errors
            });
    }

    changeInstallationPhoneHandler = (event) => {
        let errors = {...this.state.errors};
        let error = {...errors["installationPhone"]};
        error = '';
        errors["installationPhone"] = error;
        this.setState({installationPhone: event.target.value, errors: errors});
    }



    getTitle() {

        return <h3 className="text-center">Kreiraj novi ugovor</h3>

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
                                        <label> JMBG: </label>
                                        <span style={{color: "red"}}>{this.state.errors["jmbg"]}</span>
                                        <input placeholder="JMBG" name="jmbg" className="form-control"
                                            value={this.state.jmbg} onChange={this.changeJmbgHandler} />
                                    </div>

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
                                        <label> Servis: </label>
                                        <span style={{color: "red"}}>{this.state.errors["service"]}</span>
                                        <Select name="service" options={this.state.services} onChange={this.handleServiceChange.bind(this)}/>
                                    </div>

                                    <div className="form-group">
                                        <label> Paket: </label>
                                        <span style={{color: "red"}}>{this.state.errors["package"]}</span>
                                        <Select name="package" value={this.state.package} options={this.state.packages} onChange={this.handlePackageChange.bind(this)}/>
                                    </div>

                                    <div className="form-group">
                                        <label> Adresa instalacije: </label>
                                        <span style={{color: "red"}}>{this.state.errors["installationAddress"]}</span>
                                        <input placeholder="Adresa instalacije" name="installationAddress" className="form-control"
                                            value={this.state.installationAddress} onChange={this.changeInstallationAddress} />
                                    </div>

                                    <div className="form-group">
                                        <label> Telefon instalacije: </label>
                                        <span style={{color: "red"}}>{this.state.errors["installationPhone"]}</span>
                                        <input placeholder="Telefon instalacije" name="installationPhone" className="form-control"
                                            value={this.state.installationPhone} onChange={this.changeInstallationPhoneHandler} />
                                    </div>

                                    <button className="btn btn-success" onClick={this.checkClient} >Create</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

