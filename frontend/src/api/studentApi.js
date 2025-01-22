import {apiService} from "./apiService"

const studentApi = {
    getTeachers: () => apiService.get('/student/getTeachers'),
    registerRequest: (request) => apiService.post('/student/registerRequest', request),
    getAcceptedRequest: () => apiService.get('/student/acceptedRequest')
  };
  
export default studentApi;