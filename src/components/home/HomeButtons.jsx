import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../context/user-context";


export default function HomeButtons() {
  const { user } = useUser();

  return (
    <div className="article__actions vertical">
      <a href="https://syscoin.org/masternodes"
        className="btn btn--blue-border"
        rel="noopener noreferrer"
        target="_blank"
      >
        Learn More
      </a>
      <a href="https://support.syscoin.org/t/masternode-setup-guide-fresh-install-automated-server-setup/19"
        className="btn btn--blue-border"
        rel="noopener noreferrer"
        target="_blank"
      >
        Setup Masternode
      </a>
      {!user && (<Link to="/signup" className="btn btn--blue-border">
        Sign up
      </Link>)}
    </div>
  );
}
