import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/clients/';

class ClientService {
    
  getClients() {
    return axios.get(API_URL + 'all',{ headers: authHeader() });
  }

  createClient(newClient){
    return axios.post(API_URL + "addNewClient", newClient, { headers: authHeader() });
}

updateClient(client) {
  return axios.put(API_URL + "updateClient/" + client.id, client, { headers: authHeader() })
}

deleteClient(id) {
  return axios.delete(API_URL + "deleteClient/" + id, { headers: authHeader() })
}

getClientByJmbg(jmbg) {
  return axios.get(API_URL + "getByJmbg/" + jmbg, {headers: authHeader() })
}

}

export default new ClientService();