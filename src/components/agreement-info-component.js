import React, { Component } from "react";
import Table from 'react-bootstrap/Table';
import agreementService from "../services/agreement-service";
import moment from "moment";

export default class AgreementInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            agreement: []
        };
    }

    componentDidMount() {
        agreementService.getAgreementById(this.props.match.params.agreementId).then(res => {
            this.setState({ agreement: res.data });
        })
    }

    getTitle() {

        return <h3 className="text-center">Informacije o ugovoru </h3>

    }

    render() {
        return (

            <div className="card col-md-6">
                {/* <br></br> */}
                {
                    this.getTitle()
                }
                <Table striped bordered hover>
                    <tbody>
                        <tr>
                            <td width='250'>ID ugovora</td>
                            <td>{this.state.agreement.id}</td>
                        </tr>
                        <tr>
                            <td>Ime Klijenta</td>
                            <td>{this.state.agreement.client?this.state.agreement.client.firstName:''}</td>
                        </tr>
                        <tr>
                            <td>Prezime Klijenta</td>
                            <td>{this.state.agreement.client?this.state.agreement.client.lastName:''}</td>
                        </tr>
                        <tr>
                            <td>JMBG Klijenta</td>
                            <td>{this.state.agreement.client?this.state.agreement.client.jmbg:''}</td>
                        </tr>
                        <tr>
                            <td>Datum kreiranja</td>
                            <td>{this.state.agreement.dateCreated?moment(this.state.agreement.dateCreated).format("DD.MM.YYYY. HH:mm:ss"):''}</td>
                        </tr>
                        <tr>
                            <td>Datum potpisivanja</td>
                            <td>{this.state.agreement.dateSigned?moment(this.state.agreement.dateSigned).format("DD.MM.YYYY. HH:mm:ss"):''}</td>
                        </tr>
                        <tr>
                            <td>Datum isteka</td>
                            <td>{this.state.agreement.dateExpire?moment(this.state.agreement.dateExpire).format("DD.MM.YYYY. HH:mm:ss"):''}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>{this.state.agreement.agreementStatus?this.state.agreement.agreementStatus.name:''}</td>
                        </tr>
                        <tr>
                            <td>Adresa Instalacije</td>
                            <td>{this.state.agreement.installationAddress?this.state.agreement.installationAddress:''}</td>
                        </tr>
                        <tr>
                            <td>Telefon</td>
                            <td>{this.state.agreement.phone?this.state.agreement.phone:''}</td>
                        </tr>
                        <tr>
                            <td>Ime Paketa</td>
                            <td>{this.state.agreement.pack?this.state.agreement.pack.name:''}</td>
                        </tr>
                        <tr>
                            <td>Mesecna pretplata</td>
                            <td>{this.state.agreement.pack?this.state.agreement.pack.price.amount + ' RSD':''}</td>
                        </tr>
                        <tr>
                            <td>Ugovorna obaveza</td>
                            <td>{this.state.agreement.pack?this.state.agreement.pack.durationMonths:''}</td>
                        </tr>
                    </tbody>
                </Table>
                {/* <div className="card-body">
                        <form>
                            <div className="form-group form-inline">
                                <label style={{marginRight: '10px', fontSize: '1.3em'}}>Id ugovora: </label>
                                <input className="form-control" value={this.state.agreement.id}  readOnly/>
                            </div>   

                            <div className="form-group form-inline">
                                <label style={{marginRight: '10px', fontSize: '1.3em'}}>Ime korisnika: </label>
                                <input className="form-control" value={this.state.agreement.client?this.state.agreement.client.firstName:''}  readOnly/>
                            </div>  

                            <div className="form-group form-inline">
                                <label style={{marginRight: '10px', fontSize: '1.3em'}}>Prezime korisnika: </label>
                                <input className="form-control" value={this.state.agreement.client?this.state.agreement.client.lastName:''}  readOnly/>
                            </div>  

                            <div className="form-group form-inline">
                                <label style={{marginRight: '10px', fontSize: '1.3em'}}>Datum kreiranja: </label>
                                <input className="form-control" value={this.state.agreement.dateCreated}  readOnly/>
                            </div>  

                        </form>
                    </div> */}
            </div>
        );
    }
}
