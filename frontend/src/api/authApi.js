import {apiService} from "./apiService"

const authApi = {
    login: (userData) => apiService.post('/auth/login', userData),
    register: (userData) => apiService.post('/auth/register', userData),
  };
  
export default authApi;