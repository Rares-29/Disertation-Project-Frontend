import React, { useState, useEffect } from "react";
import RegistrationItem from "../RegistrationItem";
import "./TeacherDashboard.css";
import teacherApi from "../../api/teacherApi";


const TeacherDashboard = () => {


  const [openSeats, setOpenSeats] = useState(5);
  const [acceptedStudents, setAcceptedStudents] = useState([]);
  const [stage1Registrations, setStage1Registrations] = useState([
    { id: 1, name: "Alice Johnson", message: "I'm very interested in this topic!" },
    { id: 2, name: "Bob Smith", message: "I want to work on this project because..." },
  ]);
  const [stage2Registrations, setStage2Registrations] = useState([
    { id: 3, name: "Charlie Brown", message: "Signed PDF uploaded." },
  ]);
  const [newSession, setNewSession] = useState({ open_seats: 10, start_date: "", duration: 5 });
  const [sessions, setSessions] = useState([]);


  useEffect(() => {
    const getOpenSeats = async () => {
      const response = await teacherApi.getOpenSeats();
      setOpenSeats(response.data.availableOpenSeats);
    }

    const getAllPendingRequests = async () => {

      try {
        const response = await teacherApi.getAllPendingRequests();
        if (response.status === 200 || response.status === 202) {
          console.log(response.data.requests);
          setStage1Registrations(response.data.requests);
        } 
      } catch (error) {
        console.log(error);
        if (error.response) {
          alert("Error: " + error.response.data.message);
        } else {
          alert("An error occurred: " + error.message);
        }
    }
  };

  const getAllOpenSessions = async () => {

    try {
      const response = await teacherApi.getAllOpenSessions();
      if (response.status === 200 || response.status === 202) {
        console.log(response.data.requests);
        setSessions(response.data);
      } 
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert("Error: " + error.response.data.message);
      } else {
        alert("An error occurred: " + error.message);
      }
  }
};

const getAllSignedRequests = async () => {

  try {
    const response = await teacherApi.getAllSignedRequests();
    if (response.status === 200 || response.status === 202) {
      console.log(response.data.requests);
      setStage2Registrations(response.data);
    } 
  } catch (error) {
    console.log(error);
    if (error.response) {
      alert("Error: " + error.response.data.message);
    } else {
      alert("An error occurred: " + error.message);
    }
}
};

const getAcceptedStudents = async () => {

  try {
    const response = await teacherApi.getAcceptedStudents();
    if (response.status === 200 || response.status === 202) {
      console.log(response.data.requests);
      setAcceptedStudents(response.data);
    } 
  } catch (error) {
    console.log(error);
    if (error.response) {
      alert("Error: " + error.response.data.message);
    } else {
      alert("An error occurred: " + error.message);
    }
}
};

    getOpenSeats();
    getAllPendingRequests();
    getAllOpenSessions();
    getAllSignedRequests();
    getAcceptedStudents();
  }, []);


  const handleStage1Accept = (id) => {
    const accepted = stage1Registrations.find((reg) => reg.id === id);
    if (accepted) {
      setStage2Registrations((prev) => [...prev, accepted]);
      setStage1Registrations((prev) => prev.filter((reg) => reg.id !== id));
    }
  };

  const handleStage1Reject = (id, message) => {
    console.log(`Rejected student in Stage 1 with ID: ${id}, Message: ${message}`);
    setStage1Registrations((prev) => prev.filter((reg) => reg.id !== id));
  };

  const handleStage2Accept = (id) => {
    const accepted = stage2Registrations.find((reg) => reg.id === id);
    if (accepted) {
      setAcceptedStudents((prev) => [...prev, accepted]);
      setStage2Registrations((prev) => prev.filter((reg) => reg.id !== id));
      setOpenSeats((prev) => prev - 1);
    }
  };

  const handleStage2Reject = (id, message) => {
    console.log(`Rejected student in Stage 2 with ID: ${id}, Message: ${message}`);
    setStage2Registrations((prev) => prev.filter((reg) => reg.id !== id));
  };

  const handleSessionChange = (e) => {
    const { name, value } = e.target;
    setNewSession((prev) => ({ ...prev, [name]: value }));
  };

  const handleSessionSubmit = (e) => {
    e.preventDefault();
    const registerSession = async () => {
      try {
        const response = await teacherApi.registerSession(newSession);
        if (response.status === 200 || response.status === 202) {
          setSessions((prev) => [...prev, newSession]);
          setNewSession({ open_seats: 10, start_date: "", duration: 5 });
        } else {
          alert("Failed to create session");
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          alert("Error: " + error.response.data.message);
        } else {
          alert("An error occurred: " + error.message);
        }
      }
    }    
    registerSession();
  };

  return (
    <div className="dashboard">
      <h1 className="title">Teacher Dashboard</h1>

      <div className="grid">
        {/* Open Seats */}
        <div className="card">
          <h2>Open Seats</h2>
          <p className="big-text">{openSeats}</p>
        </div>

        {/* Accepted Students */}
        <div className="card-large">
          <h2>Accepted Students</h2>
          {acceptedStudents.length === 0 ? (
            <p>No students accepted yet.</p>
          ) : (
            <ul>
              {acceptedStudents.map((student) => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Created Sessions */}
        <div className="card-large">
          <h2>Created Sessions</h2>
          {sessions.length === 0 ? (
            <p>No sessions created yet.</p>
          ) : (
            <ul>
              {sessions.map((session, index) => (
                <li key={index}>
                  Seats available: {session.open_seats}, Start Date: {session.start_date}, Duration:{" "}
                  End Date: {session.end_date}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Stage 1 Registrations */}
        <div className="card-large">
          <h2>Stage 1: Pending Registrations</h2>
          {stage1Registrations.length === 0 ? (
            <p>No pending registrations in Stage 1.</p>
          ) : (
            stage1Registrations.map((reg) => (
              <RegistrationItem
                key={reg.id}
                studentName={reg.name}
                requestMessage={reg.message}
                onAccept={() => handleStage1Accept(reg.id)}
                onReject={(message) => handleStage1Reject(reg.id, message)}
              />
            ))
          )}
        </div>

        {/* Stage 2 Registrations */}
        <div className="card-large">
          <h2>Stage 2: Pending Signed PDFs</h2>
          {stage2Registrations.length === 0 ? (
            <p>No pending registrations in Stage 2.</p>
          ) : (
            stage2Registrations.map((reg) => (
              <RegistrationItem
                key={reg.id}
                studentName={reg.name}
                requestMessage={reg.message}
                onAccept={() => handleStage2Accept(reg.id)}
                onReject={(message) => handleStage2Reject(reg.id, message)}
              />
            ))
          )}
        </div>

        {/* Open New Session */}
        <div className="card">
          <h2>Open a New Session</h2>
          <form onSubmit={handleSessionSubmit} className="form">
            <div className="form-group">
              <label>Open Seats:</label>
              <input
                type="number"
                name="open_seats"
                value={newSession.open_seats}
                onChange={handleSessionChange}
                required
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Start Date:</label>
              <input
                type="date"
                name="start_date"
                value={newSession.start_date}
                onChange={handleSessionChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Duration (days):</label>
              <input
                type="number"
                name="duration"
                value={newSession.duration}
                onChange={handleSessionChange}
                required
                min="1"
              />
            </div>
            <button type="submit" className="button">Open Session</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
