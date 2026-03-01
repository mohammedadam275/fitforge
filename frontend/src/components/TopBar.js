import React from "react";

function TopBar({ user, onLogout }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "20px",
      }}
    >
      <h1>FitForge</h1>

      <div>
        {user && <span>Welcome, {user.username}</span>}
        <button
          onClick={onLogout}
          style={{ marginLeft: "15px" }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default TopBar;