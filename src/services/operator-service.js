import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/';

class OperatorService {
    
    getAllOperators () {
        return axios.get(API_URL + "admin/allOperators", { headers: authHeader() })
    }

    deleteOperator(id) {
        return axios.delete(API_URL + "admin/deleteOperator/" + id, { headers: authHeader() })
      }
}

export default new OperatorService();