import React, { Component } from "react";
import Select from 'react-select';
import { alertService } from '../services/alert.service';
import PackageService from "../services/package-service";
import serviceService from "../services/service-service";
import priceService from "../services/price-service";

export default class PackageCreate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            service: {id: '', name: '', description: ''},
            serviceEmpty: '',
            status: '',
            statusEmpty: '',
            statuses: [],
            prices: [],
            price: null,
            priceJson: {id: '', name: '', amount: ''},
            priceEmpty: '',
            durationMonths: '',
            services: [],
            errors: {},
            errorsResults:[''],
            autoClose: true,
            keepAfterRouteChange: false

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.savePackage = this.savePackage.bind(this);
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

        const initialStatuses = [
          { value: 1, label: "ACTIVE" },
          { value: 0, label: "INACTIVE" }
        ];
        this.setState({statuses: initialStatuses});
    }

    handleValidation(){
        let name = this.state.name;
        let serviceEmpty = this.state.serviceEmpty;
        let statusEmpty = this.state.statusEmpty;
        let priceEmpty = this.state.priceEmpty;
        let duration = this.state.durationMonths;
        let errors = {};
        let formIsValid = true;
        //Name
        if(!name){
           formIsValid = false;
           errors["name"] = "Novi paket mora da sadrzi Naziv!";
        }
        if(!serviceEmpty){
          formIsValid = false;
          errors["service"] = "Novi paket mora da sadrzi Servis";
        }
       
        if(!statusEmpty){
          formIsValid = false;
          errors["status"] = "Novi paket mora da sadrzi Status";
        }

        if(!priceEmpty){
          formIsValid = false;
          errors["price"] = "Novi paket mora da sadrzi Cenovnik";
        }

        if(!duration){
          formIsValid = false;
          errors["duration"] = "Novi paket mora da sadrzi Trajanje";
        }
       
       this.setState({errors: errors});
       return formIsValid;
   }

    savePackage = (event) => {
        const { autoClose, keepAfterRouteChange } = this.state;
        event.preventDefault();
        if(this.handleValidation()){
            let newPackage = { name: this.state.name, service: this.state.service, 
             status: this.state.status, price: this.state.priceJson, durationMonths: this.state.durationMonths };
            console.log('template => ' + JSON.stringify(newPackage));
                PackageService.createPackage(newPackage);
                this.setState( {name: '',
                service: '',
                status: '',
                price: '',
                durationMonths: ''});
                alertService.success('Uspesno kreiran paket!!!', { autoClose, keepAfterRouteChange });
         }else{
            
         }

    }

    handleServiceChange(e){
      priceService.getPricesByService(e.value)
      .then(response => {
        const data = response.data;
        const options = data.map(d => ({
          "value" : d.id,
          "label": d.name + ', cena= ' + d.amount + ' RSD',
          "amount": d.amount
        }))
        this.setState({prices: options});
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
            price: null,
            serviceEmpty: e.value,
            errors: errors
          });
       }

    changeNameHandler = (event) => {
      let errors = {...this.state.errors};
      let error = {...errors["name"]};
      error = '';
      errors["name"] = error;
      this.setState({ name: event.target.value, errors: errors });
    }


changeStatusHandler = (event) => {
  let errors = {...this.state.errors};
  let error = {...errors["status"]};
  error = '';
  errors["status"] = error;
  this.setState({status: event.value, statusEmpty:event.label, errors: errors});
}


handlePriceChange = (event) => {
  let errors = {...this.state.errors};
    let error = {...errors["price"]};
    error = '';
    errors["price"] = error;
        this.setState({
            priceJson: {
              ...this.state.priceJson,
              id: event.value
            },
            price: event,
            priceEmpty: event.value,
            errors:errors
          });
        }

changeDurationHandler = (event) => {
  let errors = {...this.state.errors};
  let error = {...errors["duration"]};
  error = '';
  errors["duration"] = error;
  this.setState({ durationMonths: event.target.value, errors: errors });
}

    getTitle() {

        return <h3 className="text-center">Dodaj novi paket</h3>

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
                                        <label> Naziv: </label>
                                        <span style={{color: "red"}}>{this.state.errors["name"]}</span>
                                        <input placeholder="Naziv" name="name" className="form-control"
                                            value={this.state.name} onChange={this.changeNameHandler} />
                                    </div>   

                                    <div className="form-group">
                                        <label> Servis: </label>
                                        <span style={{color: "red"}}>{this.state.errors["service"]}</span>
                                        <Select name="service" options={this.state.services} onChange={this.handleServiceChange.bind(this)}/>
                                    </div>

                                    <div className="form-group">
                                        <label> Status: </label>
                                        <span style={{color: "red"}}>{this.state.errors["status"]}</span>
                                        <Select name="status" options={this.state.statuses} onChange={this.changeStatusHandler}/>
                                    </div>

                                    <div className="form-group">
                                        <label> Cenovnik: </label>
                                        <span style={{color: "red"}}>{this.state.errors["price"]}</span>
                                        <Select name="price" value = {this.state.price} options={this.state.prices} onChange={this.handlePriceChange.bind(this)}/>
                                    </div>

                                    <div className="form-group">
                                        <label> Trajanje(meseci): </label>
                                        <span style={{color: "red"}}>{this.state.errors["duration"]}</span>
                                        <input placeholder="Trajanje(meseci)" name="duration" className="form-control"
                                            value={this.state.durationMonths} onChange={this.changeDurationHandler} />
                                    </div>
                                    <button className="btn btn-success" onClick={this.savePackage}>Save</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

