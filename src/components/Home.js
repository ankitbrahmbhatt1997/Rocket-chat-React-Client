import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "slices/authSlice";

export default function Home() {
  const dispatch = useDispatch();
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
            dispatch(logoutUser());
          }}
        >
          Click to logout
        </a>
      </div>
    </React.Fragment>
  );
}
