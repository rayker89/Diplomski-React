import React, { Component } from "react";
import Select from 'react-select';
import { alertService } from '../services/alert.service';
import serviceService from "../services/service-service";
import priceService from "../services/price-service";

export default class PriceCreate extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            service: {id: '', name: '', description: ''},
            amount: '',
            serviceEmpty: '',
            services: [],
            errors: {},
            errorsResults:[''],
            autoClose: true,
            keepAfterRouteChange: false

        }
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAmountHandler = this.changeAmountHandler.bind(this);
        this.savePrice = this.savePrice.bind(this);
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
        let name = this.state.name;
        let serviceEmpty = this.state.serviceEmpty;
        let amount = this.state.amount;
        let errors = {};
        let formIsValid = true;
        //Name
        if(!name){
           formIsValid = false;
           errors["name"] = "Novi cenovnik mora da sadrzi Naziv!";
        }

        if(!serviceEmpty){
          formIsValid = false;
          errors["service"] = "Novi cenovnik mora da sadrzi Servis";
        }

        if(!amount){
            formIsValid = false;
            errors["amount"] = "Novi cenovnik mora da sadrzi Cenu!";
         }

       this.setState({errors: errors});
       return formIsValid;
   }

    savePrice = (event) => {
        const { autoClose, keepAfterRouteChange } = this.state;
        event.preventDefault();
        if(this.handleValidation()){
            let newPrice = { name: this.state.name, service: this.state.service, amount: this.state.amount};
            console.log('template => ' + JSON.stringify(newPrice));
                priceService.createPrice(newPrice);
                this.setState( {name: '',
                service: '',
                amount: ''});
                alertService.success('Uspesno kreiran cenovnik !!!', { autoClose, keepAfterRouteChange });
         }else{
            
         }

    }

    handleServiceChange(e){
      let errors = {...this.state.errors};
      let error = {...errors["service"]};
      error = '';
      errors["service"] = error;
        this.setState({
            service: {
              ...this.state.service,
              id: e.value,
            },
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


changeAmountHandler = (event) => {
  let errors = {...this.state.errors};
  let error = {...errors["amount"]};
  error = '';
  errors["amount"] = error;
  this.setState({amount: event.target.value, errors: errors});
}

    getTitle() {

        return <h3 className="text-center">Dodaj novi cenovnik</h3>

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
                                        <label> Cena: </label>
                                        <span style={{color: "red"}}>{this.state.errors["amount"]}</span>
                                        <input placeholder="Cena" name="amount" className="form-control"
                                            value={this.state.amount} onChange={this.changeAmountHandler} />
                                    </div>
                                    <button className="btn btn-success" onClick={this.savePrice}>Save</button>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }

}

