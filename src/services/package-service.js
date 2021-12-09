import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/packages/";

class PackageService {


  createPackage(newPackage){
    return axios.post(API_URL + "addNewPackage", newPackage, { headers: authHeader() });
}

getAllPackages() {
  return axios.get(API_URL + "all", {
    headers: authHeader()
  });
}

deactivate_activatePackage(packageForUpdate) {
  if(packageForUpdate.status === 0) {
    packageForUpdate.status = 1;
  } else {
    packageForUpdate.status = 0;
  }
  return axios.put(API_URL + "activateDeactivatePackage/" + packageForUpdate.id, packageForUpdate, { headers: authHeader() })
}

deletePackage(id) {
  return axios.delete(API_URL + "deletePackage/" + id, { headers: authHeader() })
}

getPackagesByService(id) {
  return axios.get(API_URL + "allByStatus/" + id, { headers: authHeader() })
}
 
}

export default new PackageService();
