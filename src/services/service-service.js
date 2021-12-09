import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/services/';

class ServiceService {
  getServices() {
    return axios.get(API_URL + 'all',{ headers: authHeader() });
  }

}

export default new ServiceService();
