import React, { useState } from "react";

const RegistrationItem = ({ studentName, requestMessage, onAccept, onReject }) => {
  const [rejectMessage, setRejectMessage] = useState("");

  const handleAccept = () => {
    onAccept();
  };

  const handleReject = () => {
    onReject(rejectMessage);
    setRejectMessage("");
  };

  return (
    <div style={styles.container}>
      <div style={styles.details}>
        <p><strong>Name:</strong> {studentName}</p>
        <p><strong>Message:</strong> {requestMessage}</p>
      </div>
      <div style={styles.actions}>
        <textarea
          placeholder="Add a reject message..."
          value={rejectMessage}
          onChange={(e) => setRejectMessage(e.target.value)}
          style={styles.textarea}
        />
        <button onClick={handleAccept} style={styles.acceptButton}>
          Accept
        </button>
        <button onClick={handleReject} style={styles.rejectButton}>
          Reject
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "10px",
    marginBottom: "10px",
    backgroundColor: "#f9f9f9",
  },
  details: {
    flex: 2,
  },
  actions: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  textarea: {
    width: "100%",
    minHeight: "50px",
    marginBottom: "10px",
  },
  acceptButton: {
    backgroundColor: "green",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "5px",
  },
  rejectButton: {
    backgroundColor: "red",
    color: "white",
    padding: "8px 16px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default RegistrationItem;
