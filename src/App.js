import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AuthService from "./services/auth.service";
import 'bootstrap';
import { Alert } from './components/Alert';
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Packages from "./components/packages.component";
import PackageList from "./components/packages-list-component";
import PriceCreate from "./components/prices.component";
import PriceList from "./components/prices-list-component";
import ClientCreate from "./components/clients.component";
import ClientList from "./components/clients-list-component";
import AgreementCreate from "./components/agreement.component";
import AgreementList from "./components/agreement-list-component";
import OperatortsList from "./components/operators-list-component";
import OperatorCreate from "./components/operators.component";
import TechnicianTMAgreementList from "./components/technician-TM-agreement-list";
import SalesSigningAgreementList from "./components/sales-signing-agreement-list";
import TechnicianRealizationAgreementList from "./components/technician-realization-agreementt-list";
import AgreementInfo from "./components/agreement-info-component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      showTechnicianBoard: false,
      currentUser: undefined,
      showUserBoard: false,
      showSalesBoard: false
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
        showTechnicianBoard: user.roles.includes("ROLE_TECHNICIAN"),
        showSalesBoard: user.roles.includes("ROLE_SALES"),
        showUserBoard: user.roles.includes("ROLE_USER")
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard, showTechnicianBoard,  showSalesBoard, showUserBoard} = this.state;

    return (
      <div>
        <nav  className="navbar navbar-expand navbar-dark bg-dark sticky-top" >
          <Link to={"/home"} className="navbar-brand">
            inter.NET
          </Link>
          <div className="navbar-nav mr-auto">
            {showAdminBoard && ( <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Paketi
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#packagesList">Lista paketa</a>
          <a class="dropdown-item" href="#addPackage">Dodaj novi paket</a>
        </div>
      </li>
            )}

          {showAdminBoard && ( <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Cenovnici
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#pricesList">Lista cenovnika</a>
          <a class="dropdown-item" href="#addPrice">Dodaj novi cenovnik</a>
        </div>
      </li>
            )}

          {(showAdminBoard || showSalesBoard) && ( <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Korisnici
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#clientsList">Lista korisnika</a>
          <a class="dropdown-item" href="#addClient">Dodaj novog korisnika</a>
        </div>
      </li>
            )}

          {showAdminBoard && ( <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Operateri
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#operatersList">Lista operatera</a>
          <a class="dropdown-item" href="#addOperator">Dodaj novog operatera</a>
        </div>
      </li>
            )}


          {(currentUser) && ( <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Ugovori
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#agreementsList">Lista ugovora</a>
        </div>
      </li>
            )}

      {(showTechnicianBoard || showAdminBoard) && ( <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Tehnicarski meni
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#techAgreementsTMList">Tehnicke mogucnosti</a>
          <a class="dropdown-item" href="#techAgreementsRealizationList">Realizacija</a>
        </div>
      </li>
            )}

      {(showSalesBoard || showAdminBoard) && ( <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
         Prodaja meni
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#addAgreement">Kreiraj novi ugovor</a>
          <a class="dropdown-item" href="#salesAgreementsSigningList">Potpisivanje</a>
        </div>
      </li>
            )}  

          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container-fluid">
        <div className="sticky-top">
        <Alert  />
        </div>
          
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/user" component={BoardUser} />
            <Route path="/mod" component={BoardModerator} />
            <Route path="/admin" component={BoardAdmin} />

            <Route path="/addPackage" component={Packages} />
            <Route path="/packagesList" component={PackageList} />  
            <Route path="/addPrice" component={PriceCreate} />
            <Route path="/pricesList" component={PriceList} />
            <Route path="/addClient" component={ClientCreate}/>
            <Route path="/clientsList" component={ClientList}/>
            <Route path="/addOperator" component={OperatorCreate}/>
            <Route path="/operatersList" component={OperatortsList}/>
            <Route path="/addAgreement" component={AgreementCreate}/>
            <Route path="/agreementsList" component={AgreementList}/>
            <Route path="/techAgreementsTMList" component={TechnicianTMAgreementList}/>
            <Route path="/salesAgreementsSigningList" component={SalesSigningAgreementList}/>
            <Route path="/techAgreementsRealizationList" component={TechnicianRealizationAgreementList}/>

            <Route path="/agreementInfo/:agreementId" component={AgreementInfo} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
