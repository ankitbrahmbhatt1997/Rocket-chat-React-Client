import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "contexts";

export default function Home() {
  let { logoutUser, isAuthenticated } = useContext(authContext);
  return (
    <React.Fragment>
      <div>
        THIS IS HOME
        <Link to="/chat">Click to go to chat</Link>
      </div>
      <div>
        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            logoutUser();
          }}
        >
          Click to logout
        </a>
      </div>
    </React.Fragment>
  );
}
