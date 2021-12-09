import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/agreements/';

class AgreementService {
    
  getAgreements() {
    return axios.get(API_URL + 'all',{ headers: authHeader() });
  }

  getAgreementById(id) {
    return axios.get(API_URL + 'getOne/' + id,{ headers: authHeader() });
  }

  getAllAgreementsByTechStatusStarted () {
    return axios.get(API_URL + 'allTm',{ headers: authHeader() });
  }

  getAllAgreementsByTechStatusSigning () {
    return axios.get(API_URL + 'allSigning',{ headers: authHeader() });
  }

  getAllAgreementsByTechStatusRealization() {
    return axios.get(API_URL + 'allRealization',{ headers: authHeader() });
  }

  createAgreement(newAgreement){
    return axios.post(API_URL + "addNewAgreement", newAgreement, { headers: authHeader() });
}

deleteAgreement(id) {
  return axios.delete(API_URL + "deleteAgreement/" + id, { headers: authHeader() });
}

changeTechStatus(agreement, techStatusId){
  return axios.put(API_URL + "changeTechStatus/" + techStatusId, agreement, { headers: authHeader() });
}

}

export default new AgreementService();