import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/prices/';

class PriceService {
  getPrices() {
    return axios.get(API_URL + 'all',{ headers: authHeader() });
  }

  createPrice(newPrice){
    return axios.post(API_URL + "addNewPrice", newPrice, { headers: authHeader() });
}

  deletePrice(id) {
  return axios.delete(API_URL + "deletePrice/" + id, { headers: authHeader() })
}

  getPricesByService(serviceId) {
    return axios.get(API_URL + "allByService/" + serviceId, { headers: authHeader() })
  }

}

export default new PriceService();