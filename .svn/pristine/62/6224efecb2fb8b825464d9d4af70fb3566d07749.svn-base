import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/outgoing/";

class OutgoingCallService {

  getOutgoingCallTemplate() {
    return axios.get(API_URL + "outgoingCallTemplate", {
      headers: authHeader()
    });
  }

  createTemplate(template){
    template.active = 1;
    return axios.post(API_URL + "outgoingCallTemplate", template, { headers: authHeader() });
}

  deactivate_activateTemplate(template) {
    if(template.active === 0) {
      template.active = 1;
    } else {
      template.active = 0;
    }
    
    return axios.put(API_URL + "outgoingCallTemplate/" + template.id, template, { headers: authHeader() })
}

  deletePredefinedResult(template) {
    console.log('ovo je prosledjeni templejt', template.predefinedResultList)
    if(template.predefinedResultList.length === 0) {
      template.predefinedResults = "##";
    }
      return axios.put(API_URL + "outgoingCallTemplate/" + template.id, template, { headers: authHeader() }) 
  }

  addPredefinedResult(template) {
    console.log('ovo je prosledjeni templejt', template.predefinedResultList)
      return axios.put(API_URL + "outgoingCallTemplate/" + template.id, template, { headers: authHeader() })
  }

  deleteTemplate(id) {
    return axios.delete(API_URL + "outgoingCallTemplate/" + id, { headers: authHeader() })
  }


  postFormData(formData){
    return axios.post(API_URL + "postOutgoingCallList", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  }

  getOutgoingCallTemplateListImport(){
    return axios.get(API_URL+"outgoingCallTemplate",{
      headers:authHeader(),
    });
  }

  getOldOutgoingCallLists(){
    return axios.get(API_URL+"oldOutgoingCallList",{
      headers:authHeader(),
    });
  }

  sendTemplateId(templateId){
    return axios.post(API_URL+"oldOutgoingCallList", templateId,{
      headers:
      {
        "content-type":"application/json",
      },
    });
  }
}

export default new OutgoingCallService();
