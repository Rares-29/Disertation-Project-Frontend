import {apiService} from "./apiService"

const teacherApi = {
    getOpenSeats: () => apiService.get('/teacher/availableOpenSeats'),
    registerSession: (sessionData) => apiService.post('/teacher/registerSession', sessionData),
    getAllPendingRequests: () => apiService.get('/teacher/allPendingRequests'),
    respondToRequest: (data) => apiService.post('/teacher/respondToRequest'),
    getAllOpenSessions: () => apiService.get("/teacher/allOpenSessions"),
    getAllSignedRequests: () => apiService.get("/teacher/allSignedRequests"),
    getAcceptedStudents: () => apiService.get("/teacher/acceptedStudents")
  };
  
export default teacherApi;